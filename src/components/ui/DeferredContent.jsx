import { useEffect, useRef, useState } from "react";

// Mount expensive content only as it approaches the viewport; keep it mounted thereafter.
export function DeferredContent({ children }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setReady(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "240px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="deferred-scene">{ready ? children : <div className="scene-placeholder" aria-hidden="true"><span>◎</span>ISS / ORBITAL VIEW</div>}</div>;
}
