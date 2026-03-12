"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  geoNaturalEarth1,
  geoPath,
  geoInterpolate,
} from "d3-geo";
import { feature } from "topojson-client";

type LonLat = [number, number];

type Route = { from: LonLat; to: LonLat; speed: number; phase: number };

export default function GlobeMapBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pick cities you want to “glow”
  const cities = useMemo(
    () =>
      [
        { name: "Atlanta", coord: [-84.388, 33.749] as LonLat },
        { name: "Visakhapatnam", coord: [83.2185, 17.6868] as LonLat },
        { name: "Hyderabad", coord: [78.4867, 17.3850] as LonLat },
      ],
    []
  );

  // Flight routes (great-circle arcs)
  const routes = useMemo<Route[]>(
    () => [
      { from: [83.2185, 17.6868], to: [78.4867, 17.3850], speed: 0.22, phase: 0.0 }, // VSA -> HYD
      { from: [78.4867, 17.3850], to: [-84.388, 33.749], speed: 0.18, phase: 0.35 }, // HYD -> ATL
    ],
    []
  );

  useEffect(() => {
    let raf = 0;
    let landGeo: any | null = null;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Projection + path generator
    const projection = geoNaturalEarth1();
    const path = geoPath(projection, ctx);
    

    // Load world land TopoJSON (low-res). Works while you have internet.
    // If your network blocks it, I’ll show a “local file” option below.
    fetch("https://unpkg.com/world-atlas@2/land-110m.json")
      .then((r) => r.json())
      .then((topology) => {
        landGeo = feature(topology, topology.objects.land);
      })
      .catch(() => {
        landGeo = null;
      });

    const start = performance.now();

    const draw = (tNow: number) => {
      const t = (tNow - start) / 1000;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Fit projection to the viewport
      projection.fitExtent(
        [
          [40, 80],
          [w - 40, h - 80],
        ],
        { type: "Sphere" } as any
      );

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Subtle background tint (helps visibility)
      ctx.fillStyle = "rgba(2,6,23,0.18)";
      ctx.fillRect(0, 0, w, h);

      // Grid (graticule)
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 2;
      ctx.shadowColor="rgba(139,92,246,0.55)";
      ctx.shadowBlur=12;
      ctx.beginPath();
      ctx.stroke();
      ctx.restore();

      // Land
      if (landGeo) {
        ctx.save();
        ctx.globalAlpha = 0.65;
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.strokeStyle = "rgba(255,255,255,0.10)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        path(landGeo);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Orbit rings (satellite vibe)
      const rings = 3;
      for (let i = 0; i < rings; i++) {
        const r = Math.min(w, h) * (0.28 + i * 0.12);
        const cx = w * 0.5;
        const cy = h * 0.45;
        ctx.save();
        ctx.globalAlpha = 0.10;
        ctx.strokeStyle = "rgba(34,211,238,0.20)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 1.15, r * 0.55, 0.18 + i * 0.12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Routes (great circle arcs) + moving data dot
      for (const r of routes) {
        const interp = geoInterpolate(r.from, r.to);

        // Draw the arc as many small segments
        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = "rgba(139,92,246,0.22)";
        ctx.lineWidth = 1.25;
        ctx.beginPath();

        const steps = 80;
        for (let i = 0; i <= steps; i++) {
          const p = interp(i / steps);
          const xy = projection(p as any);
          if (!xy) continue;
          if (i === 0) ctx.moveTo(xy[0], xy[1]);
          else ctx.lineTo(xy[0], xy[1]);
        }
        ctx.stroke();
        ctx.restore();

        // Moving dot along the arc
        const dotT = (t * r.speed + r.phase) % 1;
        const dotLL = interp(dotT);
        const dotXY = projection(dotLL as any);
        if (dotXY) {
          // glow
          ctx.save();
          ctx.globalAlpha = 0.22;
          ctx.fillStyle = "rgba(34,211,238,1)";
          ctx.beginPath();
          ctx.arc(dotXY[0], dotXY[1], 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = 0.38;
          ctx.beginPath();
          ctx.arc(dotXY[0], dotXY[1], 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha=0.95;
          ctx.fillStyle="rgba(255,255,255,0.95)";
          ctx.beginPath();
          ctx.arc(dotXY[0],dotXY[1],2.6,0,Math.PI*2);
          ctx.fill();

          ctx.restore();
        }
      }

      // Cities (pulsing)
      for (const c of cities) {
        const xy = projection(c.coord as any);
        if (!xy) continue;

        const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + (xy[0] + xy[1]) * 0.01);

        // outer glow
        ctx.save();
        ctx.globalAlpha = 0.18 + pulse * 0.12;
        ctx.fillStyle = "rgba(167,139,250,1)";
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], 10 + pulse * 7, 0, Math.PI * 2);
        ctx.fill();
        //inner glow
        ctx.globalAlpha=0.35;
        ctx.fillStyle="rgba(34,211,238,0.9)";
        ctx.beginPath();
        ctx.arc(xy[0],xy[1],5+pulse*2,0,Math.PI*2);
        ctx.fill()

        // core dot
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [cities, routes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
    />
  );
}