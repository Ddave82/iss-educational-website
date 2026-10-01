# ISS Explorer

An immersive educational website about the International Space Station, built
with React, Vite, Three.js, live orbital data, and public NASA learning
resources.

ISS Explorer is designed for curious kids, families, classrooms, and space fans:
it combines a live 3D ISS tracker with route-based learning sections, NASA
imagery, livestream access, teacher resources, and transparent data notes.

![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=06111f)
![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.176-111111?style=for-the-badge&logo=three.js&logoColor=white)
![NASA Media](https://img.shields.io/badge/NASA-Media%20Sources-f6bf66?style=for-the-badge)

## Preview

Live preview: [iss-educational-website.vercel.app](https://iss-educational-website.vercel.app)

## What It Does

- Shows the NASA-listed crew, recent research and automatically refreshed station reports
- Renders an astronomical day/night boundary and a 90-minute SGP4 orbit preview
- Tracks the International Space Station in real time
- Shows latitude, longitude, altitude, speed, visibility, heading, and ground track
- Renders an interactive 3D Earth with ISS marker, recent trail, and orbit preview
- Explains the ISS through concise, family-friendly learning cards
- Adds local ISS sighting estimates, ISS scale, timeline, glossary, and real science examples
- Loads imagery from NASA's public Image and Video Library
- Falls back to curated NASA gallery items when the media API is unavailable
- Embeds NASA Live and links station-viewing resources
- Includes dedicated pages for learning, viewing guidance, gallery, teacher resources, and data credits
- Deploys a Vite frontend and Node.js data functions on Vercel

## Live Data and Media

| Feature | Source |
| --- | --- |
| ISS telemetry | [`wheretheiss.at`](https://wheretheiss.at/w/developer) |
| NASA media search | [`images-api.nasa.gov`](https://images.nasa.gov/) |
| Curated gallery fallbacks | [NASA Space Station Gallery](https://www.nasa.gov/international-space-station/space-station-gallery/) |
| Livestream | [NASA Live](https://www.nasa.gov/live/) |
| Station facts | [NASA Station Facts and Figures](https://www.nasa.gov/international-space-station/space-station-facts-and-figures/) |
| Visitor counts | [NASA Station Visitors](https://www.nasa.gov/international-space-station/space-station-visitors-by-country/) |
| Assembly timeline | [NASA ISS Final Configuration](https://www.nasa.gov/image-article/international-space-station-final-configuration) |
| Research examples | [NASA ISS Research](https://www.nasa.gov/missions/station/iss-research/) |
| Station visibility estimates | [`wheretheiss.at` TLE data](https://wheretheiss.at/w/developer) with in-browser SGP4 prediction |
| Country geometry | [`world-atlas`](https://www.npmjs.com/package/world-atlas) |

NASA imagery is credited as source material and is not used to imply NASA
endorsement. NASA logos and identifiers are not used as site branding.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Build tool | Vite 7 |
| 3D scene | Three.js, React Three Fiber, Drei |
| Geo utilities | D3 Geo, TopoJSON, World Atlas |
| Styling | Custom responsive CSS |
| Deployment target | Vercel frontend and Node.js functions |

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

Routes:

```text
/
/tracker
/station
/learn
/see-the-iss
/gallery
/teachers
/about-data
```

## Build

```bash
npm run build
npm run preview
```

The production app calls the HTTPS ISS telemetry endpoint directly. The Vite
proxy configuration exists only as a local development fallback.

## Deployment on Vercel

Import this repository into Vercel and use:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

No paid API key is required for the current version.

### Visitor analytics

Vercel Web Analytics is mounted once in `src/Root.jsx` using its React integration.
Enable Analytics in the Vercel project dashboard, then deploy this repository.
Page views (including client-side navigation) and visitors appear in that project's
Analytics view. Vite development uses Analytics' development mode, which logs
events locally without recording production visits. No analytics API key is needed.
See the [Vercel setup guide](https://vercel.com/docs/analytics/quickstart).

## Project Structure

The production build prerenders all 21 localized pages using the same React
components as the browser. Each page contains its content, metadata, canonical
URL, language alternatives and structured data before JavaScript runs. Live data
and WebGL start in the browser after hydration. The build also generates
`dist/sitemap.xml` and `dist/404.html`, and validates the output with 24 SEO checks.
See [SEO_CHECKLIST.md](SEO_CHECKLIST.md) for Search Console setup and maintenance.

```text
.
├── index.html
├── package.json
├── vite.config.js
└── src
    ├── App.jsx
    ├── components
    │   ├── panels
    │   ├── scene
    │   └── sections
    ├── hooks
    ├── lib
    └── styles
```

## Scripts

```bash
npm run dev      # Start the local dev server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm test         # Run deterministic astronomy and station-data tests
```

## Notes

- The app supports English, German (`/de`) and Danish (`/da`). Original NASA reports remain in English.
- The 3D scene is lazy-loaded to keep the initial page responsive.
- NASA media cards include source links and visible credit text where available.
- If NASA media loading fails, the site remains usable with curated fallback items.


## Station updates and hosting

The `/station` page shows crew, research explanations and recent station reports
in the Mission Control design. A compact briefing also appears on the home page.
The station data API requires the included Vercel Node.js functions (or the Vite
dev/preview middleware); a static `dist` directory alone cannot refresh station
content. Use Node.js 22.12 or newer. No API keys are required.

| Content | Source and behavior |
| --- | --- |
| Crew membership and station roles | The active [NASA expedition page](https://www.nasa.gov/international-space-station/expedition-missions/). Crew changes follow the published source, not launch announcements. |
| Profiles and arrival dates | [People in Space](https://github.com/corquaid/international-space-station-APIs) supplements NASA profiles and docked-spacecraft arrival dates. Launch dates are not treated as arrivals. A community-only roster is explicitly labeled when NASA is unavailable. |
| Station reports | [NASA station RSS](https://www.nasa.gov/blogs/spacestation/feed/) and its [research feed](https://www.nasa.gov/blogs/spacestation/feed/?category_name=iss-research). Dates and source links accompany the reports. |
| Research explanations | Localized explanations for E4D, Venous Flow, ARED Kinematics and MIYOKA appear only when mentioned in the feed. New experiments still appear in original reports; additional explanation cards require extending the catalogue. |
| Orbit prediction | [wheretheiss.at TLE data](https://wheretheiss.at/w/developer), propagated with SGP4 for 90 minutes in Earth-fixed coordinates. Elements older than seven days are rejected. |
| Night texture | [NASA Earth Observatory/NOAA NGDC, 2012](https://earthobservatory.nasa.gov/images/79765/night-lights-2012-flat-map); this is a historical image. Clouds are illustrative. |

Station sources refresh every ten minutes while the page is visible. Each source
has an independent cache and availability state. During an outage, saved data is
shown with its original fetch time for up to 24 hours, then expires. The server
cache is per instance; the browser also stores its most recent response. Without
usable saved data, the page displays an unavailable state. These public sources
do not provide second-by-second crew or experiment telemetry, and changes to
NASA's page structure can interrupt the official roster parser.

The globe uses the UTC solar position for its geographic day/night boundary and
twilight. Follow mode can be switched off, and its rotation stays continuous at
the date line. The calculated orbit updates every minute and is distinguished
from observed positions. Orbital heights are exaggerated for readability.

`npm test` covers solar geometry, eclipses, orbit propagation, outdated elements,
NASA parsing, crew membership and roles, arrival dates, safe URLs and cache
failures. The fixtures are dated, shortened source responses used only by tests.
