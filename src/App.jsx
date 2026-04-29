import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { PageHero } from "./components/ui/PageHero";
import { useIssTelemetry } from "./hooks/useIssTelemetry";
import { AboutDataPage } from "./pages/AboutDataPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { SeeTheIssPage } from "./pages/SeeTheIssPage";
import { TrackerPage } from "./pages/TrackerPage";
import {
  canonicalUrl,
  createRouteSchema,
  createWebsiteSchema,
  getRouteMetadata,
  OG_IMAGE_URL,
  SITE_NAME
} from "./lib/seo";

const EarthScene = lazy(() =>
  import("./components/scene/EarthScene").then((module) => ({
    default: module.EarthScene
  }))
);

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

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setJsonLd(id, data) {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function scrollToHash(hash = window.location.hash) {
  if (!hash) {
    return false;
  }

  const target = document.getElementById(decodeURIComponent(hash.slice(1)));

  if (!target) {
    return false;
  }

  target.scrollIntoView({ block: "start" });
  return true;
}

function usePathRouting() {
  const [currentPath, setCurrentPath] = useState(() => {
    const initialPath = normalizePath(window.location.pathname);

    if (initialPath === "/teachers") {
      window.history.replaceState({}, "", "/learn");
      return "/learn";
    }

    return initialPath;
  });

  useEffect(() => {
    function handlePopState() {
      const nextPath = normalizePath(window.location.pathname);

      if (nextPath === "/teachers") {
        window.history.replaceState({}, "", "/learn");
        setCurrentPath("/learn");
        return;
      }

      setCurrentPath(nextPath);
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

      if (url.origin !== window.location.origin) {
        return;
      }

      const nextPath = normalizePath(url.pathname);
      const currentPathBeforeNavigation = normalizePath(window.location.pathname);
      const resolvedPath = nextPath === "/teachers" ? "/learn" : nextPath;
      const resolvedHash = nextPath === "/teachers" ? "" : url.hash;
      const nextUrl = `${resolvedPath}${url.search}${resolvedHash}`;
      const currentUrl = `${currentPathBeforeNavigation}${window.location.search}${window.location.hash}`;

      event.preventDefault();

      if (nextUrl !== currentUrl) {
        window.history.pushState({}, "", nextUrl);
      }

      if (resolvedPath !== currentPathBeforeNavigation) {
        setCurrentPath(resolvedPath);
        return;
      }

      if (resolvedHash) {
        window.requestAnimationFrame(() => scrollToHash(resolvedHash));
      } else {
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
      viewing guide, gallery, or data notes.
    </PageHero>
  );
}

function App() {
  const telemetry = useIssTelemetry();
  const currentPath = usePathRouting();
  const metadata = getRouteMetadata(currentPath);
  const trackerScene = useMemo(
    () => (
      <Suspense fallback={<SceneLoadingState />}>
        <EarthScene telemetry={telemetry} />
      </Suspense>
    ),
    [telemetry]
  );

  useEffect(() => {
    const pageUrl = canonicalUrl(metadata.path);

    document.title = metadata.title;
    setLink("canonical", pageUrl);
    setMeta("robots", "index,follow");
    setMeta("description", metadata.description);
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:title", metadata.title, "property");
    setMeta("og:description", metadata.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", pageUrl, "property");
    setMeta("og:image", OG_IMAGE_URL, "property");
    setMeta("og:image:type", "image/png", "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:alt", "ISS Explorer live tracker and learning guide", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", metadata.title);
    setMeta("twitter:description", metadata.description);
    setMeta("twitter:image", OG_IMAGE_URL);
    setMeta("twitter:image:alt", "ISS Explorer live tracker and learning guide");
    setJsonLd("website-structured-data", createWebsiteSchema());
    setJsonLd("route-structured-data", createRouteSchema(metadata.path));
  }, [metadata]);

  useEffect(() => {
    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        if (!scrollToHash()) {
          window.setTimeout(() => scrollToHash(), 80);
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [currentPath]);

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
    ) : currentPath === "/about-data" ? (
      <AboutDataPage />
    ) : (
      <NotFoundPage />
    );

  return <Layout currentPath={currentPath}>{page}</Layout>;
}

export default App;
