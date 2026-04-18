import "./styles/landing.css";

const THEMES = ["Atlas", "Cyberpunk", "Ember", "Saffron", "Noir", "Terracotta", "Arctic", "Dusk"];

const FEATURES = [
  { icon: "◎", title: "23 Themes", body: "From Atlas to Cyberpunk. Every theme is built for print." },
  { icon: "⊞", title: "Any Size", body: "A4, A3, 4K wallpaper, social media — or fully custom." },
  { icon: "↓", title: "Export Ready", body: "PNG, PDF, and SVG. High-res 2K/4K/8K exports coming soon." },
  { icon: "✦", title: "Fully Custom", body: "Edit colors, typography, markers, and map layers freely." },
  { icon: "⌖", title: "Any Location", body: "Search any city or drop in exact coordinates." },
  { icon: "◈", title: "Works Offline", body: "Install as a PWA and use it without a connection." },
];

export default function LandingPage() {
  const openApp = () => { window.location.href = "/app"; };

  return (
    <div className="lp-root">

      {/* ── Nav ── */}
      <nav className="lp-nav">
        <div className="lp-nav-brand">
          <img src="/assets/logo.svg" alt="" className="lp-nav-logo" />
          <span className="lp-nav-name">Atlasify</span>
        </div>
        <div className="lp-nav-right">
          <a href="https://x.com/kshitijkoranne" target="_blank" rel="noreferrer" className="lp-nav-link">
            by KJR Labs
          </a>
          <button type="button" className="lp-nav-cta" onClick={openApp}>
            Open App
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="lp-hero">
        <div className="lp-hero-glow-top" aria-hidden="true" />
        <div className="lp-hero-glow-bottom" aria-hidden="true" />

        <div className="lp-hero-inner">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">Free · No sign-up · Works in browser</div>
            <h1 className="lp-hero-heading">
              Turn any place<br />into a poster.
            </h1>
            <p className="lp-hero-sub">
              Pick a location, choose from 23 themes, and export a print-ready
              map poster. In seconds.
            </p>
            <div className="lp-hero-actions">
              <button type="button" className="lp-btn-primary" onClick={openApp}>
                Create your poster
              </button>
              <button type="button" className="lp-btn-ghost" onClick={openApp}>
                See themes →
              </button>
            </div>
          </div>

          {/* Simulated poster stack */}
          <div className="lp-poster-stack" aria-hidden="true">
            <div className="lp-poster lp-poster--back" style={{ background: "linear-gradient(160deg, #1A0E2A 0%, #130A20 100%)" }}>
              <div className="lp-poster-map-lines lp-poster-map-lines--dusk" />
              <div className="lp-poster-text">
                <span className="lp-poster-city">Paris</span>
                <span className="lp-poster-country">France</span>
              </div>
            </div>
            <div className="lp-poster lp-poster--mid" style={{ background: "linear-gradient(160deg, #0A1628 0%, #061020 100%)" }}>
              <div className="lp-poster-map-lines lp-poster-map-lines--atlas" />
              <div className="lp-poster-text">
                <span className="lp-poster-city" style={{ color: "#D6B352" }}>Tokyo</span>
                <span className="lp-poster-country" style={{ color: "#8A6820" }}>Japan</span>
              </div>
            </div>
            <div className="lp-poster lp-poster--front" style={{ background: "linear-gradient(160deg, #FDF3E3 0%, #F0E8D0 100%)" }}>
              <div className="lp-poster-map-lines lp-poster-map-lines--saffron" />
              <div className="lp-poster-text">
                <span className="lp-poster-city" style={{ color: "#8B3A00" }}>Mumbai</span>
                <span className="lp-poster-country" style={{ color: "#C95A00" }}>India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme pill strip */}
        <div className="lp-theme-strip">
          <div className="lp-theme-strip-track">
            {[...THEMES, ...THEMES].map((t, i) => (
              <span key={i} className="lp-theme-pill">{t}</span>
            ))}
          </div>
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
            <p className="lp-step-body">Search any city or enter exact coordinates. The map updates instantly.</p>
          </div>
          <div className="lp-step-arrow" aria-hidden="true">→</div>
          <div className="lp-step">
            <div className="lp-step-num">02</div>
            <h3 className="lp-step-title">Choose a style</h3>
            <p className="lp-step-body">Pick from 23 themes. Adjust colors, typography, and layers.</p>
          </div>
          <div className="lp-step-arrow" aria-hidden="true">→</div>
          <div className="lp-step">
            <div className="lp-step-num">03</div>
            <h3 className="lp-step-title">Export & print</h3>
            <p className="lp-step-body">Download as PNG, PDF, or SVG. Print at home or at a print shop.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta">
        <div className="lp-cta-glow" aria-hidden="true" />
        <h2 className="lp-cta-heading">Your city. Your style.<br />Your poster.</h2>
        <button type="button" className="lp-btn-primary lp-btn-primary--large" onClick={openApp}>
          Create for free
        </button>
        <p className="lp-cta-sub">No account. No credit card. Works in any browser.</p>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-footer-left">
          <img src="/assets/logo.svg" alt="" className="lp-footer-logo" />
          <div>
            <p className="lp-footer-name">Atlasify</p>
            <p className="lp-footer-sub">by <a href="https://kjrlabs.in" target="_blank" rel="noreferrer" className="lp-footer-link">KJR Labs</a></p>
          </div>
        </div>
        <p className="lp-footer-attr">
          Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="lp-footer-link">OpenStreetMap contributors</a>
          {" · "}Tiles by <a href="https://openfreemap.org" target="_blank" rel="noreferrer" className="lp-footer-link">OpenFreeMap</a>
        </p>
      </footer>

    </div>
  );
}
