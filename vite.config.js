import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stationHandler from "./api/iss/station.js";
import tleHandler from "./api/iss/tle.js";

function stationApi() {
  const configure = server => {
    for (const [path, handler] of [["/api/iss/station", stationHandler], ["/api/iss/tle", tleHandler]]) {
      server.middlewares.use(path, (request, response, next) => {
        if (request.url !== "/" && request.url !== "") return next();
        Promise.resolve(handler(request, response)).catch(() => {
          response.statusCode = 500;
          response.end(JSON.stringify({ error: "Station API unavailable" }));
        });
      });
    }
  };
  return { name: "station-api", configureServer: configure, configurePreviewServer: configure };
}

export default defineConfig({
  plugins: [react(), stationApi()],
  build: {
    chunkSizeWarningLimit: 950
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    proxy: {
      "/api/iss/current": {
        target: "https://api.wheretheiss.at",
        changeOrigin: true,
        rewrite: () => "/v1/satellites/25544"
      },
      "/api/iss/fallback": {
        target: "http://api.open-notify.org",
        changeOrigin: true,
        rewrite: () => "/iss-now.json"
      }
    }
  }
});
