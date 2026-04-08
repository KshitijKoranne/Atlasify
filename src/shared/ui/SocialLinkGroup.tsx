import { KOFI_URL, REPO_API_URL, REPO_URL, SOCIAL_X } from "@/core/config";
import { useRepoStars } from "@/shared/hooks/useRepoStars";
import { GitHubIcon, KofiIcon, StarIcon, XTwitterIcon } from "@/shared/ui/Icons";

interface SocialLinkGroupProps {
  variant: "header" | "mobile-export";
}

export default function SocialLinkGroup({ variant }: SocialLinkGroupProps) {
  const repoUrl = String(REPO_URL ?? "").trim();
  const repoApiUrl = String(REPO_API_URL ?? "").trim();
  const xUrl = String(SOCIAL_X ?? "").trim();
  const kofiUrl = String(KOFI_URL ?? "").trim();
  const { repoStars, repoStarsLoading } = useRepoStars(repoApiUrl);
  const starsText = repoStarsLoading ? "..." : repoStars?.toLocaleString() ?? "Star";

  const rootClassName =
    variant === "header" ? "desktop-header-social" : "mobile-export-social-links";

  return (
    <div className={rootClassName} aria-label="Project links">
      {repoUrl ? (
        <a
          className="general-header-social-btn general-header-social-btn--github"
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Atlasify repository on GitHub"
          title="GitHub repository"
        >
          <GitHubIcon />
          <span className="general-header-github-stars">
            <span className="general-header-github-stars-count">{starsText}</span>
            <StarIcon />
          </span>
        </a>
      ) : null}
      {xUrl ? (
        <a
          className="general-header-social-btn"
          href={xUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow Atlasify on X"
          title="X (Twitter)"
        >
          <XTwitterIcon />
        </a>
      ) : null}
      {kofiUrl ? (
        <a
          className="general-header-social-btn"
          href={kofiUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Support Atlasify"
          title="Buy Me a Coffee"
        >
          <KofiIcon />
        </a>
      ) : null}
    </div>
  );
}
