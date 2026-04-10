import { AppProviders } from "@/core/AppProviders";
import AppShell from "@/shared/ui/AppShell";
import LandingPage from "./LandingPage";

function isStandalone(): boolean {
  // Already set by main.tsx on initial load
  if (document.documentElement.dataset.displayMode === "standalone") return true;
  // Also check /app path for when user navigates directly to the app
  if (window.location.pathname.startsWith("/app")) return true;
  return false;
}

export default function App() {
  if (isStandalone()) {
    return (
      <AppProviders>
        <AppShell />
      </AppProviders>
    );
  }

  return <LandingPage />;
}
