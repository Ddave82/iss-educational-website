import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { PageHero } from "./components/ui/PageHero";
import { useIssTelemetry } from "./hooks/useIssTelemetry";
const AboutDataPage = lazy(() => import("./pages/AboutDataPage").then(module => ({ default: module.AboutDataPage })));
const GalleryPage = lazy(() => import("./pages/GalleryPage").then(module => ({ default: module.GalleryPage })));
import { HomePage } from "./pages/HomePage";
const LearnPage = lazy(() => import("./pages/LearnPage").then(module => ({ default: module.LearnPage })));
const SeeTheIssPage = lazy(() => import("./pages/SeeTheIssPage").then(module => ({ default: module.SeeTheIssPage })));
const StationPage = lazy(() => import("./pages/StationPage").then(module => ({ default: module.StationPage })));
const TrackerPage = lazy(() => import("./pages/TrackerPage").then(module => ({ default: module.TrackerPage })));
import {
  I18nProvider,
  languageMap,
  localizePath,
  parseLocalizedPath,
  routePaths,
  translations,
  useI18n
} from "./lib/i18n.jsx";
import {
  alternateUrls,
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

function setAlternateLinks(path) {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((element) => element.remove());

  alternateUrls(path).forEach((alternate) => {
    const element = document.createElement("link");
    element.setAttribute("rel", "alternate");
    element.setAttribute("hreflang", alternate.language);
    element.setAttribute("href", alternate.href);
    element.setAttribute("data-managed-alternate", "true");
    document.head.appendChild(element);
  });

  const defaultElement = document.createElement("link");
  defaultElement.setAttribute("rel", "alternate");
  defaultElement.setAttribute("hreflang", "x-default");
  defaultElement.setAttribute("href", canonicalUrl(path, "en"));
  defaultElement.setAttribute("data-managed-alternate", "true");
  document.head.appendChild(defaultElement);
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

function usePathRouting(initialPath) {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const pathname = initialPath ?? window.location.pathname;
    const initialRoute = parseLocalizedPath(pathname);

    if (typeof window !== "undefined" && initialRoute.path === "/learn" && pathname.includes("teachers")) {
      window.history.replaceState(
        {},
        "",
        `${localizePath("/learn", initialRoute.language)}${window.location.hash}`
      );
    }

    return initialRoute;
  });

  useEffect(() => {
    function handlePopState() {
      const nextRoute = parseLocalizedPath(window.location.pathname);

      if (nextRoute.path === "/learn" && window.location.pathname.includes("teachers")) {
        window.history.replaceState(
          {},
          "",
          `${localizePath("/learn", nextRoute.language)}${window.location.hash}`
        );
        setCurrentRoute({ ...nextRoute, path: "/learn" });
        return;
      }

      setCurrentRoute(previous => previous.path === nextRoute.path && previous.language === nextRoute.language ? previous : nextRoute);
    }

    function handleClick(event) {
      const anchor = event.target.closest("a");

      if (
        !anchor ||
        anchor.target ||
        anchor.hasAttribute("download") ||
        event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      ) {
        return;
      }

      const url = new URL(anchor.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      const nextRoute = parseLocalizedPath(url.pathname);
      // Let the server handle unknown paths and files, including their HTTP status.
      if (!routePaths.includes(nextRoute.path)) return;
      const currentRouteBeforeNavigation = parseLocalizedPath(window.location.pathname);
      const resolvedPath = nextRoute.path === "/teachers" ? "/learn" : nextRoute.path;
      const resolvedHash = url.pathname.includes("teachers") ? "" : url.hash;
      const nextUrl = `${localizePath(resolvedPath, nextRoute.language)}${url.search}${resolvedHash}`;
      const currentUrl = `${localizePath(
        currentRouteBeforeNavigation.path,
        currentRouteBeforeNavigation.language
      )}${window.location.search}${window.location.hash}`;

      event.preventDefault();

      if (nextUrl !== currentUrl) {
        window.history.pushState({}, "", nextUrl);
      }

      if (
        resolvedPath !== currentRouteBeforeNavigation.path ||
        nextRoute.language !== currentRouteBeforeNavigation.language
      ) {
        setCurrentRoute({ ...nextRoute, path: resolvedPath });
        return;
      }

      if (resolvedHash) {
        window.requestAnimationFrame(() => scrollToHash(resolvedHash));
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return currentRoute;
}

function SceneLoadingState() {
  const { t } = useI18n();

  return (
    <section className="scene-panel scene-loading">
      <div className="scene-copy">
        <div>
          <span className="panel-eyebrow">{t.scene.kicker}</span>
          <h2>{t.scene.title}</h2>
        </div>
      </div>
      <div className="scene-stage scene-stage-loading">
        <div className="scene-fallback">
          <span>{t.scene.loading}</span>
        </div>
      </div>
    </section>
  );
}

function NotFoundPage() {
  const { t } = useI18n();

  return (
    <PageHero kicker={t.notFound.kicker} title={t.notFound.title}>
      {t.notFound.body}
    </PageHero>
  );
}

function ClientScene({ telemetry }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted ? <EarthScene telemetry={telemetry} /> : <SceneLoadingState />;
}

function App({ initialPath }) {
  const telemetry = useIssTelemetry();
  const currentRoute = usePathRouting(initialPath);
  const currentPath = currentRoute.path;
  const language = currentRoute.language;
  const metadata = useMemo(
    () => getRouteMetadata(currentPath, language),
    [currentPath, language]
  );
  const trackerScene = useMemo(
    () => (
      <Suspense fallback={<SceneLoadingState />}>
        <ClientScene telemetry={telemetry} />
      </Suspense>
    ),
    [telemetry]
  );

  useEffect(() => {
    const languageInfo = languageMap[language] || languageMap.en;
    const activeTranslations = translations[language] || translations.en;
    const pageUrl = canonicalUrl(metadata.path, language);

    document.documentElement.lang = languageInfo.htmlLang;
    document.title = metadata.title;
    if (metadata.noindex) {
      document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach(element => element.remove());
    } else {
      setLink("canonical", pageUrl);
      setAlternateLinks(metadata.path);
    }
    setMeta("robots", metadata.noindex ? "noindex,follow" : "index,follow,max-image-preview:large");
    setMeta("description", metadata.description);
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:title", metadata.title, "property");
    setMeta("og:description", metadata.description, "property");
    setMeta("og:locale", languageInfo.locale, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", pageUrl, "property");
    setMeta("og:image", OG_IMAGE_URL, "property");
    setMeta("og:image:type", "image/png", "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:alt", activeTranslations.seo.ogImageAlt, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", metadata.title);
    setMeta("twitter:description", metadata.description);
    setMeta("twitter:image", OG_IMAGE_URL);
    setMeta("twitter:image:alt", activeTranslations.seo.ogImageAlt);
    setJsonLd("website-structured-data", createWebsiteSchema(language));
    setJsonLd("route-structured-data", createRouteSchema(metadata.path, language));
  }, [metadata, language]);

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
    ) : currentPath === "/station" ? (
      <StationPage />
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

  return (
    <I18nProvider language={language}>
      <Layout currentPath={currentPath}><Suspense fallback={<div className="route-loading" role="status">…</div>}>{page}</Suspense></Layout>
    </I18nProvider>
  );
}

export default App;
