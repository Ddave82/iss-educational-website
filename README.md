# ISS Explorer

An English, family-friendly one-page website about the International Space
Station. The site combines live ISS tracking, an interactive 3D Earth, concise
learning sections, NASA imagery, and a station livestream.

## Highlights

- Live ISS position, altitude, speed, visibility, heading, and ground track
- Interactive 3D Earth with station marker, recent trail, and orbit preview
- Learning sections for the station, daily life, science, and Earth observation
- NASA Image and Video Library gallery with curated NASA fallbacks
- Embedded NASA ISS livestream with a link to NASA Live
- Static-hosting friendly build for Vercel or GitHub-based deployment

## Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL:

```text
http://localhost:5173/
```

## Production Build

```bash
npm run build
npm run preview
```

The production app uses the HTTPS `wheretheiss.at` endpoint directly. The Vite
proxy entries are only local development fallbacks.

## Data and Media Sources

| Purpose | Source |
| --- | --- |
| Live ISS telemetry | `https://api.wheretheiss.at/v1/satellites/25544` |
| NASA media search | `https://images-api.nasa.gov/search` |
| Curated image fallbacks | NASA Space Station Gallery |
| Livestream | NASA ISS stream on YouTube and NASA Live |
| Station sighting reference | NASA Spot the Station |
| Country and coastline geometry | `world-atlas/countries-110m.json` |

NASA imagery is credited as source material and is not used in a way that
implies endorsement. NASA logos and identifiers are not used as site branding.

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
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
```
