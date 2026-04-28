import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { PageHero } from "./components/ui/PageHero";
import { useIssTelemetry } from "./hooks/useIssTelemetry";
import { AboutDataPage } from "./pages/AboutDataPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { SeeTheIssPage } from "./pages/SeeTheIssPage";
import { TeachersPage } from "./pages/TeachersPage";
import { TrackerPage } from "./pages/TrackerPage";

const EarthScene = lazy(() =>
  import("./components/scene/EarthScene").then((module) => ({
    default: module.EarthScene
  }))
);

const routeMetadata = {
  "/": {
    title: "ISS Explorer – Live Tracker and Educational Space Station Guide",
    description:
      "Track the International Space Station live, learn how it works, and discover when you can see it from Earth."
  },
  "/tracker": {
    title: "Live ISS Tracker – Where Is the Space Station Now?",
    description:
      "Follow the International Space Station live with current position, altitude, speed, and telemetry."
  },
  "/learn": {
    title: "Learn About the ISS – Orbit, Microgravity and Life in Space",
    description:
      "Simple explanations about the International Space Station, orbit, microgravity, experiments, and astronaut life."
  },
  "/see-the-iss": {
    title: "See the ISS from Earth – Viewing Guide",
    description:
      "Learn when and how to see the International Space Station from Earth."
  },
  "/gallery": {
    title: "ISS Gallery – NASA Images and Space Station Views",
    description:
      "Explore real NASA imagery of the International Space Station, Earth views, astronauts, and experiments."
  },
  "/teachers": {
    title: "ISS Teacher Resources – Space Lessons and Classroom Activities",
    description:
      "Lesson ideas, quiz questions, and classroom activities for learning about the International Space Station."
  },
  "/about-data": {
    title: "ISS Explorer Data Sources and Credits",
    description:
      "Learn where ISS Explorer gets its live data, imagery, and educational references."
  }
};

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname || "/";
}

function setMeta(name, content, attribute = "name") {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function usePathRouting() {
  const [currentPath, setCurrentPath] = useState(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    function handleClick(event) {
      const anchor = event.target.closest("a");

      if (
        !anchor ||
        anchor.target ||
        anchor.hasAttribute("download") ||
        event.defaultPrevented
      ) {
        return;
      }

      const url = new URL(anchor.href);

      if (url.origin !== window.location.origin || url.hash) {
        return;
      }

      const nextPath = normalizePath(url.pathname);
      event.preventDefault();

      if (nextPath !== normalizePath(window.location.pathname)) {
        window.history.pushState({}, "", `${nextPath}${url.search}`);
        setCurrentPath(nextPath);
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return currentPath;
}

function SceneLoadingState() {
  return (
    <section className="scene-panel scene-loading">
      <div className="scene-copy">
        <div>
          <span className="panel-eyebrow">Orbital View</span>
          <h2>Earth / ISS</h2>
        </div>
      </div>
      <div className="scene-stage scene-stage-loading">
        <div className="scene-fallback">
          <span>Loading the 3D scene...</span>
        </div>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <PageHero kicker="Route not found" title="This page is not on the station map">
      Use the navigation to return to the live tracker, learning modules,
      viewing guide, gallery, teacher resources, or data notes.
    </PageHero>
  );
}

function App() {
  const telemetry = useIssTelemetry();
  const currentPath = usePathRouting();
  const metadata = routeMetadata[currentPath] || routeMetadata["/"];
  const trackerScene = useMemo(
    () => (
      <Suspense fallback={<SceneLoadingState />}>
        <EarthScene telemetry={telemetry} />
      </Suspense>
    ),
    [telemetry]
  );

  useEffect(() => {
    document.title = metadata.title;
    setMeta("description", metadata.description);
    setMeta("og:title", metadata.title, "property");
    setMeta("og:description", metadata.description, "property");
    setMeta("og:type", "website", "property");
  }, [metadata]);

  const page =
    currentPath === "/" ? (
      <HomePage telemetry={telemetry} scene={trackerScene} />
    ) : currentPath === "/tracker" ? (
      <TrackerPage telemetry={telemetry} scene={trackerScene} />
    ) : currentPath === "/learn" ? (
      <LearnPage />
    ) : currentPath === "/see-the-iss" ? (
      <SeeTheIssPage />
    ) : currentPath === "/gallery" ? (
      <GalleryPage />
    ) : currentPath === "/teachers" ? (
      <TeachersPage />
    ) : currentPath === "/about-data" ? (
      <AboutDataPage />
    ) : (
      <NotFoundPage />
    );

  return <Layout currentPath={currentPath}>{page}</Layout>;
}

export default App;
