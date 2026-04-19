import { useEffect, useRef } from "react";

/** Major world cities: [lat, lon] */
const CITIES: [number, number][] = [
  [48.86, 2.35],    // Paris
  [40.71, -74.01],  // New York
  [35.68, 139.69],  // Tokyo
  [51.51, -0.13],   // London
  [-22.91, -43.17], // Rio
  [1.35, 103.82],   // Singapore
  [55.76, 37.62],   // Moscow
  [19.08, 72.88],   // Mumbai
  [-33.87, 151.21], // Sydney
  [30.04, 31.24],   // Cairo
  [37.77, -122.42], // San Francisco
  [-34.60, -58.38], // Buenos Aires
  [22.31, 73.18],   // Vadodara
  [47.50, 19.04],   // Budapest
  [52.37, 9.73],    // Hannover
  [41.90, 12.50],   // Rome
  [52.37, 4.90],    // Amsterdam
  [-33.92, 18.42],  // Cape Town
  [47.61, -122.33], // Seattle
  [33.31, 44.37],   // Baghdad
  [44.65, -63.57],  // Halifax
  [39.91, 116.40],  // Beijing
  [13.76, 100.50],  // Bangkok
  [-1.29, 36.82],   // Nairobi
  [64.15, -21.94],  // Reykjavik
];

function project(
  lat: number,
  lon: number,
  rotY: number,
  cx: number,
  cy: number,
  r: number,
): { x: number; y: number; visible: boolean } {
  const phi = (lat * Math.PI) / 180;
  const lam = ((lon - rotY) * Math.PI) / 180;

  const cosP = Math.cos(phi);
  const x3 = cosP * Math.sin(lam);
  const y3 = -Math.sin(phi);
  const z3 = cosP * Math.cos(lam);

  return {
    x: cx + x3 * r,
    y: cy + y3 * r,
    visible: z3 > 0,
  };
}

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(cx, cy) * 0.82;

      // Slow rotation: full turn in ~60s
      const rotY = (t * 0.006) % 360;

      ctx.clearRect(0, 0, w, h);

      // Globe outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(196, 148, 60, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lat, lon, rotY, cx, cy, r);
          if (!p.visible) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(196, 148, 60, 0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lat, lon, rotY, cx, cy, r);
          if (!p.visible) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(196, 148, 60, 0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // City dots
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.003);
      for (let i = 0; i < CITIES.length; i++) {
        const [lat, lon] = CITIES[i];
        const p = project(lat, lon, rotY, cx, cy, r);
        if (!p.visible) continue;

        // Staggered pulse per city
        const cityPulse = 0.4 + 0.6 * Math.sin(t * 0.003 + i * 0.8);
        const dotR = 1.5 + cityPulse * 1.2;

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR + 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 164, 58, ${0.06 * cityPulse})`;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 164, 58, ${0.25 + 0.35 * cityPulse})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="lp-hero-globe"
      aria-hidden="true"
    />
  );
}
