import { AppProviders } from "@/core/AppProviders";
import AppShell from "@/shared/ui/AppShell";
import LandingPage from "./LandingPage";

function isAppMode(): boolean {
  if (document.documentElement.dataset.displayMode === "standalone") return true;
  if (window.location.pathname.startsWith("/app")) return true;
  return false;
}

export default function App() {
  if (isAppMode()) {
    // Mark <html> so desktop CSS can lock scroll for the app
    document.documentElement.dataset.appMode = "app";
    return (
      <AppProviders>
        <AppShell />
      </AppProviders>
    );
  }

  // Landing page — remove app-mode if someone navigates back
  delete document.documentElement.dataset.appMode;
  return <LandingPage />;
}
