import { useCallback, useEffect, useState } from "react";

const CACHE_KEY = "iss-station-brief-v1";
const MAX_AGE = 86400000;
const empty = { crew: null, news: null, research: null };

export function usableStationData(data, offline = false, now = Date.now()) {
  return Object.fromEntries(Object.keys(empty).map(key => {
    const section = data?.[key];
    const age = now - Date.parse(section?.fetchedAt);
    if (!section?.data || !Number.isFinite(age) || age < -300000 || age > MAX_AGE) return [key, { status: "unavailable", data: null, fetchedAt: null }];
    return [key, { ...section, status: offline || age > 1200000 ? "stale" : section.status }];
  }));
}

function restore() {
  try { return usableStationData(JSON.parse(localStorage.getItem(CACHE_KEY)), true); } catch { return empty; }
}

export function useStationBrief() {
  const [data, setData] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => { setLoading(true); setRevision(value => value + 1); }, []);
  useEffect(() => {
    setData(previous => previous === empty ? restore() : previous);
    let active = true;
    let controller;
    let busy = false;
    async function update() {
      if (document.hidden || busy) return;
      busy = true;
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 40000);
      try {
        const response = await fetch("/api/iss/station", { signal: controller.signal });
        if (!response.ok) throw new Error("Station data unavailable");
        const payload = await response.json();
        if (!payload || !Object.keys(empty).every(key => key in payload)) throw new Error("Invalid station data");
        if (active) setData(previous => {
          const merged = Object.fromEntries(Object.keys(empty).map(key => [key, payload[key]?.data ? payload[key] : previous[key] ? { ...previous[key], status: "stale" } : payload[key]]));
          const next = usableStationData(merged);
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)); } catch { /* Private mode / storage quota. */ }
          return next;
        });
      } catch {
        if (active) setData(previous => usableStationData(previous, true));
      } finally { clearTimeout(timeout); busy = false; if (active) setLoading(false); }
    }
    update();
    const timer = setInterval(update, 600000);
    const ageTimer = setInterval(() => { if (!document.hidden) setData(previous => usableStationData(previous)); }, 60000);
    document.addEventListener("visibilitychange", update);
    return () => { active = false; controller?.abort(); clearInterval(timer); clearInterval(ageTimer); document.removeEventListener("visibilitychange", update); };
  }, [revision]);
  return { data, loading, refresh };
}
