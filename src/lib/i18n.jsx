import { createContext, useContext } from "react";

export const DEFAULT_LANGUAGE = "en";

export const languages = [
  {
    code: "en",
    htmlLang: "en",
    locale: "en_US",
    intlLocale: "en-US",
    label: "English",
    shortLabel: "EN",
    flag: "🇬🇧",
    prefix: ""
  },
  {
    code: "de",
    htmlLang: "de",
    locale: "de_DE",
    intlLocale: "de-DE",
    label: "Deutsch",
    shortLabel: "DE",
    flag: "🇩🇪",
    prefix: "/de"
  },
  {
    code: "da",
    htmlLang: "da",
    locale: "da_DK",
    intlLocale: "da-DK",
    label: "Dansk",
    shortLabel: "DA",
    flag: "🇩🇰",
    prefix: "/da"
  }
];

export const languageCodes = languages.map((language) => language.code);
export const languageMap = Object.fromEntries(
  languages.map((language) => [language.code, language])
);

export const routePaths = [
  "/",
  "/tracker",
  "/learn",
  "/see-the-iss",
  "/gallery",
  "/about-data"
];

export function normalizeBasePath(pathname) {
  const normalized = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname || "/";

  return normalized || "/";
}

export function parseLocalizedPath(pathname) {
  const normalized = normalizeBasePath(pathname);
  const [, firstSegment = "", ...restSegments] = normalized.split("/");
  const hasLanguagePrefix = languageCodes.includes(firstSegment);
  const language = hasLanguagePrefix ? firstSegment : DEFAULT_LANGUAGE;
  const basePath = hasLanguagePrefix
    ? normalizeBasePath(`/${restSegments.join("/")}`)
    : normalized;
  const resolvedPath = basePath === "/teachers" ? "/learn" : basePath;

  return {
    language,
    path: routePaths.includes(resolvedPath) ? resolvedPath : resolvedPath || "/",
    hasLanguagePrefix
  };
}

export function localizePath(path = "/", language = DEFAULT_LANGUAGE) {
  if (/^(https?:|mailto:|tel:)/.test(path)) {
    return path;
  }

  if (path.startsWith("#")) {
    return path;
  }

  const [pathPart = "/", hashPart = ""] = path.split("#");
  const normalizedPath = normalizeBasePath(pathPart || "/");
  const prefix = languageMap[language]?.prefix || "";
  const localizedPath =
    normalizedPath === "/"
      ? prefix || "/"
      : `${prefix}${normalizedPath}`;

  return hashPart ? `${localizedPath}#${hashPart}` : localizedPath;
}

export function languageUrlForPath(path, language) {
  const localized = localizePath(path, language);
  return localized === "/" ? "/" : localized;
}

const en = {
  code: "en",
  common: {
    brand: "ISS Explorer",
    menu: "Menu",
    backToTop: "Back to top",
    moreAbout: (label) => (label ? `More about ${label}` : "More information"),
    dismissInformation: "Dismiss information",
    notAvailable: "Not available",
    noUpdateYet: "No update yet",
    waitingForFirstUpdate: "Waiting for first update",
    secondsOld: (seconds) => `${seconds}s old`,
    minutesOld: (minutes) => `${minutes} min old`,
    aboutAltitude: "About 400 km",
    aboutVelocity: "About 27,600 km/h",
    degree: "deg",
    status: {
      loading: "Connecting",
      stale: "Cached",
      offline: "Offline",
      partial: "Partial",
      live: "Live"
    }
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Live Tracker", href: "/tracker" },
    { label: "Learn", href: "/learn" },
    { label: "See the ISS", href: "/see-the-iss" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Data", href: "/about-data" }
  ],
  notFound: {
    kicker: "Route not found",
    title: "This page is not on the station map",
    body:
      "Use the navigation to return to the live tracker, learning modules, viewing guide, gallery, or data notes."
  },
  seo: {
    siteName: "ISS Explorer",
    ogImageAlt: "ISS Explorer live tracker and learning guide",
    defaultDescription:
      "Track the International Space Station live, explore real ISS telemetry, learn how orbit and microgravity work, and discover when you can see the ISS from Earth.",
    routes: {
      "/": {
        title: "ISS Explorer – Live ISS Tracker and Space Station Learning Guide",
        description:
          "Track the International Space Station live, explore real ISS telemetry, learn how orbit and microgravity work, and discover when you can see the ISS from Earth."
      },
      "/tracker": {
        title: "Live ISS Tracker – Where Is the International Space Station Now?",
        description:
          "Follow the International Space Station in real time with live position, altitude, speed, visibility, ground track, and recent path information."
      },
      "/learn": {
        title: "Learn About the ISS – Orbit, Microgravity and Life in Space",
        description:
          "Simple student-friendly explanations about the International Space Station, orbit, speed, microgravity, astronaut life, science, docking, and spacewalks."
      },
      "/see-the-iss": {
        title: "See the ISS from Earth – Visibility Guide and Pass Estimator",
        description:
          "Learn when and how to see the International Space Station from Earth, check visible pass estimates, and understand what makes a good ISS sighting."
      },
      "/gallery": {
        title: "ISS Gallery – NASA Images, Earth Views and Station Videos",
        description:
          "Explore NASA imagery of the International Space Station, astronauts, Earth views, science experiments, station interiors, and live station video."
      },
      "/about-data": {
        title: "ISS Explorer Data Sources and Credits",
        description:
          "Learn where ISS Explorer gets its live ISS telemetry, NASA imagery, station facts, live video, and visibility estimate data."
      }
    }
  },
  home: {
    liveLine: (speed) => `Currently orbiting Earth at ${speed}`,
    title: "International Space Station",
    intro:
      "Track the ISS live, learn how it works, and discover when you can see it from Earth.",
    actions: {
      tracker: "Track ISS live",
      learn: "Start learning",
      fullTracker: "Open full tracker",
      learningGuide: "Open learning guide",
      passes: "Check visible passes",
      gallery: "Open full gallery",
      nasaLive: "Watch NASA live"
    },
    heroAlt: "The International Space Station photographed in orbit",
    figcaption: (groundTrack) => <>NASA imagery. Live ground track: <strong>{groundTrack || "finding station"}</strong></>,
    trackerKicker: "Live tracker",
    trackerTitle: "Where is the ISS right now?",
    trackerIntro:
      "The tracker updates the station position, draws its recent path, and shows live telemetry from the current orbit.",
    learnKicker: "Learn fast",
    learnTitle: "Learn the ISS in 5 minutes",
    learnIntro:
      "Start with a guided learning journey about orbit, microgravity, station life, science, docking, and spacewalks.",
    learningTeasers: [
      "Orbit, speed, and why the station keeps missing the ground",
      "Microgravity, floating astronauts, and daily life onboard",
      "Science, docking, spacewalks, and station operations"
    ],
    viewingKicker: "Viewing guide",
    viewingTitle: "Can you see the ISS tonight?",
    viewingIntro:
      "The ISS is easiest to spot shortly after sunset or before sunrise, when the sky is dark but the station is still lit by the Sun.",
    viewingTeasers: [
      "Best shortly after sunset or before sunrise",
      "Looks like a bright moving star",
      "Visibility depends on location, sky conditions, and orbit path"
    ],
    galleryTitle: "Featured NASA station views.",
    galleryIntro:
      "A small preview of real NASA imagery. Open the full gallery for more station visuals, Earth views, crew work, and research scenes.",
    finalTitle: "Ready to explore the station?"
  },
  factStrip: {
    aria: "ISS quick facts",
    altitudeLabel: "Current altitude",
    altitudeDetail: "The exact height changes as orbit maintenance adjusts the station.",
    altitudeInfo: "Altitude is the station's height above Earth's surface.",
    speedLabel: "Orbital speed",
    speedDetail: "Fast enough to circle Earth in roughly 90 minutes.",
    speedInfo: "Velocity means speed in a direction along the station's orbit.",
    orbitsValue: "About 16",
    orbitsLabel: "Orbits per day",
    orbitsDetail: "The crew sees day and night many times in one Earth day.",
    statusValue: "Crewed",
    statusLabel: "Station status",
    statusDetail: "A continuously inhabited orbital laboratory since November 2000.",
    updatedLabel: "Last updated",
    updatedDetail: "Live telemetry refreshes about every 10 seconds when reachable.",
    updatedInfo: "Telemetry is live measurement data from the station position feed."
  },
  tracker: {
    srTitle: "Live ISS Tracker",
    loading: "Connecting to live ISS telemetry...",
    staleTitle: "Showing last known position",
    offlineTitle: "Tracker feed offline",
    notes: [
      {
        title: "Data source",
        body:
          "Current ISS telemetry is requested from the public wheretheiss.at satellite endpoint. The app refreshes about every 10 seconds while the page is open."
      },
      {
        title: "Approximation note",
        body:
          "Position, altitude, speed, daylight state, ground track, and recent trail are useful educational approximations. Network delays, feed outages, and orbital model updates can make values briefly stale."
      },
      {
        title: "Recent path",
        body: (count) =>
          `The trail uses the last ${count} live samples in this browser session. It builds after the page has collected several updates.`
      }
    ],
    liveTitle: "Live station view",
    liveIntro: "Watch NASA's live ISS stream when available.",
    fallback: [
      { label: "Explore NASA gallery", href: "/gallery" },
      { label: "Learn about the ISS", href: "/learn" }
    ]
  },
  sidebar: {
    missionControl: "Mission Control",
    liveTelemetry: "Live Telemetry",
    pointsTrail: (count, minutes) => `${count} points / ${minutes} min trail`,
    buildingTrail: "Building trail",
    unstable: "Data feed unstable",
    labels: {
      latitude: "Latitude",
      longitude: "Longitude",
      altitude: "Altitude",
      speed: "Speed",
      visibility: "Visibility",
      groundTrack: "Ground track",
      direction: "Direction",
      lastUpdate: "Last update"
    },
    altitudeInfo:
      "Altitude is the station's height above Earth's surface. It changes slightly as the orbit is adjusted.",
    velocityLabel: "Velocity",
    velocityInfo:
      "Velocity means speed plus direction. The station moves fast enough to circle Earth in roughly 90 minutes.",
    groundTrackFallback: "Not available",
    footprint: (value) => `Footprint ${value}`,
    groundTrackInfo: "Ground track is the place on Earth directly under the station's path.",
    directionHint: "Calculated from the latest live points",
    visibility: {
      daylight: "Sunlit",
      eclipsed: "In Earth's shadow",
      unknown: "Not available"
    }
  },
  scene: {
    fallback: "The 3D view could not be loaded.",
    loading: "Loading the 3D scene...",
    kicker: "Orbital View",
    title: "Earth / ISS",
    closeFullscreen: "Close Orbital View fullscreen",
    openFullscreen: "Open Orbital View fullscreen",
    exitFullscreen: "Exit fullscreen",
    fullscreen: "Fullscreen",
    groundTrack: "Ground Track",
    findingPosition: "Finding position",
    status: {
      live: "Tracking in real time",
      partial: "Position-only feed",
      stale: "Last known position",
      waiting: "Waiting for data"
    },
    mobileHint: "Drag: orbit view / Pinch: zoom / Dashed line: orbit preview",
    desktopHint: "Mouse wheel: zoom / Drag: orbit view / Dashed line: orbit preview"
  },
  see: {
    kicker: "Viewing guide",
    title: "See the ISS from Earth",
    intro: "Learn when and how to see the International Space Station from your location.",
    lookupKicker: "Pass lookup",
    lookupTitle: "Can you see it soon?",
    lookupIntro:
      "Enter your coordinates or use browser location permission to estimate visible ISS pass candidates for the next 48 hours.",
    finePrint:
      "Predictions use current TLE orbital data in the browser. They are educational estimates, not official viewing alerts. Re-check close to viewing time and use local sky conditions.",
    trackerLink: "Open live tracker",
    estimatorTitle: "Visible pass estimator",
    tipsKicker: "Observing tips",
    tipsTitle: "How to spot the station",
    tipsIntro:
      "Use the pass estimator first, then scan for a steady bright point moving across the predicted sky path.",
    tips: [
      { title: "Best time to look", body: "Shortly after sunset or before sunrise." },
      { title: "What it looks like", body: "A bright, steady moving point of light." },
      { title: "What direction to look", body: "Use the pass prediction direction and watch the sky path." },
      { title: "What makes a good pass", body: "High above the horizon, several minutes long, and under clear skies." },
      { title: "What can block visibility", body: "Clouds, haze, buildings, trees, city glare, or Earth's shadow." },
      { title: "How it differs from aircraft", body: "It usually does not blink and moves smoothly." }
    ],
    sequenceAria: "Compact ISS viewing sequence",
    sequence: ["Bright dot", "Steady movement", "Disappears in shadow"],
    liveIntro:
      "Watch NASA's live ISS stream when available, then use the viewing guide to understand when the station might be visible from Earth.",
    fallback: [
      { label: "Open live tracker", href: "/tracker" },
      { label: "Explore NASA gallery", href: "/gallery" }
    ]
  },
  pass: {
    geolocationUnavailable: "Geolocation is not available in this browser.",
    permissionDenied: "Location permission was denied. Enter coordinates manually instead.",
    calculating: "Calculating visible pass candidates...",
    estimates: "Times are estimates based on current orbital data. Re-check close to viewing time.",
    none: "No visible pass candidates found in the next 48 hours. Try again tomorrow.",
    requesting: "Requesting your browser location...",
    useLocation: "Use my location",
    latitude: "Latitude",
    longitude: "Longitude",
    calculate: "Calculate",
    listAria: "Predicted visible ISS passes",
    direction: (start, end, elevation) => `${start} to ${end} / ${elevation} deg max`,
    duration: (minutes) => `${minutes} min`,
    visibleWindow: "visible window",
    emptyCompact:
      "Enter a location to estimate upcoming visible passes. The result uses current TLE orbital data and should be checked again near viewing time."
  },
  media: {
    defaultTitle: "Real station imagery for learning and wonder.",
    defaultIntro:
      "These images are loaded from NASA's public Image and Video Library when available. If the API is unreachable, curated NASA gallery items remain visible.",
    kicker: "NASA media library",
    viewSource: "View source",
    loading: "Loading NASA media...",
    fallback: "Showing curated NASA gallery fallbacks.",
    live: "Showing current NASA Image and Video Library results.",
    emptyTitle: "No images available yet",
    emptyBody: "NASA results can vary by request. Try again later.",
    fallbackItems: {
      jsc2021e064215_alt: {
        title: "International Space Station flyaround",
        description: "The station photographed after Crew Dragon Endeavour undocked and completed a flyaround."
      },
      iss065e242460: {
        title: "Research inside the station",
        description: "Astronauts work near the Life Sciences Glovebox, where research can run in microgravity."
      },
      iss060e000604: {
        title: "Earth from orbit",
        description: "ISS crews photograph deserts, rivers, storms, cities, and coastlines from hundreds of kilometers above Earth."
      },
      iss064e055946: {
        title: "Airglow and the Milky Way",
        description: "A thin line of atmosphere glows below the stars in a view photographed from the station."
      }
    }
  },
  livestream: {
    title: "NASA Live and station views.",
    intro:
      "NASA Live carries agency programming and links to Space Station Views when live ISS video is available. During signal handovers, station video may pause or show a holding screen.",
    watchLive: "Watch live",
    iframeTitle: "NASA Live stream",
    signalNotes: "About the stream",
    unavailable: "Live views from orbit",
    body:
      "When station video is available, NASA shows views from cameras mounted on the outside of the ISS. The picture comes from about 400 kilometers above Earth as the station circles the planet roughly every 90 minutes.",
    fallbackActions: [
      { label: "Open live tracker", href: "/tracker" },
      { label: "Explore NASA imagery", href: "/gallery" },
      {
        label: "Open stream on YouTube",
        href: "https://www.youtube.com/watch?v=zPH5KtjJFaQ",
        external: true
      }
    ]
  },
  gallery: {
    kicker: "NASA imagery",
    title: "ISS Gallery",
    intro:
      "Explore real NASA imagery of the station, Earth views, astronauts, research, and station operations.",
    mediaTitle: "NASA images and station visuals.",
    mediaIntro:
      "The gallery loads NASA Image and Video Library results when available and falls back to curated NASA station imagery if the API cannot be reached."
  },
  about: {
    kicker: "Sources and credits",
    title: "ISS Explorer Data Sources and Credits",
    intro:
      "Learn where ISS Explorer gets its live data, imagery, educational references, and what the limitations are.",
    sourcesKicker: "Configured sources",
    sourcesTitle: "Data used by this site",
    sourcesIntro: "These are the sources currently configured in the codebase.",
    limitsKicker: "How to read the data",
    limitsTitle: "Limitations and behavior",
    limitsIntro:
      "Live educational tools are most useful when they explain what they can and cannot guarantee.",
    notes: [
      {
        title: "Live ISS telemetry",
        body: "The current position feed is requested through this site's /api/iss/current route, which proxies wheretheiss.at and falls back to a simpler ISS position source if needed."
      },
      {
        title: "Update frequency",
        body: "The browser polls live ISS telemetry about every 10 seconds while the page is open. Last updated means the time the latest accepted telemetry point was received."
      },
      {
        title: "Approximate values",
        body: "Altitude, velocity, visibility, footprint, direction, and ground track are educational telemetry values and can be briefly stale if a request fails."
      },
      {
        title: "Pass predictions",
        body: "Visible pass estimates use the wheretheiss.at TLE endpoint and in-browser SGP4 calculations. They are useful estimates, not official viewing alerts."
      },
      {
        title: "NASA imagery",
        body: "Gallery images are loaded from NASA's Image and Video Library when available. Curated NASA gallery fallbacks remain visible if the API request fails."
      },
      {
        title: "Video limitations",
        body: "The embedded NASA Live feed can pause, switch programming, or be offline during camera handovers, signal gaps, or agency schedule changes."
      },
      {
        title: "Privacy",
        body: "The app does not include analytics or user tracking code. Browser location is requested only when a user chooses the pass lookup location button."
      }
    ]
  },
  footer: {
    kicker: "Keep exploring",
    title: "Ready to explore the station?",
    intro:
      "Track the ISS live, learn the science behind orbit, and use the classroom resources for a short activity or a full lesson.",
    actions: [
      { label: "Track ISS live", href: "/tracker" },
      { label: "Start learning", href: "/learn" }
    ],
    note:
      "NASA material is credited as source material and is not used to imply endorsement. Third-party credits are preserved where NASA lists them.",
    dataSources: [
      {
        label: "Where the ISS at?",
        description: "HTTPS live ISS position and TLE endpoint used by the tracker and pass calculator.",
        href: "https://wheretheiss.at/w/developer"
      },
      {
        label: "NASA Image and Video Library",
        description: "Searchable NASA images, videos, and audio used for the media gallery.",
        href: "https://images.nasa.gov/"
      },
      {
        label: "NASA Station Facts",
        description: "Core ISS facts such as size, orbit time, partner agencies, and occupation history.",
        href: "https://www.nasa.gov/international-space-station/space-station-facts-and-figures/"
      },
      {
        label: "NASA Live",
        description: "Embedded NASA Live stream and external live programming link.",
        href: "https://www.nasa.gov/live/"
      }
    ]
  }
};

const de = {
  ...en,
  code: "de",
  common: {
    ...en.common,
    menu: "Menü",
    backToTop: "Nach oben",
    moreAbout: (label) => (label ? `Mehr über ${label}` : "Weitere Informationen"),
    dismissInformation: "Information schließen",
    notAvailable: "Nicht verfügbar",
    noUpdateYet: "Noch keine Aktualisierung",
    waitingForFirstUpdate: "Warten auf erste Aktualisierung",
    secondsOld: (seconds) => `${seconds}s alt`,
    minutesOld: (minutes) => `${minutes} Min. alt`,
    aboutAltitude: "Etwa 400 km",
    aboutVelocity: "Etwa 27.600 km/h",
    degree: "Grad",
    status: {
      loading: "Verbinden",
      stale: "Zwischengespeichert",
      offline: "Offline",
      partial: "Teilweise",
      live: "Live"
    }
  },
  nav: [
    { label: "Start", href: "/" },
    { label: "Live-Tracker", href: "/tracker" },
    { label: "Lernen", href: "/learn" },
    { label: "ISS sehen", href: "/see-the-iss" },
    { label: "Galerie", href: "/gallery" },
    { label: "Daten", href: "/about-data" }
  ],
  notFound: {
    kicker: "Route nicht gefunden",
    title: "Diese Seite liegt nicht auf der Stationskarte",
    body:
      "Nutze die Navigation, um zum Live-Tracker, zu den Lernmodulen, zum Sichtbarkeitsführer, zur Galerie oder zu den Datenhinweisen zurückzukehren."
  },
  seo: {
    ...en.seo,
    ogImageAlt: "ISS Explorer Live-Tracker und Lernführer",
    defaultDescription:
      "Verfolge die Internationale Raumstation live, erkunde echte ISS-Telemetrie, lerne, wie Orbit und Mikrogravitation funktionieren, und finde heraus, wann du die ISS von der Erde sehen kannst.",
    routes: {
      "/": {
        title: "ISS Explorer – Live-ISS-Tracker und Lernführer zur Raumstation",
        description:
          "Verfolge die Internationale Raumstation live, erkunde echte ISS-Telemetrie, lerne, wie Orbit und Mikrogravitation funktionieren, und finde heraus, wann du die ISS von der Erde sehen kannst."
      },
      "/tracker": {
        title: "Live-ISS-Tracker – Wo ist die Internationale Raumstation jetzt?",
        description:
          "Folge der Internationalen Raumstation in Echtzeit mit Position, Höhe, Geschwindigkeit, Sichtbarkeit, Bodenspur und aktuellem Flugpfad."
      },
      "/learn": {
        title: "Über die ISS lernen – Orbit, Mikrogravitation und Leben im All",
        description:
          "Einfache, schülerfreundliche Erklärungen zur Internationalen Raumstation, zu Orbit, Geschwindigkeit, Mikrogravitation, Astronautenleben, Wissenschaft, Andocken und Weltraumspaziergängen."
      },
      "/see-the-iss": {
        title: "Die ISS von der Erde sehen – Sichtbarkeitsführer und Überflugrechner",
        description:
          "Lerne, wann und wie du die Internationale Raumstation von der Erde sehen kannst, prüfe sichtbare Überflüge und verstehe, was eine gute ISS-Sichtung ausmacht."
      },
      "/gallery": {
        title: "ISS-Galerie – NASA-Bilder, Erdansichten und Stationsvideos",
        description:
          "Erkunde NASA-Bildmaterial der Internationalen Raumstation, Astronauten, Erdansichten, Forschungsexperimente, Innenräume der Station und Live-Video."
      },
      "/about-data": {
        title: "ISS Explorer Datenquellen und Credits",
        description:
          "Erfahre, woher ISS Explorer Live-Telemetrie, NASA-Bilder, Stationsfakten, Live-Video und Sichtbarkeitsschätzungen bezieht."
      }
    }
  },
  home: {
    ...en.home,
    liveLine: (speed) => `Umläuft die Erde gerade mit ${speed}`,
    intro:
      "Verfolge die ISS live, lerne, wie sie funktioniert, und finde heraus, wann du sie von der Erde sehen kannst.",
    actions: {
      tracker: "ISS live verfolgen",
      learn: "Lernen starten",
      fullTracker: "Vollen Tracker öffnen",
      learningGuide: "Lernführer öffnen",
      passes: "Sichtbare Überflüge prüfen",
      gallery: "Ganze Galerie öffnen",
      nasaLive: "NASA live ansehen"
    },
    heroAlt: "Die Internationale Raumstation im Orbit fotografiert",
    figcaption: (groundTrack) => <>NASA-Bildmaterial. Live-Bodenspur: <strong>{groundTrack || "Station wird gesucht"}</strong></>,
    trackerKicker: "Live-Tracker",
    trackerTitle: "Wo ist die ISS gerade?",
    trackerIntro:
      "Der Tracker aktualisiert die Stationsposition, zeichnet den letzten Pfad und zeigt Live-Telemetrie aus dem aktuellen Orbit.",
    learnKicker: "Schnell lernen",
    learnTitle: "Die ISS in 5 Minuten verstehen",
    learnIntro:
      "Starte mit einer geführten Lernreise zu Orbit, Mikrogravitation, Stationsleben, Wissenschaft, Andocken und Weltraumspaziergängen.",
    learningTeasers: [
      "Orbit, Geschwindigkeit und warum die Station den Boden immer verfehlt",
      "Mikrogravitation, schwebende Astronauten und Alltag an Bord",
      "Wissenschaft, Andocken, Weltraumspaziergänge und Stationsbetrieb"
    ],
    viewingKicker: "Sichtbarkeitsführer",
    viewingTitle: "Kannst du die ISS heute Abend sehen?",
    viewingIntro:
      "Die ISS ist kurz nach Sonnenuntergang oder vor Sonnenaufgang am leichtesten zu sehen, wenn der Himmel dunkel ist, die Station aber noch von der Sonne beleuchtet wird.",
    viewingTeasers: [
      "Am besten kurz nach Sonnenuntergang oder vor Sonnenaufgang",
      "Sieht aus wie ein heller, wandernder Stern",
      "Sichtbarkeit hängt von Ort, Wetter und Orbitpfad ab"
    ],
    galleryTitle: "Ausgewählte NASA-Ansichten der Station.",
    galleryIntro:
      "Eine kleine Vorschau echter NASA-Bilder. Öffne die ganze Galerie für mehr Stationsbilder, Erdansichten, Crew-Arbeit und Forschungsszenen.",
    finalTitle: "Bereit, die Station zu erkunden?"
  },
  factStrip: {
    ...en.factStrip,
    aria: "ISS-Kurzinformationen",
    altitudeLabel: "Aktuelle Höhe",
    altitudeDetail: "Die genaue Höhe verändert sich, wenn die Umlaufbahn angepasst wird.",
    altitudeInfo: "Die Höhe ist der Abstand der Station über der Erdoberfläche.",
    speedLabel: "Orbitgeschwindigkeit",
    speedDetail: "Schnell genug, um die Erde in etwa 90 Minuten zu umrunden.",
    speedInfo: "Geschwindigkeit bedeutet hier Tempo in einer Richtung entlang des Orbits.",
    orbitsValue: "Etwa 16",
    orbitsLabel: "Orbits pro Tag",
    orbitsDetail: "Die Crew erlebt Tag und Nacht viele Male an einem Erdentag.",
    statusValue: "Bemannt",
    statusLabel: "Stationsstatus",
    statusDetail: "Ein seit November 2000 dauerhaft bewohntes Orbitlabor.",
    updatedLabel: "Zuletzt aktualisiert",
    updatedDetail: "Live-Telemetrie aktualisiert sich etwa alle 10 Sekunden, wenn sie erreichbar ist.",
    updatedInfo: "Telemetrie sind Live-Messdaten aus dem Positionsfeed der Station."
  },
  tracker: {
    ...en.tracker,
    srTitle: "Live-ISS-Tracker",
    loading: "Verbindung zur Live-ISS-Telemetrie...",
    staleTitle: "Letzte bekannte Position wird angezeigt",
    offlineTitle: "Tracker-Feed offline",
    notes: [
      {
        title: "Datenquelle",
        body:
          "Die aktuelle ISS-Telemetrie wird vom öffentlichen Satelliten-Endpunkt wheretheiss.at abgerufen. Die App aktualisiert etwa alle 10 Sekunden, solange die Seite geöffnet ist."
      },
      {
        title: "Hinweis zur Näherung",
        body:
          "Position, Höhe, Geschwindigkeit, Tageslichtstatus, Bodenspur und jüngste Spur sind nützliche pädagogische Näherungen. Netzwerkverzögerungen, Feed-Ausfälle und Orbitmodell-Updates können Werte kurzzeitig veralten lassen."
      },
      {
        title: "Aktueller Pfad",
        body: (count) =>
          `Die Spur nutzt die letzten ${count} Live-Messpunkte in dieser Browsersitzung. Sie entsteht, nachdem mehrere Aktualisierungen gesammelt wurden.`
      }
    ],
    liveTitle: "Live-Blick von der Station",
    liveIntro: "Sieh den Live-ISS-Stream der NASA, wenn er verfügbar ist.",
    fallback: [
      { label: "NASA-Galerie erkunden", href: "/gallery" },
      { label: "Über die ISS lernen", href: "/learn" }
    ]
  },
  sidebar: {
    ...en.sidebar,
    missionControl: "Mission Control",
    liveTelemetry: "Live-Telemetrie",
    pointsTrail: (count, minutes) => `${count} Punkte / ${minutes} Min. Spur`,
    buildingTrail: "Spur wird aufgebaut",
    unstable: "Datenfeed instabil",
    labels: {
      latitude: "Breitengrad",
      longitude: "Längengrad",
      altitude: "Höhe",
      speed: "Geschwindigkeit",
      visibility: "Sichtbarkeit",
      groundTrack: "Bodenspur",
      direction: "Richtung",
      lastUpdate: "Letzte Aktualisierung"
    },
    altitudeInfo:
      "Die Höhe ist der Abstand der Station über der Erdoberfläche. Sie ändert sich leicht, wenn der Orbit angepasst wird.",
    velocityLabel: "Geschwindigkeit",
    velocityInfo:
      "Geschwindigkeit bedeutet Tempo plus Richtung. Die Station bewegt sich schnell genug, um die Erde in etwa 90 Minuten zu umrunden.",
    groundTrackFallback: "Nicht verfügbar",
    footprint: (value) => `Footprint ${value}`,
    groundTrackInfo: "Die Bodenspur ist der Ort auf der Erde direkt unter dem Pfad der Station.",
    directionHint: "Aus den neuesten Live-Punkten berechnet",
    visibility: {
      daylight: "Von Sonne beleuchtet",
      eclipsed: "Im Erdschatten",
      unknown: "Nicht verfügbar"
    }
  },
  scene: {
    ...en.scene,
    fallback: "Die 3D-Ansicht konnte nicht geladen werden.",
    loading: "3D-Szene wird geladen...",
    kicker: "Orbitansicht",
    closeFullscreen: "Orbitansicht im Vollbild schließen",
    openFullscreen: "Orbitansicht im Vollbild öffnen",
    exitFullscreen: "Vollbild verlassen",
    fullscreen: "Vollbild",
    groundTrack: "Bodenspur",
    findingPosition: "Position wird gesucht",
    status: {
      live: "Verfolgung in Echtzeit",
      partial: "Nur Positionsfeed",
      stale: "Letzte bekannte Position",
      waiting: "Warten auf Daten"
    },
    mobileHint: "Ziehen: Orbitansicht / Pinch: Zoom / Gestrichelte Linie: Orbitvorschau",
    desktopHint: "Mausrad: Zoom / Ziehen: Orbitansicht / Gestrichelte Linie: Orbitvorschau"
  },
  see: {
    ...en.see,
    kicker: "Sichtbarkeitsführer",
    title: "Die ISS von der Erde sehen",
    intro: "Lerne, wann und wie du die Internationale Raumstation von deinem Standort aus sehen kannst.",
    lookupKicker: "Überflugsuche",
    lookupTitle: "Kannst du sie bald sehen?",
    lookupIntro:
      "Gib deine Koordinaten ein oder nutze die Standortfreigabe des Browsers, um sichtbare ISS-Überflüge für die nächsten 48 Stunden zu schätzen.",
    finePrint:
      "Die Vorhersagen verwenden aktuelle TLE-Orbitdaten im Browser. Es sind pädagogische Schätzungen, keine offiziellen Sichtungsalarme. Prüfe kurz vor der Sichtungszeit erneut und beachte lokale Himmelsbedingungen.",
    trackerLink: "Live-Tracker öffnen",
    estimatorTitle: "Rechner für sichtbare Überflüge",
    tipsKicker: "Beobachtungstipps",
    tipsTitle: "So findest du die Station",
    tipsIntro:
      "Nutze zuerst den Überflugrechner und suche dann nach einem gleichmäßig hellen Punkt auf dem vorhergesagten Himmelsweg.",
    tips: [
      { title: "Beste Zeit", body: "Kurz nach Sonnenuntergang oder vor Sonnenaufgang." },
      { title: "Wie sie aussieht", body: "Ein heller, gleichmäßig wandernder Lichtpunkt." },
      { title: "In welche Richtung schauen", body: "Nutze die vorhergesagte Richtung und verfolge den Himmelsweg." },
      { title: "Was einen guten Überflug ausmacht", body: "Hoch über dem Horizont, mehrere Minuten lang und bei klarem Himmel." },
      { title: "Was die Sicht blockieren kann", body: "Wolken, Dunst, Gebäude, Bäume, Stadtlicht oder der Erdschatten." },
      { title: "Unterschied zu Flugzeugen", body: "Sie blinkt normalerweise nicht und bewegt sich ruhig." }
    ],
    sequenceAria: "Kompakte ISS-Beobachtungsabfolge",
    sequence: ["Heller Punkt", "Gleichmäßige Bewegung", "Verschwindet im Schatten"],
    liveIntro:
      "Sieh den Live-ISS-Stream der NASA, wenn er verfügbar ist, und nutze danach den Sichtbarkeitsführer, um zu verstehen, wann die Station von der Erde sichtbar sein kann.",
    fallback: [
      { label: "Live-Tracker öffnen", href: "/tracker" },
      { label: "NASA-Galerie erkunden", href: "/gallery" }
    ]
  },
  pass: {
    ...en.pass,
    geolocationUnavailable: "Geolokalisierung ist in diesem Browser nicht verfügbar.",
    permissionDenied: "Standortfreigabe wurde abgelehnt. Gib die Koordinaten stattdessen manuell ein.",
    calculating: "Sichtbare Überflugkandidaten werden berechnet...",
    estimates: "Zeiten sind Schätzungen auf Basis aktueller Orbitdaten. Prüfe kurz vor der Sichtung erneut.",
    none: "Keine sichtbaren Überflugkandidaten in den nächsten 48 Stunden gefunden. Versuche es morgen erneut.",
    requesting: "Browserstandort wird angefragt...",
    useLocation: "Meinen Standort nutzen",
    latitude: "Breitengrad",
    longitude: "Längengrad",
    calculate: "Berechnen",
    listAria: "Vorhergesagte sichtbare ISS-Überflüge",
    direction: (start, end, elevation) => `${start} bis ${end} / max. ${elevation} Grad`,
    visibleWindow: "sichtbares Zeitfenster",
    emptyCompact:
      "Gib einen Standort ein, um kommende sichtbare Überflüge zu schätzen. Das Ergebnis nutzt aktuelle TLE-Orbitdaten und sollte nahe der Sichtungszeit erneut geprüft werden."
  },
  media: {
    ...en.media,
    defaultTitle: "Echte Stationsbilder zum Lernen und Staunen.",
    defaultIntro:
      "Diese Bilder werden aus der öffentlichen NASA Image and Video Library geladen, wenn verfügbar. Ist die API nicht erreichbar, bleiben kuratierte NASA-Galeriebilder sichtbar.",
    kicker: "NASA-Mediathek",
    viewSource: "Quelle ansehen",
    loading: "NASA-Medien werden geladen...",
    fallback: "Kuratierte NASA-Galerie-Ersatzbilder werden angezeigt.",
    live: "Aktuelle Ergebnisse der NASA Image and Video Library werden angezeigt.",
    emptyTitle: "Noch keine Bilder verfügbar",
    emptyBody: "NASA-Ergebnisse können je nach Anfrage variieren. Versuche es später erneut.",
    fallbackItems: {
      jsc2021e064215_alt: {
        title: "Rundflug um die Internationale Raumstation",
        description: "Die Station wurde fotografiert, nachdem Crew Dragon Endeavour abgedockt und einen Rundflug absolviert hatte."
      },
      iss065e242460: {
        title: "Forschung in der Station",
        description: "Astronauten arbeiten nahe der Life Sciences Glovebox, in der Forschung in Mikrogravitation laufen kann."
      },
      iss060e000604: {
        title: "Erde aus dem Orbit",
        description: "ISS-Crews fotografieren Wüsten, Flüsse, Stürme, Städte und Küsten aus Hunderten Kilometern Höhe."
      },
      iss064e055946: {
        title: "Airglow und Milchstraße",
        description: "Eine dünne Atmosphärenlinie leuchtet unter den Sternen in einer Aufnahme von der Station."
      }
    }
  },
  livestream: {
    ...en.livestream,
    title: "NASA Live und Stationsansichten.",
    intro:
      "NASA Live zeigt Agenturprogramme und verlinkt zu Space Station Views, wenn Live-ISS-Video verfügbar ist. Bei Signalübergaben kann das Stationsvideo pausieren oder einen Wartebildschirm zeigen.",
    watchLive: "Live ansehen",
    iframeTitle: "NASA-Livestream",
    signalNotes: "Zum Stream",
    unavailable: "Livebilder aus dem Orbit",
    body:
      "Wenn Stationsvideo verfügbar ist, zeigt NASA Ansichten von Kameras an der Außenseite der ISS. Das Bild kommt aus rund 400 Kilometern Höhe, während die Raumstation die Erde etwa alle 90 Minuten umrundet.",
    fallbackActions: [
      { label: "Live-Tracker öffnen", href: "/tracker" },
      { label: "NASA-Bilder erkunden", href: "/gallery" },
      {
        label: "Stream auf YouTube öffnen",
        href: "https://www.youtube.com/watch?v=zPH5KtjJFaQ",
        external: true
      }
    ]
  },
  gallery: {
    ...en.gallery,
    kicker: "NASA-Bilder",
    title: "ISS-Galerie",
    intro:
      "Erkunde echtes NASA-Bildmaterial der Station, Erdansichten, Astronauten, Forschung und Stationsbetrieb.",
    mediaTitle: "NASA-Bilder und Stationsansichten.",
    mediaIntro:
      "Die Galerie lädt Ergebnisse aus der NASA Image and Video Library, wenn verfügbar, und nutzt kuratierte NASA-Stationsbilder, falls die API nicht erreichbar ist."
  },
  about: {
    kicker: "Quellen und Credits",
    title: "ISS Explorer Datenquellen und Credits",
    intro:
      "Erfahre, woher ISS Explorer Live-Daten, Bilder, Lernreferenzen bezieht und welche Grenzen diese Daten haben.",
    sourcesKicker: "Konfigurierte Quellen",
    sourcesTitle: "Daten, die diese Seite nutzt",
    sourcesIntro: "Dies sind die aktuell im Code konfigurierten Quellen.",
    limitsKicker: "Daten richtig einordnen",
    limitsTitle: "Grenzen und Verhalten",
    limitsIntro:
      "Live-Lernwerkzeuge sind am nützlichsten, wenn sie erklären, was sie garantieren können und was nicht.",
    notes: [
      {
        title: "Live-ISS-Telemetrie",
        body: "Der aktuelle Positionsfeed wird über die Route /api/iss/current dieser Seite abgerufen. Sie proxyiert wheretheiss.at und fällt bei Bedarf auf eine einfachere ISS-Positionsquelle zurück."
      },
      {
        title: "Aktualisierungsrate",
        body: "Der Browser fragt Live-ISS-Telemetrie etwa alle 10 Sekunden ab, solange die Seite geöffnet ist. Zuletzt aktualisiert meint den Zeitpunkt, an dem der neueste akzeptierte Telemetriepunkt empfangen wurde."
      },
      {
        title: "Näherungswerte",
        body: "Höhe, Geschwindigkeit, Sichtbarkeit, Footprint, Richtung und Bodenspur sind pädagogische Telemetriewerte und können kurz veraltet sein, wenn eine Anfrage fehlschlägt."
      },
      {
        title: "Überflugvorhersagen",
        body: "Sichtbare Überflugschätzungen nutzen den wheretheiss.at-TLE-Endpunkt und SGP4-Berechnungen im Browser. Sie sind nützliche Schätzungen, keine offiziellen Sichtungsalarme."
      },
      {
        title: "NASA-Bilder",
        body: "Galeriebilder werden aus der NASA Image and Video Library geladen, wenn verfügbar. Kuratierte NASA-Ersatzbilder bleiben sichtbar, falls die API-Anfrage fehlschlägt."
      },
      {
        title: "Videoeinschränkungen",
        body: "Der eingebettete NASA-Livefeed kann pausieren, Programme wechseln oder während Kameraübergaben, Signallücken oder Planänderungen offline sein."
      },
      {
        title: "Datenschutz",
        body: "Die App enthält keine Analytics- oder Nutzertracking-Skripte. Der Browserstandort wird nur angefragt, wenn ein Nutzer die Standorttaste der Überflugsuche auswählt."
      }
    ]
  },
  footer: {
    ...en.footer,
    kicker: "Weiter erkunden",
    title: "Bereit, die Station zu erkunden?",
    intro:
      "Verfolge die ISS live, lerne die Wissenschaft hinter dem Orbit und nutze die Unterrichtsressourcen für eine kurze Aktivität oder eine ganze Stunde.",
    actions: [
      { label: "ISS live verfolgen", href: "/tracker" },
      { label: "Lernen starten", href: "/learn" }
    ],
    note:
      "NASA-Material wird als Quellenmaterial genannt und nicht verwendet, um eine Empfehlung der NASA anzudeuten. Drittanbieter-Credits bleiben erhalten, wo NASA sie aufführt.",
    dataSources: en.footer.dataSources.map((source) => ({
      ...source,
      description:
        source.label === "Where the ISS at?"
          ? "HTTPS-Live-ISS-Position und TLE-Endpunkt für Tracker und Überflugrechner."
          : source.label === "NASA Image and Video Library"
            ? "Durchsuchbare NASA-Bilder, Videos und Audiodaten für die Mediengalerie."
            : source.label === "NASA Station Facts"
              ? "Zentrale ISS-Fakten wie Größe, Orbitzeit, Partneragenturen und Besatzungsgeschichte."
              : "Eingebetteter NASA-Livestream und externer Link zum Live-Programm."
    }))
  }
};

const da = {
  ...en,
  code: "da",
  common: {
    ...en.common,
    moreAbout: (label) => (label ? `Mere om ${label}` : "Mere information"),
    backToTop: "Til toppen",
    dismissInformation: "Luk information",
    notAvailable: "Ikke tilgængelig",
    noUpdateYet: "Ingen opdatering endnu",
    waitingForFirstUpdate: "Venter på første opdatering",
    secondsOld: (seconds) => `${seconds}s gammel`,
    minutesOld: (minutes) => `${minutes} min gammel`,
    aboutAltitude: "Cirka 400 km",
    aboutVelocity: "Cirka 27.600 km/t",
    degree: "grader",
    status: {
      loading: "Forbinder",
      stale: "Cachet",
      offline: "Offline",
      partial: "Delvis",
      live: "Live"
    }
  },
  nav: [
    { label: "Forside", href: "/" },
    { label: "Live-tracker", href: "/tracker" },
    { label: "Lær", href: "/learn" },
    { label: "Se ISS", href: "/see-the-iss" },
    { label: "Galleri", href: "/gallery" },
    { label: "Data", href: "/about-data" }
  ],
  notFound: {
    kicker: "Rute ikke fundet",
    title: "Denne side er ikke på stationskortet",
    body:
      "Brug navigationen til at vende tilbage til live-trackeren, læringsmodulerne, synlighedsguiden, galleriet eller datanoterne."
  },
  seo: {
    ...en.seo,
    ogImageAlt: "ISS Explorer live-tracker og læringsguide",
    defaultDescription:
      "Følg Den Internationale Rumstation live, udforsk ægte ISS-telemetri, lær hvordan kredsløb og mikrogravitation fungerer, og find ud af, hvornår du kan se ISS fra Jorden.",
    routes: {
      "/": {
        title: "ISS Explorer – Live ISS-tracker og læringsguide til rumstationen",
        description:
          "Følg Den Internationale Rumstation live, udforsk ægte ISS-telemetri, lær hvordan kredsløb og mikrogravitation fungerer, og find ud af, hvornår du kan se ISS fra Jorden."
      },
      "/tracker": {
        title: "Live ISS-tracker – Hvor er Den Internationale Rumstation nu?",
        description:
          "Følg Den Internationale Rumstation i realtid med liveposition, højde, hastighed, synlighed, jordspor og den seneste bane."
      },
      "/learn": {
        title: "Lær om ISS – Kredsløb, mikrogravitation og liv i rummet",
        description:
          "Enkle elevvenlige forklaringer om Den Internationale Rumstation, kredsløb, hastighed, mikrogravitation, astronautliv, forskning, docking og rumvandringer."
      },
      "/see-the-iss": {
        title: "Se ISS fra Jorden – Synlighedsguide og passageberegner",
        description:
          "Lær hvornår og hvordan du kan se Den Internationale Rumstation fra Jorden, tjek synlige passager, og forstå hvad der giver en god ISS-observation."
      },
      "/gallery": {
        title: "ISS-galleri – NASA-billeder, Jordudsigter og stationsvideo",
        description:
          "Udforsk NASA-billeder af Den Internationale Rumstation, astronauter, Jordudsigter, forskningseksperimenter, stationens indre og livevideo."
      },
      "/about-data": {
        title: "ISS Explorer datakilder og kreditering",
        description:
          "Se hvor ISS Explorer henter live ISS-telemetri, NASA-billeder, stationsfakta, livevideo og synlighedsestimater."
      }
    }
  },
  home: {
    ...en.home,
    liveLine: (speed) => `Kredser lige nu om Jorden med ${speed}`,
    intro:
      "Følg ISS live, lær hvordan den fungerer, og find ud af, hvornår du kan se den fra Jorden.",
    actions: {
      tracker: "Følg ISS live",
      learn: "Start læring",
      fullTracker: "Åbn fuld tracker",
      learningGuide: "Åbn læringsguide",
      passes: "Tjek synlige passager",
      gallery: "Åbn hele galleriet",
      nasaLive: "Se NASA live"
    },
    heroAlt: "Den Internationale Rumstation fotograferet i kredsløb",
    figcaption: (groundTrack) => <>NASA-billede. Live-jordspor: <strong>{groundTrack || "finder stationen"}</strong></>,
    trackerKicker: "Live-tracker",
    trackerTitle: "Hvor er ISS lige nu?",
    trackerIntro:
      "Trackeren opdaterer stationens position, tegner dens seneste rute og viser live-telemetri fra det aktuelle kredsløb.",
    learnKicker: "Lær hurtigt",
    learnTitle: "Lær ISS på 5 minutter",
    learnIntro:
      "Start med en guidet læringsrejse om kredsløb, mikrogravitation, livet på stationen, forskning, docking og rumvandringer.",
    learningTeasers: [
      "Kredsløb, hastighed og hvorfor stationen bliver ved med at ramme ved siden af Jorden",
      "Mikrogravitation, svævende astronauter og dagligdag ombord",
      "Forskning, docking, rumvandringer og stationsdrift"
    ],
    viewingKicker: "Synlighedsguide",
    viewingTitle: "Kan du se ISS i aften?",
    viewingIntro:
      "ISS er lettest at se kort efter solnedgang eller før solopgang, når himlen er mørk, men stationen stadig er belyst af Solen.",
    viewingTeasers: [
      "Bedst kort efter solnedgang eller før solopgang",
      "Ligner en klar stjerne i bevægelse",
      "Synlighed afhænger af sted, vejr og bane"
    ],
    galleryTitle: "Udvalgte NASA-udsigter fra stationen.",
    galleryIntro:
      "En lille forsmag på ægte NASA-billeder. Åbn hele galleriet for flere stationsbilleder, Jordudsigter, besætningsarbejde og forskning.",
    finalTitle: "Klar til at udforske stationen?"
  },
  factStrip: {
    ...en.factStrip,
    aria: "ISS hurtige fakta",
    altitudeLabel: "Aktuel højde",
    altitudeDetail: "Den præcise højde ændrer sig, når stationens bane justeres.",
    altitudeInfo: "Højde er stationens afstand over Jordens overflade.",
    speedLabel: "Orbital hastighed",
    speedDetail: "Hurtig nok til at kredse om Jorden på cirka 90 minutter.",
    speedInfo: "Hastighed betyder fart i en retning langs stationens bane.",
    orbitsValue: "Cirka 16",
    orbitsLabel: "Kredsløb pr. dag",
    orbitsDetail: "Besætningen ser dag og nat mange gange på et jorddøgn.",
    statusValue: "Bemandet",
    statusLabel: "Stationsstatus",
    statusDetail: "Et kontinuerligt beboet orbitalt laboratorium siden november 2000.",
    updatedLabel: "Senest opdateret",
    updatedDetail: "Live-telemetri opdateres cirka hvert 10. sekund, når feedet kan nås.",
    updatedInfo: "Telemetri er live måledata fra stationens positionsfeed."
  },
  tracker: {
    ...en.tracker,
    srTitle: "Live ISS-tracker",
    loading: "Forbinder til live ISS-telemetri...",
    staleTitle: "Viser sidst kendte position",
    offlineTitle: "Tracker-feed offline",
    notes: [
      {
        title: "Datakilde",
        body:
          "Aktuel ISS-telemetri hentes fra det offentlige wheretheiss.at-satellitendpoint. Appen opdaterer cirka hvert 10. sekund, mens siden er åben."
      },
      {
        title: "Bemærkning om estimater",
        body:
          "Position, højde, hastighed, dagslysstatus, jordspor og den seneste rute er nyttige læringsestimater. Netværksforsinkelser, feed-fejl og opdateringer af banemodellen kan kortvarigt gøre værdier forældede."
      },
      {
        title: "Seneste rute",
        body: (count) =>
          `Sporet bruger de seneste ${count} live-målinger i denne browsersession. Det bygges op, når siden har samlet flere opdateringer.`
      }
    ],
    liveTitle: "Livevisning fra stationen",
    liveIntro: "Se NASAs live ISS-stream, når den er tilgængelig.",
    fallback: [
      { label: "Udforsk NASA-galleri", href: "/gallery" },
      { label: "Lær om ISS", href: "/learn" }
    ]
  },
  sidebar: {
    ...en.sidebar,
    liveTelemetry: "Live-telemetri",
    pointsTrail: (count, minutes) => `${count} punkter / ${minutes} min spor`,
    buildingTrail: "Bygger spor",
    unstable: "Datafeed ustabilt",
    labels: {
      latitude: "Breddegrad",
      longitude: "Længdegrad",
      altitude: "Højde",
      speed: "Hastighed",
      visibility: "Synlighed",
      groundTrack: "Jordspor",
      direction: "Retning",
      lastUpdate: "Seneste opdatering"
    },
    altitudeInfo:
      "Højde er stationens afstand over Jordens overflade. Den ændrer sig lidt, når banen justeres.",
    velocityLabel: "Hastighed",
    velocityInfo:
      "Hastighed betyder fart plus retning. Stationen bevæger sig hurtigt nok til at kredse om Jorden på cirka 90 minutter.",
    groundTrackFallback: "Ikke tilgængelig",
    footprint: (value) => `Footprint ${value}`,
    groundTrackInfo: "Jordsporet er stedet på Jorden direkte under stationens bane.",
    directionHint: "Beregnet fra de nyeste livepunkter",
    visibility: {
      daylight: "Belyst af Solen",
      eclipsed: "I Jordens skygge",
      unknown: "Ikke tilgængelig"
    }
  },
  scene: {
    ...en.scene,
    fallback: "3D-visningen kunne ikke indlæses.",
    loading: "Indlæser 3D-scenen...",
    kicker: "Orbital visning",
    closeFullscreen: "Luk orbital visning i fuld skærm",
    openFullscreen: "Åbn orbital visning i fuld skærm",
    exitFullscreen: "Afslut fuld skærm",
    fullscreen: "Fuld skærm",
    groundTrack: "Jordspor",
    findingPosition: "Finder position",
    status: {
      live: "Følger i realtid",
      partial: "Kun positionsfeed",
      stale: "Sidst kendte position",
      waiting: "Venter på data"
    },
    mobileHint: "Træk: orbital visning / Knib: zoom / Stiplet linje: bane-preview",
    desktopHint: "Musehjul: zoom / Træk: orbital visning / Stiplet linje: bane-preview"
  },
  see: {
    ...en.see,
    kicker: "Synlighedsguide",
    title: "Se ISS fra Jorden",
    intro: "Lær hvornår og hvordan du kan se Den Internationale Rumstation fra din placering.",
    lookupKicker: "Passagesøgning",
    lookupTitle: "Kan du se den snart?",
    lookupIntro:
      "Indtast dine koordinater eller brug browserens placeringstilladelse til at estimere synlige ISS-passager de næste 48 timer.",
    finePrint:
      "Forudsigelser bruger aktuelle TLE-banedata i browseren. De er læringsestimater, ikke officielle observationsalarmer. Tjek igen tæt på observationstidspunktet og brug lokale himmelforhold.",
    trackerLink: "Åbn live-tracker",
    estimatorTitle: "Estimator for synlige passager",
    tipsKicker: "Observationstips",
    tipsTitle: "Sådan finder du stationen",
    tipsIntro:
      "Brug passageestimatoren først, og kig derefter efter et stabilt klart punkt, der bevæger sig hen over den forudsagte himmelrute.",
    tips: [
      { title: "Bedste tidspunkt", body: "Kort efter solnedgang eller før solopgang." },
      { title: "Hvordan den ser ud", body: "Et klart, stabilt lyspunkt i bevægelse." },
      { title: "Hvilken retning du skal kigge", body: "Brug den forudsagte retning og følg ruten over himlen." },
      { title: "Hvad gør en passage god", body: "Højt over horisonten, flere minutter lang og under klar himmel." },
      { title: "Hvad kan blokere synlighed", body: "Skyer, dis, bygninger, træer, bylys eller Jordens skygge." },
      { title: "Forskel fra fly", body: "Den blinker normalt ikke og bevæger sig jævnt." }
    ],
    sequenceAria: "Kompakt ISS-observationssekvens",
    sequence: ["Klar prik", "Jævn bevægelse", "Forsvinder i skygge"],
    liveIntro:
      "Se NASAs live ISS-stream, når den er tilgængelig, og brug derefter synlighedsguiden til at forstå, hvornår stationen kan være synlig fra Jorden.",
    fallback: [
      { label: "Åbn live-tracker", href: "/tracker" },
      { label: "Udforsk NASA-galleri", href: "/gallery" }
    ]
  },
  pass: {
    ...en.pass,
    geolocationUnavailable: "Geolokation er ikke tilgængelig i denne browser.",
    permissionDenied: "Placeringstilladelse blev afvist. Indtast koordinater manuelt i stedet.",
    calculating: "Beregner synlige passagekandidater...",
    estimates: "Tidspunkter er estimater baseret på aktuelle banedata. Tjek igen tæt på observationstidspunktet.",
    none: "Ingen synlige passagekandidater fundet i de næste 48 timer. Prøv igen i morgen.",
    requesting: "Anmoder om din browserplacering...",
    useLocation: "Brug min placering",
    latitude: "Breddegrad",
    longitude: "Længdegrad",
    calculate: "Beregn",
    listAria: "Forudsagte synlige ISS-passager",
    direction: (start, end, elevation) => `${start} til ${end} / maks. ${elevation} grader`,
    duration: (minutes) => `${minutes} min`,
    visibleWindow: "synligt tidsvindue",
    emptyCompact:
      "Indtast en placering for at estimere kommende synlige passager. Resultatet bruger aktuelle TLE-banedata og bør tjekkes igen tæt på observationstidspunktet."
  },
  media: {
    ...en.media,
    defaultTitle: "Ægte stationsbilleder til læring og nysgerrighed.",
    defaultIntro:
      "Disse billeder indlæses fra NASAs offentlige Image and Video Library, når den er tilgængelig. Hvis API'en ikke kan nås, vises kuraterede NASA-galleribilleder.",
    kicker: "NASA-mediebibliotek",
    viewSource: "Se kilde",
    loading: "Indlæser NASA-medier...",
    fallback: "Viser kuraterede NASA-galleri-reserver.",
    live: "Viser aktuelle resultater fra NASA Image and Video Library.",
    emptyTitle: "Ingen billeder tilgængelige endnu",
    emptyBody: "NASA-resultater kan variere efter forespørgsel. Prøv igen senere.",
    fallbackItems: {
      jsc2021e064215_alt: {
        title: "Rundflyvning omkring Den Internationale Rumstation",
        description: "Stationen fotograferet efter Crew Dragon Endeavour frakoblede og gennemførte en rundflyvning."
      },
      iss065e242460: {
        title: "Forskning inde i stationen",
        description: "Astronauter arbejder nær Life Sciences Glovebox, hvor forskning kan foregå i mikrogravitation."
      },
      iss060e000604: {
        title: "Jorden fra kredsløb",
        description: "ISS-besætninger fotograferer ørkener, floder, storme, byer og kyster fra hundredvis af kilometer over Jorden."
      },
      iss064e055946: {
        title: "Airglow og Mælkevejen",
        description: "En tynd linje af atmosfære lyser under stjernerne i et billede taget fra stationen."
      }
    }
  },
  livestream: {
    ...en.livestream,
    title: "NASA Live og stationsvisninger.",
    intro:
      "NASA Live viser agenturprogrammer og linker til Space Station Views, når live ISS-video er tilgængelig. Under signalovergange kan stationsvideoen pause eller vise en venteskærm.",
    watchLive: "Se live",
    iframeTitle: "NASA-livestream",
    signalNotes: "Om streamen",
    unavailable: "Livebilleder fra kredsløb",
    body:
      "Når stationsvideo er tilgængelig, viser NASA udsigter fra kameraer monteret på ydersiden af ISS. Billedet kommer fra cirka 400 kilometers højde, mens rumstationen kredser om Jorden omtrent hvert 90. minut.",
    fallbackActions: [
      { label: "Åbn live-tracker", href: "/tracker" },
      { label: "Udforsk NASA-billeder", href: "/gallery" },
      {
        label: "Åbn stream på YouTube",
        href: "https://www.youtube.com/watch?v=zPH5KtjJFaQ",
        external: true
      }
    ]
  },
  gallery: {
    ...en.gallery,
    kicker: "NASA-billeder",
    title: "ISS-galleri",
    intro:
      "Udforsk ægte NASA-billeder af stationen, Jordudsigter, astronauter, forskning og stationsdrift.",
    mediaTitle: "NASA-billeder og stationsvisninger.",
    mediaIntro:
      "Galleriet indlæser resultater fra NASA Image and Video Library, når det er muligt, og falder tilbage til kuraterede NASA-stationsbilleder, hvis API'en ikke kan nås."
  },
  about: {
    kicker: "Kilder og kreditering",
    title: "ISS Explorer datakilder og kreditering",
    intro:
      "Se hvor ISS Explorer henter live data, billeder, læringsreferencer, og hvilke begrænsninger der gælder.",
    sourcesKicker: "Konfigurerede kilder",
    sourcesTitle: "Data brugt af dette site",
    sourcesIntro: "Dette er de kilder, der aktuelt er konfigureret i kodebasen.",
    limitsKicker: "Sådan læses data",
    limitsTitle: "Begrænsninger og adfærd",
    limitsIntro:
      "Live læringsværktøjer er mest nyttige, når de forklarer, hvad de kan og ikke kan garantere.",
    notes: [
      {
        title: "Live ISS-telemetri",
        body: "Det aktuelle positionsfeed hentes via sitets /api/iss/current-route, som proxyer wheretheiss.at og falder tilbage til en enklere ISS-positionskilde ved behov."
      },
      {
        title: "Opdateringsfrekvens",
        body: "Browseren henter live ISS-telemetri cirka hvert 10. sekund, mens siden er åben. Senest opdateret betyder tidspunktet, hvor det nyeste accepterede telemetripunkt blev modtaget."
      },
      {
        title: "Omtrentlige værdier",
        body: "Højde, hastighed, synlighed, footprint, retning og jordspor er læringsorienterede telemetriværdier og kan kortvarigt være forældede, hvis en forespørgsel fejler."
      },
      {
        title: "Passageforudsigelser",
        body: "Synlige passageestimater bruger wheretheiss.at TLE-endpoint og SGP4-beregninger i browseren. De er nyttige estimater, ikke officielle observationsalarmer."
      },
      {
        title: "NASA-billeder",
        body: "Galleribilleder indlæses fra NASA Image and Video Library, når det er muligt. Kuraterede NASA-reserver forbliver synlige, hvis API-forespørgslen fejler."
      },
      {
        title: "Videobegrænsninger",
        body: "Det indlejrede NASA Live-feed kan pause, skifte program eller være offline under kameraoverdragelser, signalhuller eller ændringer i agenturets plan."
      },
      {
        title: "Privatliv",
        body: "Appen indeholder ikke analyse- eller brugertrackingkode. Browserplacering anmodes kun, når en bruger vælger placeringsknappen i passagesøgningen."
      }
    ]
  },
  footer: {
    ...en.footer,
    kicker: "Udforsk videre",
    title: "Klar til at udforske stationen?",
    intro:
      "Følg ISS live, lær videnskaben bag kredsløb, og brug undervisningsressourcerne til en kort aktivitet eller en hel lektion.",
    actions: [
      { label: "Følg ISS live", href: "/tracker" },
      { label: "Start læring", href: "/learn" }
    ],
    note:
      "NASA-materiale krediteres som kildemateriale og bruges ikke til at antyde godkendelse. Tredjepartskreditering bevares, hvor NASA angiver den.",
    dataSources: en.footer.dataSources.map((source) => ({
      ...source,
      description:
        source.label === "Where the ISS at?"
          ? "HTTPS live ISS-position og TLE-endpoint brugt af trackeren og passageberegneren."
          : source.label === "NASA Image and Video Library"
            ? "Søgbare NASA-billeder, videoer og lyd brugt til mediegalleriet."
            : source.label === "NASA Station Facts"
              ? "Centrale ISS-fakta som størrelse, kredsløbstid, partneragenturer og bemandingshistorik."
              : "Indlejret NASA Live-stream og eksternt link til liveprogrammering."
    }))
  }
};

export const translations = { en, de, da };

const I18nContext = createContext({
  language: DEFAULT_LANGUAGE,
  languageInfo: languageMap[DEFAULT_LANGUAGE],
  t: translations[DEFAULT_LANGUAGE],
  localizedPath: (path) => localizePath(path, DEFAULT_LANGUAGE)
});

export function I18nProvider({ language, children }) {
  const activeLanguage = translations[language] ? language : DEFAULT_LANGUAGE;
  const value = {
    language: activeLanguage,
    languageInfo: languageMap[activeLanguage],
    languages,
    t: translations[activeLanguage],
    localizedPath: (path) => localizePath(path, activeLanguage)
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
