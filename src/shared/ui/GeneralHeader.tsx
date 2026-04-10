import SocialLinkGroup from "@/shared/ui/SocialLinkGroup";

export default function GeneralHeader() {
  return (
    <header className="general-header">
      <div className="desktop-brand">
        <img
          className="desktop-brand-logo brand-logo"
          src="/assets/logo.svg"
          alt="Atlasify logo"
        />
        <div className="desktop-brand-copy brand-copy">
          <h1 className="desktop-brand-title">Atlasify</h1>
          <p className="desktop-brand-kicker app-kicker">
            Map Poster Generator
          </p>
        </div>
      </div>

      <div className="general-header-actions">
        <SocialLinkGroup variant="header" />
      </div>
    </header>
  );
}
