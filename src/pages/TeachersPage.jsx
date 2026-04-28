import { useEffect } from "react";
import { PageHero } from "../components/ui/PageHero";

export function TeachersPage() {
  useEffect(() => {
    window.history.replaceState({}, "", "/learn");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  return (
    <PageHero
      kicker="Moved"
      title="Teacher resources are paused"
      actions={
        <>
          <a className="button-primary" href="/learn">
            Open Learn
          </a>
          <a className="button-secondary" href="/tracker">
            Open live tracker
          </a>
        </>
      }
    >
      The classroom resource section and printable worksheet are temporarily
      removed. The main learning guide and live tracker remain available.
    </PageHero>
  );
}
