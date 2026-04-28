import { useEffect } from "react";
import { PageHero } from "../components/ui/PageHero";

export function TeachersPage() {
  useEffect(() => {
    window.history.replaceState({}, "", "/learn#teacher-resources");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  return (
    <PageHero
      kicker="Moved"
      title="Teacher resources now live on Learn"
      actions={
        <>
          <a className="button-primary" href="/learn#teacher-resources">
            Open teacher resources
          </a>
          <a className="button-secondary" href="/tracker">
            Open live tracker
          </a>
        </>
      }
    >
      Classroom activities, the printable worksheet, discussion questions, and
      the quiz are now part of the main ISS learning guide.
    </PageHero>
  );
}
