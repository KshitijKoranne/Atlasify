import { useEffect, useRef } from "react";

export default function LandingPage() {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="lp-root">

      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-brand">
          <img src="/assets/logo.svg" alt="Atlasify" className="lp-nav-logo" />
          <span className="lp-nav-name">Atlasify</span>
        </div>
        <div className="lp-nav-actions">
          <a href="/app" className="lp-btn lp-btn--ghost lp-nav-cta">Open App</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero" ref={videoRef}>
        {/* Gradient orbs */}
        <div className="lp-orb lp-orb--amber" aria-hidden="true" />
        <div className="lp-orb lp-orb--blue" aria-hidden="true" />
        <div className="lp-orb lp-orb--cursor" aria-hidden="true" />

        <div className="lp-hero-content">
          <div className="lp-badge">Map Poster Generator</div>
          <h1 className="lp-hero-title">
            Turn any place<br />
            <span className="lp-hero-title--accent">into a poster.</span>
          </h1>
          <p className="lp-hero-sub">
            Design beautiful, print-ready map posters for any location in the world.
            Pick a theme, customise the style, export in high resolution.
          </p>
          <div className="lp-hero-ctas">
            <a href="/app" className="lp-btn lp-btn--primary">
              Create your poster
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#features" className="lp-btn lp-btn--ghost">See how it works</a>
          </div>
        </div>

        {/* Poster mockup grid */}
        <div className="lp-hero-mockup" aria-hidden="true">
          <div className="lp-mockup-frame lp-mockup-frame--1">
            <div className="lp-mockup-map" style={{"--map-bg": "#0A1628", "--map-road": "#C99C37"} as React.CSSProperties} />
            <div className="lp-mockup-text">
              <span className="lp-mockup-city">Mumbai</span>
              <span className="lp-mockup-country">India</span>
            </div>
          </div>
          <div className="lp-mockup-frame lp-mockup-frame--2">
            <div className="lp-mockup-map" style={{"--map-bg": "#0B0F1A", "--map-road": "#FF2D95"} as React.CSSProperties} />
            <div className="lp-mockup-text">
              <span className="lp-mockup-city">Tokyo</span>
              <span className="lp-mockup-country">Japan</span>
            </div>
          </div>
          <div className="lp-mockup-frame lp-mockup-frame--3">
            <div className="lp-mockup-map" style={{"--map-bg": "#FDF3E3", "--map-road": "#C95A00"} as React.CSSProperties} />
            <div className="lp-mockup-text lp-mockup-text--dark">
              <span className="lp-mockup-city">Dubai</span>
              <span className="lp-mockup-country">UAE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-features" id="features">
        <div className="lp-section-label">What you get</div>
        <h2 className="lp-section-title">Everything you need<br />to make a great poster</h2>

        <div className="lp-features-grid">
          {[
            {
              icon: "◈",
              title: "23 curated themes",
              desc: "From deep navy Atlas to warm Saffron and bold Cyberpunk. Every theme is hand-tuned for print."
            },
            {
              icon: "⬡",
              title: "Any location on Earth",
              desc: "Search by city name or enter exact latitude and longitude. Powered by OpenStreetMap."
            },
            {
              icon: "▣",
              title: "Print & screen formats",
              desc: "A3, A4, A5, Instagram, wallpapers for every device. Export PNG, PDF or SVG."
            },
            {
              icon: "◎",
              title: "Custom typography",
              desc: "10 font families. Adjust city name, subtitle, and coordinate display to your taste."
            },
            {
              icon: "⬟",
              title: "Layer control",
              desc: "Toggle roads, buildings, water, parks, railways. Get exactly the detail you want."
            },
            {
              icon: "✦",
              title: "High-res export",
              desc: "2K, 4K and 8K exports for print-quality output. Sharp at any size."
            },
          ].map((f) => (
            <div className="lp-feature-card" key={f.title}>
              <span className="lp-feature-icon">{f.icon}</span>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THEMES STRIP ── */}
      <section className="lp-themes">
        <div className="lp-section-label">Themes</div>
        <h2 className="lp-section-title">A palette for every mood</h2>
        <div className="lp-themes-strip">
          {[
            { name: "Atlas", bg: "#0A1628", accent: "#C99C37" },
            { name: "Cyberpunk", bg: "#0B0F1A", accent: "#FF2D95" },
            { name: "Ember", bg: "#1C0E09", accent: "#FF5F1F" },
            { name: "Saffron", bg: "#FDF3E3", accent: "#C95A00", dark: true },
            { name: "Dusk", bg: "#1A0E2A", accent: "#D4608A" },
            { name: "Terracotta", bg: "#F5EDE4", accent: "#A0522D", dark: true },
            { name: "Emerald", bg: "#062C22", accent: "#4ADEB0" },
            { name: "Noir", bg: "#000000", accent: "#E8E8E8" },
            { name: "Arctic", bg: "#F0F6FA", accent: "#1A3A5A", dark: true },
            { name: "Blueprint", bg: "#1A3A5C", accent: "#D8EEFA" },
          ].map((t) => (
            <a href="/app" className="lp-theme-chip" key={t.name}
              style={{"--chip-bg": t.bg, "--chip-accent": t.accent} as React.CSSProperties}
            >
              <span className="lp-theme-chip-dot" />
              <span className={`lp-theme-chip-name${t.dark ? " lp-theme-chip-name--dark" : ""}`}>{t.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="lp-cta-band">
        <div className="lp-orb lp-orb--cta-amber" aria-hidden="true" />
        <h2 className="lp-cta-title">Start making your poster</h2>
        <p className="lp-cta-sub">No account needed. Free to use.</p>
        <a href="/app" className="lp-btn lp-btn--primary lp-btn--large">
          Open Atlasify
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-brand">
          <img src="/assets/logo.svg" alt="" className="lp-footer-logo" />
          <span>Atlasify by <a href="https://kjrlabs.in" target="_blank" rel="noreferrer">KJR Labs</a></span>
        </div>
        <div className="lp-footer-links">
          <a href="https://x.com/kshitijkoranne" target="_blank" rel="noreferrer">X / Twitter</a>
          <a href="https://github.com/KshitijKoranne/Atlasify" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p className="lp-footer-copy">© 2026 KJR Labs. Map data © OpenStreetMap contributors.</p>
      </footer>

    </div>
  );
}
