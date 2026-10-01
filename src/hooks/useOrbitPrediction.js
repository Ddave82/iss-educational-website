import { useEffect, useState } from "react";
import { fetchIssTle, predictOrbit } from "../lib/orbitPrediction.js";

export function useOrbitPrediction() {
  const [orbit, setOrbit] = useState({ points: [], epoch: null, status: "loading" });
  useEffect(() => {
    let active = true;
    let busy = false;
    async function refresh() {
      if (document.hidden || busy) return;
      busy = true;
      try {
        const tle = await fetchIssTle();
        const prediction = predictOrbit(tle);
        if (active) setOrbit({ ...prediction, status: "ready" });
      } catch {
        if (active) setOrbit({ points: [], epoch: null, status: "unavailable" });
      } finally { busy = false; }
    }
    refresh();
    const timer = setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    return () => { active = false; clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return orbit;
}
