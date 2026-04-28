# ISS Explorer

An immersive educational website about the International Space Station, built
with React, Vite, Three.js, live orbital data, and public NASA learning
resources.

ISS Explorer is designed for curious kids, families, classrooms, and space fans:
it combines a live 3D ISS tracker with short learning sections, NASA imagery,
and livestream access in one polished single-page experience.

![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=06111f)
![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.176-111111?style=for-the-badge&logo=three.js&logoColor=white)
![NASA Media](https://img.shields.io/badge/NASA-Media%20Sources-f6bf66?style=for-the-badge)

## Preview

Live preview: [iss-educational-website.vercel.app](https://iss-educational-website.vercel.app)

## What It Does

- Tracks the International Space Station in real time
- Shows latitude, longitude, altitude, speed, visibility, heading, and ground track
- Renders an interactive 3D Earth with ISS marker, recent trail, and orbit preview
- Explains the ISS through concise, family-friendly learning cards
- Loads imagery from NASA's public Image and Video Library
- Falls back to curated NASA gallery items when the media API is unavailable
- Embeds NASA Live and links station-viewing resources
- Works as a static Vite build for Vercel deployment

## Live Data and Media

| Feature | Source |
| --- | --- |
| ISS telemetry | [`wheretheiss.at`](https://wheretheiss.at/w/developer) |
| NASA media search | [`images-api.nasa.gov`](https://images.nasa.gov/) |
| Curated gallery fallbacks | [NASA Space Station Gallery](https://www.nasa.gov/international-space-station/space-station-gallery/) |
| Livestream | [NASA Live](https://www.nasa.gov/live/) |
| Station facts | [NASA Station Facts and Figures](https://www.nasa.gov/international-space-station/space-station-facts-and-figures/) |
| Visitor counts | [NASA Station Visitors](https://www.nasa.gov/international-space-station/space-station-visitors-by-country/) |
| Station visibility reference | [NASA Spot the Station](https://www.nasa.gov/spot-the-station/) |
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
| Deployment target | Vercel / static hosting |

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173/
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

## Project Structure

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
```

## Notes

- The app is English-language and optimized as a first-version educational site.
- The 3D scene is lazy-loaded to keep the initial page responsive.
- NASA media cards include source links and visible credit text where available.
- If NASA media loading fails, the site remains usable with curated fallback items.
