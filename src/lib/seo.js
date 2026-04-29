export const SITE_URL = "https://iss-education.online";
export const SITE_NAME = "ISS Explorer";
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const DEFAULT_DESCRIPTION =
  "Track the International Space Station live, explore real ISS telemetry, learn how orbit and microgravity work, and discover when you can see the ISS from Earth.";

export const routeMetadata = {
  "/": {
    title: "ISS Explorer – Live ISS Tracker and Space Station Learning Guide",
    description: DEFAULT_DESCRIPTION,
    path: "/"
  },
  "/tracker": {
    title: "Live ISS Tracker – Where Is the International Space Station Now?",
    description:
      "Follow the International Space Station in real time with live position, altitude, speed, visibility, ground track, and recent path information.",
    path: "/tracker"
  },
  "/learn": {
    title: "Learn About the ISS – Orbit, Microgravity and Life in Space",
    description:
      "Simple student-friendly explanations about the International Space Station, orbit, speed, microgravity, astronaut life, science, docking, and spacewalks.",
    path: "/learn"
  },
  "/see-the-iss": {
    title: "See the ISS from Earth – Visibility Guide and Pass Estimator",
    description:
      "Learn when and how to see the International Space Station from Earth, check visible pass estimates, and understand what makes a good ISS sighting.",
    path: "/see-the-iss"
  },
  "/gallery": {
    title: "ISS Gallery – NASA Images, Earth Views and Station Videos",
    description:
      "Explore NASA imagery of the International Space Station, astronauts, Earth views, science experiments, station interiors, and live station video.",
    path: "/gallery"
  },
  "/about-data": {
    title: "ISS Explorer Data Sources and Credits",
    description:
      "Learn where ISS Explorer gets its live ISS telemetry, NASA imagery, station facts, live video, and visibility estimate data.",
    path: "/about-data"
  }
};

export const sitemapRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/tracker", priority: "0.9", changefreq: "daily" },
  { path: "/learn", priority: "0.9", changefreq: "monthly" },
  { path: "/see-the-iss", priority: "0.8", changefreq: "weekly" },
  { path: "/gallery", priority: "0.7", changefreq: "weekly" },
  { path: "/about-data", priority: "0.5", changefreq: "monthly" }
];

export function canonicalUrl(path = "/") {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function getRouteMetadata(path) {
  return routeMetadata[path] || routeMetadata["/"];
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en"
  };
}

function baseWebPageSchema(metadata, type = "WebPage") {
  const url = canonicalUrl(metadata.path);

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: metadata.title,
    description: metadata.description,
    inLanguage: "en",
    isPartOf: {
      "@id": `${SITE_URL}/#website`
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    }
  };
}

export function createRouteSchema(path) {
  const metadata = getRouteMetadata(path);

  if (path === "/learn") {
    return [
      baseWebPageSchema(metadata),
      {
        "@context": "https://schema.org",
        "@type": "EducationalResource",
        "@id": `${canonicalUrl(path)}#educational-resource`,
        name: metadata.title,
        description: metadata.description,
        url: canonicalUrl(path),
        inLanguage: "en",
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
          "@id": `${SITE_URL}/#website`
        }
      }
    ];
  }

  if (path === "/gallery") {
    return {
      ...baseWebPageSchema(metadata, "CollectionPage"),
      about: [
        "International Space Station",
        "NASA imagery",
        "Earth observation",
        "Astronauts"
      ]
    };
  }

  return baseWebPageSchema(metadata);
}
