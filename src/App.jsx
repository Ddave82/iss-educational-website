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
  I18nProvider,
  languageMap,
  localizePath,
  parseLocalizedPath,
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

function usePathRouting() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const initialRoute = parseLocalizedPath(window.location.pathname);

    if (initialRoute.path === "/learn" && window.location.pathname.includes("teachers")) {
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

      setCurrentRoute(nextRoute);
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

      const nextRoute = parseLocalizedPath(url.pathname);
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

function App() {
  const telemetry = useIssTelemetry();
  const currentRoute = usePathRouting();
  const currentPath = currentRoute.path;
  const language = currentRoute.language;
  const metadata = useMemo(
    () => getRouteMetadata(currentPath, language),
    [currentPath, language]
  );
  const trackerScene = useMemo(
    () => (
      <Suspense fallback={<SceneLoadingState />}>
        <EarthScene telemetry={telemetry} />
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
    setLink("canonical", pageUrl);
    setAlternateLinks(metadata.path);
    setMeta("robots", "index,follow");
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
      <Layout currentPath={currentPath}>{page}</Layout>
    </I18nProvider>
  );
}

export default App;
