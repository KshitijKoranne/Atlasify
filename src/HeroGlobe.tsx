import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS = [
  { location: [48.86, 2.35], size: 0.04 },     // Paris
  { location: [40.71, -74.01], size: 0.05 },    // New York
  { location: [35.68, 139.69], size: 0.05 },    // Tokyo
  { location: [51.51, -0.13], size: 0.04 },     // London
  { location: [-22.91, -43.17], size: 0.04 },   // Rio
  { location: [1.35, 103.82], size: 0.04 },     // Singapore
  { location: [55.76, 37.62], size: 0.04 },     // Moscow
  { location: [19.08, 72.88], size: 0.04 },     // Mumbai
  { location: [-33.87, 151.21], size: 0.04 },   // Sydney
  { location: [30.04, 31.24], size: 0.03 },     // Cairo
  { location: [22.31, 73.18], size: 0.04 },     // Vadodara
  { location: [47.50, 19.04], size: 0.03 },     // Budapest
  { location: [41.90, 12.50], size: 0.04 },     // Rome
  { location: [52.37, 4.90], size: 0.03 },      // Amsterdam
  { location: [-33.92, 18.42], size: 0.03 },    // Cape Town
  { location: [13.76, 100.50], size: 0.03 },    // Bangkok
  { location: [-1.29, 36.82], size: 0.03 },     // Nairobi
  { location: [39.91, 116.40], size: 0.04 },    // Beijing
  { location: [37.77, -122.42], size: 0.04 },   // San Francisco
  { location: [-34.60, -58.38], size: 0.03 },   // Buenos Aires
] as const;

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 600;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.15, 0.12, 0.08],
      markerColor: [0.83, 0.64, 0.23],
      glowColor: [0.12, 0.09, 0.04],
      markers: MARKERS as unknown as Array<{ location: [number, number]; size: number }>,
      scale: 1,
      offset: [0, 0],
      onRender: (state) => {
        state.phi = phiRef.current;
        phiRef.current += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="lp-hero-globe"
      aria-hidden="true"
      style={{ width: 600, height: 600 }}
    />
  );
}
