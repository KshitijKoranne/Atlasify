import { useRepoStars } from "@/shared/hooks/useRepoStars";
import {
  REPO_URL,
  REPO_API_URL,
  KOFI_URL,
  SOCIAL_X,
} from "@/core/config";
import {
  GitHubIcon,
  StarIcon,
  CheckIcon,
  KofiIcon,
  XTwitterIcon,
} from "./Icons";

/* ── sub-components ── */

function HelpUsGrowSection({
  repoUrl,
  repoStars,
  repoStarsLoading,
}: {
  repoUrl: string;
  repoStars: number | null;
  repoStarsLoading: boolean;
}) {
  const starsText = repoStarsLoading
    ? "…"
    : repoStars !== null
      ? repoStars.toLocaleString()
      : null;

  const xUrl = String(SOCIAL_X ?? "").trim();
  const kofiUrl = String(KOFI_URL ?? "").trim();

  return (
    <section className="info-panel-section">
      <h3>Help Us Grow</h3>
      <p className="hug-copy">
        Atlasify is a map poster generator by KJR Labs. Follow along and support
        the project!
      </p>

      <div className="hug-rows">
        {/* Support the project */}
        <div className="hug-row">
          <span className="hug-row-label">Support the project</span>
          <div className="hug-row-content">
            {repoUrl ? (
              <a
                className="github-badge"
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Atlasify repository on GitHub"
              >
                <GitHubIcon className="badge-icon" />
                <span>GitHub Repo</span>
              </a>
            ) : (
              <span className="github-badge" style={{ opacity: 0.45 }}>
                <GitHubIcon className="badge-icon" />
                <span>GitHub Repo</span>
              </span>
            )}
            {repoUrl ? (
              <a
                className="github-badge stars-badge"
                href={`${repoUrl}/stargazers`}
                target="_blank"
                rel="noreferrer"
                aria-label="Star Atlasify on GitHub"
              >
                <StarIcon className="badge-icon" />
                <span>{starsText !== null ? starsText : "Star"}</span>
              </a>
            ) : (
              <span
                className="github-badge stars-badge"
                style={{ opacity: 0.45 }}
              >
                <StarIcon className="badge-icon" />
                <span>Star</span>
              </span>
            )}
            {kofiUrl ? (
              <a
                className="github-badge"
                href={kofiUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Support Atlasify"
              >
                <KofiIcon className="badge-icon" />
                <span>Buy Me a Coffee</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* Spread the word */}
        <div className="hug-row">
          <span className="hug-row-label">Spread the word</span>
          <div className="hug-row-content social-links-row">
            {xUrl ? (
              <a
                className="social-badge"
                href={xUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Atlasify on X"
                title="X (Twitter)"
              >
                <XTwitterIcon className="social-icon" />
              </a>
            ) : (
              <span className="social-badge social-badge--inactive" title="X (Twitter)">
                <XTwitterIcon className="social-icon" />
              </span>
            )}
          </div>
        </div>

        {/* Support the mission */}
        <div className="hug-row">
          <span className="hug-row-label">Support the mission</span>
          <div className="hug-row-content">
            <span className="hug-credits-note">
              <CheckIcon className="hug-check-icon" />
              Include credits to help others discover the tool
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── main panel ── */

export default function InfoPanel() {
  const repoUrl = String(REPO_URL ?? "").trim();
  const { repoStars, repoStarsLoading } = useRepoStars(REPO_API_URL);

  return (
    <aside className="info-panel">
      <div className="info-panel-group">
        <HelpUsGrowSection
          repoUrl={repoUrl}
          repoStars={repoStars}
          repoStarsLoading={repoStarsLoading}
        />
      </div>
    </aside>
  );
}
