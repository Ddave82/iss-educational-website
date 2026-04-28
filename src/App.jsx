import { lazy, Suspense } from "react";
import { FactStrip } from "./components/sections/FactStrip";
import { HeroSection } from "./components/sections/HeroSection";
import { LearningSection } from "./components/sections/LearningSection";
import { LivestreamSection } from "./components/sections/LivestreamSection";
import { MediaGallery } from "./components/sections/MediaGallery";
import { SourceList } from "./components/sections/SourceList";
import { TrackerSection } from "./components/sections/TrackerSection";
import { useIssTelemetry } from "./hooks/useIssTelemetry";

const EarthScene = lazy(() =>
  import("./components/scene/EarthScene").then((module) => ({
    default: module.EarthScene
  }))
);

function SceneLoadingState() {
  return (
    <section className="scene-panel scene-loading">
      <div className="scene-copy">
        <div>
          <span className="panel-eyebrow">Orbital View</span>
          <h2>Earth / ISS</h2>
        </div>
      </div>
      <div className="scene-stage scene-stage-loading">
        <div className="scene-fallback">
          <span>Loading the 3D scene ...</span>
        </div>
      </div>
    </section>
  );
}

function App() {
  const telemetry = useIssTelemetry();
  const trackerScene = (
    <Suspense fallback={<SceneLoadingState />}>
      <EarthScene telemetry={telemetry} />
    </Suspense>
  );

  return (
    <div className="site-shell">
      <HeroSection telemetry={telemetry} />
      <main>
        <FactStrip telemetry={telemetry} />
        <LearningSection />
        <TrackerSection telemetry={telemetry} scene={trackerScene} />
        <MediaGallery />
        <LivestreamSection />
      </main>
      <SourceList />
    </div>
  );
}

export default App;
