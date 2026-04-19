import "./styles/landing.css";

const POSTERS = [
  { src: "/assets/posters/hannover-atlas.webp", city: "Atlas", theme: "Atlas" },
  { src: "/assets/posters/amsterdam-terracotta.webp", city: "Amsterdam", theme: "Terracotta" },
  { src: "/assets/posters/tokyo-blueprint.webp", city: "Tokyo", theme: "Blueprint" },
  { src: "/assets/posters/singapore-cyberpunk.webp", city: "Singapore", theme: "Cyberpunk" },
  { src: "/assets/posters/rio-emerald.webp", city: "Rio", theme: "Emerald" },
  { src: "/assets/posters/london-monochrome.webp", city: "London", theme: "Monochrome" },
  { src: "/assets/posters/rome-ember.webp", city: "Rome", theme: "Ember" },
  { src: "/assets/posters/halifax-mist.webp", city: "Halifax", theme: "Mist" },
  { src: "/assets/posters/budapest-ruby.webp", city: "Budapest", theme: "Ruby" },
  { src: "/assets/posters/capetown-noir.webp", city: "Cape Town", theme: "Noir" },
  { src: "/assets/posters/seattle-sand.webp", city: "Seattle", theme: "Sand" },
  { src: "/assets/posters/baghdad-parchment.webp", city: "Baghdad", theme: "Parchment" },
];

const FEATURES = [
  { icon: "◎", title: "23 Themes", body: "From Atlas to Cyberpunk — every theme is designed for print." },
  { icon: "⊞", title: "Any Size", body: "A4, A3, 4K wallpaper, social posts, or fully custom dimensions." },
  { icon: "↓", title: "Export Anything", body: "Free PNG, PDF, and SVG. Pay once for hi-res 2K, 4K, or 8K." },
  { icon: "✦", title: "Fully Custom", body: "Colors, typography, map layers, markers — all yours to tweak." },
  { icon: "⌖", title: "Any Location", body: "Search any city or drop in exact lat/lon coordinates." },
  { icon: "◈", title: "Works Offline", body: "Install as a PWA. Create posters without an internet connection." },
];

export default function LandingPage() {
  const openApp = () => { window.location.href = "/app"; };

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
            <div className="lp-hero-badge">Free · No sign-up · Works in browser</div>
            <h1 className="lp-hero-heading">
              Turn any place<br />into a poster.
            </h1>
            <p className="lp-hero-sub">
              Search a city, pick a theme, export a print-ready map poster.
              23 themes. Seconds, not hours.
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

          {/* Hero poster trio — real images */}
          <div className="lp-poster-stack" aria-hidden="true">
            <img src="/assets/posters/budapest-ruby.webp" alt="" className="lp-poster lp-poster--back" loading="eager" />
            <img src="/assets/posters/rome-ember.webp" alt="" className="lp-poster lp-poster--mid" loading="eager" />
            <img src="/assets/posters/amsterdam-terracotta.webp" alt="" className="lp-poster lp-poster--front" loading="eager" />
          </div>
        </div>
      </section>

      {/* ── Poster marquee ── */}
      <section className="lp-marquee" aria-label="Example map posters created with Atlasify">
        <div className="lp-marquee-track">
          {[...POSTERS, ...POSTERS].map((p, i) => (
            <div key={i} className="lp-marquee-card">
              <img src={p.src} alt={`${p.city} map poster — ${p.theme} theme`} className="lp-marquee-img" loading="lazy" />
              <div className="lp-marquee-label">
                <span className="lp-marquee-city">{p.city}</span>
                <span className="lp-marquee-theme">{p.theme}</span>
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
            <p className="lp-step-body">Download PNG, PDF, or SVG free. Upgrade once for hi-res 2K, 4K, or 8K.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta">
        <div className="lp-cta-glow" aria-hidden="true" />
        <h2 className="lp-cta-heading">Your city. Your style.<br />Your wall.</h2>
        <button type="button" className="lp-btn-primary lp-btn-primary--large" onClick={openApp}>
          Create for free
        </button>
        <p className="lp-cta-sub">No account needed. No credit card. Works in any modern browser.</p>
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
