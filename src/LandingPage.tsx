import { useEffect, useRef } from "react";
import "./styles/landing.css";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      hero.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openApp = () => {
    window.location.href = "/app";
  };

  return (
    <div className="lp-root">
      {/* Nav */}
      <nav className="lp-nav">
        <div className="lp-nav-brand">
          <img src="/assets/logo.svg" alt="Atlasify" className="lp-nav-logo" />
          <span className="lp-nav-name">Atlasify</span>
        </div>
        <button type="button" className="lp-nav-cta" onClick={openApp}>
          Open App
        </button>
      </nav>

      {/* Hero */}
      <section className="lp-hero">
        <div className="lp-hero-glow" aria-hidden="true" />
        <div className="lp-hero-content">
          <div className="lp-hero-badge">Map Poster Generator</div>
          <h1 className="lp-hero-heading">
            Turn any place<br />into a poster.
          </h1>
          <p className="lp-hero-sub">
            Pick a location, choose a style, export a print-ready map poster.
            Free to use. No account needed.
          </p>
          <div className="lp-hero-actions">
            <button type="button" className="lp-btn-primary" onClick={openApp}>
              Create your poster
            </button>
            <span className="lp-hero-hint">No sign-up · Works in browser</span>
          </div>
        </div>

        {/* Product preview */}
        <div className="lp-hero-preview" ref={heroRef} aria-hidden="true">
          <div className="lp-preview-frame">
            <div className="lp-preview-inner">
              <img
                src="/assets/logo.svg"
                alt=""
                className="lp-preview-placeholder-icon"
              />
              <p className="lp-preview-placeholder-text">
                Your poster preview here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="lp-features">
        <div className="lp-features-grid">
          <div className="lp-feature-card">
            <div className="lp-feature-icon">◎</div>
            <h3 className="lp-feature-title">23 Themes</h3>
            <p className="lp-feature-body">
              From Atlas to Cyberpunk — every style is built for print.
            </p>
          </div>
          <div className="lp-feature-card">
            <div className="lp-feature-icon">⊞</div>
            <h3 className="lp-feature-title">Any Format</h3>
            <p className="lp-feature-body">
              A4, A3, wallpaper, social media — or set a custom size.
            </p>
          </div>
          <div className="lp-feature-card">
            <div className="lp-feature-icon">↓</div>
            <h3 className="lp-feature-title">Export Ready</h3>
            <p className="lp-feature-body">
              Download PNG, PDF, or SVG. High-res exports coming soon.
            </p>
          </div>
          <div className="lp-feature-card">
            <div className="lp-feature-icon">✦</div>
            <h3 className="lp-feature-title">Fully Custom</h3>
            <p className="lp-feature-body">
              Edit colors, typography, markers, and map layers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="lp-cta-strip">
        <h2 className="lp-cta-heading">Ready to make your map?</h2>
        <button type="button" className="lp-btn-primary" onClick={openApp}>
          Start for free
        </button>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <span className="lp-footer-brand">
          Atlasify by{" "}
          <a href="https://kjrlabs.in" target="_blank" rel="noreferrer" className="lp-footer-link">
            KJR Labs
          </a>
        </span>
        <span className="lp-footer-attr">
          Map data ©{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="lp-footer-link">
            OpenStreetMap contributors
          </a>
        </span>
      </footer>
    </div>
  );
}
