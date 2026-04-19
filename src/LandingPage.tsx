import { useState } from "react";
import "./styles/landing.css";

const HERO_POSTERS = [
  { src: "/assets/posters/budapest-ruby.webp", city: "Budapest" },
  { src: "/assets/posters/rome-ember.webp", city: "Rome" },
  { src: "/assets/posters/amsterdam-terracotta.webp", city: "Amsterdam" },
  { src: "/assets/posters/tokyo-blueprint.webp", city: "Tokyo" },
  { src: "/assets/posters/singapore-cyberpunk.webp", city: "Singapore" },
  { src: "/assets/posters/hannover-atlas.webp", city: "Hannover" },
];

const MARQUEE_POSTERS = [
  { src: "/assets/posters/hannover-atlas.webp", city: "Hannover" },
  { src: "/assets/posters/amsterdam-terracotta.webp", city: "Amsterdam" },
  { src: "/assets/posters/tokyo-blueprint.webp", city: "Tokyo" },
  { src: "/assets/posters/singapore-cyberpunk.webp", city: "Singapore" },
  { src: "/assets/posters/rio-emerald.webp", city: "Rio de Janeiro" },
  { src: "/assets/posters/london-monochrome.webp", city: "London" },
  { src: "/assets/posters/rome-ember.webp", city: "Rome" },
  { src: "/assets/posters/halifax-mist.webp", city: "Halifax" },
  { src: "/assets/posters/budapest-ruby.webp", city: "Budapest" },
  { src: "/assets/posters/capetown-noir.webp", city: "Cape Town" },
  { src: "/assets/posters/seattle-sand.webp", city: "Seattle" },
  { src: "/assets/posters/baghdad-parchment.webp", city: "Baghdad" },
];

const FEATURES = [
  { icon: "◎", title: "23 Themes", body: "From Atlas to Cyberpunk — every theme is designed for print." },
  { icon: "⊞", title: "Any Size", body: "A4, A3, 4K wallpaper, social posts, or fully custom dimensions." },
  { icon: "↓", title: "Export Anything", body: "PNG, PDF, and SVG included. Hi-res 2K, 4K, and 8K available." },
  { icon: "✦", title: "Fully Custom", body: "Colors, typography, map layers, markers — all yours to tweak." },
  { icon: "⌖", title: "Any Location", body: "Search any city or drop in exact lat/lon coordinates." },
  { icon: "◈", title: "Works Offline", body: "Install as a PWA. Create posters without an internet connection." },
];

export default function LandingPage() {
  const openApp = () => { window.location.href = "/app"; };
  const [heroIndex, setHeroIndex] = useState(0);

  const cyclePosters = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_POSTERS.length);
  };

  // Pick 3 posters from the rotating index
  const back = HERO_POSTERS[heroIndex % HERO_POSTERS.length];
  const mid = HERO_POSTERS[(heroIndex + 1) % HERO_POSTERS.length];
  const front = HERO_POSTERS[(heroIndex + 2) % HERO_POSTERS.length];

  return (
    <div className="lp-root">

      {/* ── Nav ── */}
      <nav className="lp-nav">
        <div className="lp-nav-brand">
          <img src="/assets/logo.svg" alt="Atlasify logo" width="26" height="26" className="lp-nav-logo" />
          <span className="lp-nav-name">Atlasify</span>
        </div>
        <div className="lp-nav-right">
          <a href="https://kjrlabs.in" target="_blank" rel="noreferrer" className="lp-nav-link">
            KJR Labs
          </a>
          <button type="button" className="lp-nav-cta" onClick={openApp}>
            Open App
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="lp-hero">
        <div className="lp-hero-glow" aria-hidden="true" />

        <div className="lp-hero-inner">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">No sign-up · Works in browser</div>
            <h1 className="lp-hero-heading">
              Turn any place<br />into a poster.
            </h1>
            <p className="lp-hero-sub">
              Search a city, pick from 23 themes, export a print-ready
              map poster. Standard exports are free — hi-res from just ₹99.
            </p>
            <div className="lp-hero-actions">
              <button type="button" className="lp-btn-primary" onClick={openApp}>
                Create your poster
              </button>
              <button type="button" className="lp-btn-ghost" onClick={openApp}>
                See all 23 themes →
              </button>
            </div>
          </div>

          {/* Hero poster trio — tappable to rotate */}
          <div className="lp-poster-stack" onClick={cyclePosters} role="button" tabIndex={0} aria-label="Tap to see more poster examples" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") cyclePosters(); }}>
            <img src={back.src} alt={back.city} className="lp-poster lp-poster--back" loading="eager" />
            <img src={mid.src} alt={mid.city} className="lp-poster lp-poster--mid" loading="eager" />
            <img src={front.src} alt={front.city} className="lp-poster lp-poster--front" loading="eager" />
          </div>
        </div>
      </section>

      {/* ── Poster marquee ── */}
      <section className="lp-marquee" aria-label="Example map posters created with Atlasify">
        <div className="lp-marquee-track">
          {[...MARQUEE_POSTERS, ...MARQUEE_POSTERS].map((p, i) => (
            <div key={i} className="lp-marquee-card">
              <img src={p.src} alt={`${p.city} map poster`} className="lp-marquee-img" loading="lazy" />
              <div className="lp-marquee-label">
                <span className="lp-marquee-city">{p.city}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="lp-features">
        <div className="lp-section-label">What you get</div>
        <h2 className="lp-section-heading">Everything for your map poster.</h2>
        <div className="lp-features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="lp-feature-card">
              <div className="lp-feature-icon">{f.icon}</div>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="lp-how">
        <div className="lp-section-label">How it works</div>
        <h2 className="lp-section-heading">Three steps to your poster.</h2>
        <div className="lp-steps">
          <div className="lp-step">
            <div className="lp-step-num">01</div>
            <h3 className="lp-step-title">Pick a place</h3>
            <p className="lp-step-body">Search any city or enter exact coordinates. The map centers instantly.</p>
          </div>
          <div className="lp-step-arrow" aria-hidden="true">→</div>
          <div className="lp-step">
            <div className="lp-step-num">02</div>
            <h3 className="lp-step-title">Choose a theme</h3>
            <p className="lp-step-body">23 themes — dark, light, warm, cool. Adjust typography, colors, and layers.</p>
          </div>
          <div className="lp-step-arrow" aria-hidden="true">→</div>
          <div className="lp-step">
            <div className="lp-step-num">03</div>
            <h3 className="lp-step-title">Export & print</h3>
            <p className="lp-step-body">Standard PNG, PDF, SVG — free. Hi-res 2K, 4K, 8K — one-time purchase.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta">
        <div className="lp-cta-glow" aria-hidden="true" />
        <h2 className="lp-cta-heading">Your city. Your style.<br />Your wall.</h2>
        <button type="button" className="lp-btn-primary lp-btn-primary--large" onClick={openApp}>
          Start creating
        </button>
        <p className="lp-cta-sub">No account needed. Standard exports are free.</p>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-footer-left">
          <img src="/assets/logo.svg" alt="" width="24" height="24" className="lp-footer-logo" />
          <div>
            <p className="lp-footer-name">Atlasify</p>
            <p className="lp-footer-sub">by <a href="https://kjrlabs.in" target="_blank" rel="noreferrer" className="lp-footer-link">KJR Labs</a></p>
          </div>
        </div>
        <div className="lp-footer-center">
          <a href="https://x.com/kshitijkoranne" target="_blank" rel="noreferrer" className="lp-footer-link">X / Twitter</a>
        </div>
        <p className="lp-footer-attr">
          Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="lp-footer-link">OpenStreetMap contributors</a>
          {" · "}Tiles by <a href="https://openfreemap.org" target="_blank" rel="noreferrer" className="lp-footer-link">OpenFreeMap</a>
        </p>
      </footer>

    </div>
  );
}
