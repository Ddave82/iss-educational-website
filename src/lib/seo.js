import {
  DEFAULT_LANGUAGE,
  languageMap,
  languages,
  localizePath,
  routePaths,
  translations
} from "./i18n.jsx";

export const SITE_URL = "https://iss-education.online";
export const SITE_NAME = "ISS Explorer";
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const DEFAULT_DESCRIPTION = translations.en.seo.defaultDescription;

export const routeMetadata = Object.fromEntries(
  routePaths.map((path) => [
    path,
    {
      ...translations.en.seo.routes[path],
      path
    }
  ])
);

export const sitemapRoutes = routePaths.map(path => ({ path }));

export function canonicalUrl(path = "/", language = DEFAULT_LANGUAGE) {
  const localizedPath = localizePath(path, language);

  if (localizedPath === "/") {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${localizedPath}`;
}

export function getRouteMetadata(path, language = DEFAULT_LANGUAGE) {
  const activeTranslations = translations[language] || translations[DEFAULT_LANGUAGE];
  const route = activeTranslations.seo.routes[path];
  if (!route) return {
    title: `${activeTranslations.notFound.title} – ${SITE_NAME}`,
    description: activeTranslations.notFound.body,
    path,
    language,
    noindex: true
  };

  return {
    ...route,
    path,
    language
  };
}

export function alternateUrls(path = "/") {
  return languages.map((language) => ({
    language: language.htmlLang,
    href: canonicalUrl(path, language.code)
  }));
}

export function createWebsiteSchema(language = DEFAULT_LANGUAGE) {
  const activeTranslations = translations[language] || translations[DEFAULT_LANGUAGE];
  const languageInfo = languageMap[language] || languageMap[DEFAULT_LANGUAGE];

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${canonicalUrl("/", language)}#website`,
    name: SITE_NAME,
    url: canonicalUrl("/", language),
    description: activeTranslations.seo.defaultDescription,
    inLanguage: languageInfo.htmlLang,
    availableLanguage: languages.map((item) => item.htmlLang)
  };
}

function baseWebPageSchema(metadata, language = DEFAULT_LANGUAGE, type = "WebPage") {
  const url = canonicalUrl(metadata.path, language);
  const languageInfo = languageMap[language] || languageMap[DEFAULT_LANGUAGE];

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: metadata.title,
    description: metadata.description,
    inLanguage: languageInfo.htmlLang,
    isPartOf: {
      "@id": `${canonicalUrl("/", language)}#website`
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    }
  };
}

export function createRouteSchema(path, language = DEFAULT_LANGUAGE) {
  const metadata = getRouteMetadata(path, language);
  if (metadata.noindex) return [];
  const languageInfo = languageMap[language] || languageMap[DEFAULT_LANGUAGE];

  if (path === "/learn") {
    return [
      baseWebPageSchema(metadata, language),
      {
        "@context": "https://schema.org",
        "@type": "EducationalResource",
        "@id": `${canonicalUrl(path, language)}#educational-resource`,
        name: metadata.title,
        description: metadata.description,
        url: canonicalUrl(path, language),
        inLanguage: languageInfo.htmlLang,
        educationalLevel: "Beginner",
        learningResourceType: "Learning guide",
        about: [
          "International Space Station",
          "Orbit",
          "Microgravity",
          "Astronaut life",
          "Spacewalks"
        ],
        isPartOf: {
          "@id": `${canonicalUrl("/", language)}#website`
        }
      }
    ];
  }

  if (path === "/gallery") {
    return {
      ...baseWebPageSchema(metadata, language, "CollectionPage"),
      about: [
        "International Space Station",
        "NASA imagery",
        "Earth observation",
        "Astronauts"
      ]
    };
  }

  return baseWebPageSchema(metadata, language);
}
