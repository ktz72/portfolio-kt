"use client";

import { useEffect, useState } from "react";
import { geoNaturalEarth1 } from "d3-geo";

type City = {
  name: string;
  coord: [number, number];
  label: string;
};

const cities: City[] = [
  {
    name: "Atlanta",
    coord: [-84.388, 33.749],
    label: "Pursuing my MS degree in GIST at Georgia Tech",
  },
  {
    name: "Visakhapatnam",
    coord: [83.2185, 17.6868],
    label: "My Undergrad journey began here",
  },
  {
    name: "Hyderabad",
    coord: [78.4867, 17.3850],
    label: "My first professional role started here",
  },
];

export default function GlobeCityTooltips() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const projection = geoNaturalEarth1().fitExtent(
    [
      [40, 80],
      [size.w - 40, size.h - 80],
    ],
    { type: "Sphere" } as any
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[2]">
      {cities.map((city) => {
        const point = projection(city.coord as any);
        if (!point) return null;

        return (
          <div
            key={city.name}
            className="group pointer-events-auto absolute"
            style={{ left: point[0], top: point[1] }}
          >
            <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]" />

            <div className="pointer-events-none absolute left-5 top-1/2 hidden w-56 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-md group-hover:block">
              <div className="font-semibold tracking-tight text-white">{city.name}</div>
              <div className="mt-1 leading-relaxed text-slate-300">{city.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}