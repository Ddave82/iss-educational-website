import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  getOrbitRadius,
  latLonToVector3,
  toTrailSegments
} from "../../lib/earthMath";
import { EarthSurface } from "./EarthSurface.jsx";
import { useOrbitPrediction } from "../../hooks/useOrbitPrediction.js";
import { missionCopy } from "../../lib/missionCopy.js";
import { useI18n } from "../../lib/i18n.jsx";

const EARTH_RADIUS = 1.9;
const CAMERA_DISTANCE = 7.7;
const VIEW_TARGET_Y = 0.08;
const MOBILE_CAMERA_DISTANCE = 8.8;
const MOBILE_EARTH_POSITION_Y = -0.16;
const MOBILE_SCENE_BREAKPOINT = "(max-width: 900px)";

function useIsMobileScene() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(MOBILE_SCENE_BREAKPOINT).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_SCENE_BREAKPOINT);
    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isMobile;
}

function canRequestFullscreen(element) {
  return Boolean(
    element?.requestFullscreen ||
      element?.webkitRequestFullscreen ||
      element?.webkitRequestFullScreen
  );
}

function isFullscreenSupported() {
  if (typeof document === "undefined") {
    return false;
  }

  if (typeof document.fullscreenEnabled === "boolean") {
    return document.fullscreenEnabled;
  }

  if (typeof document.webkitFullscreenEnabled === "boolean") {
    return document.webkitFullscreenEnabled;
  }

  return true;
}

function getCurrentFullscreenElement() {
  if (typeof document === "undefined") {
    return null;
  }

  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    null
  );
}

async function requestElementFullscreen(element) {
  if (element?.requestFullscreen) {
    return element.requestFullscreen();
  }

  if (element?.webkitRequestFullscreen) {
    return element.webkitRequestFullscreen();
  }

  if (element?.webkitRequestFullScreen) {
    return element.webkitRequestFullScreen();
  }

  return null;
}

async function exitCurrentFullscreen() {
  if (typeof document === "undefined") {
    return null;
  }

  if (document.exitFullscreen) {
    return document.exitFullscreen();
  }

  if (document.webkitExitFullscreen) {
    return document.webkitExitFullscreen();
  }

  if (document.webkitCancelFullScreen) {
    return document.webkitCancelFullScreen();
  }

  return null;
}

function IssMarker({ snapshot, earthRef }) {
  const marker = useRef();
  const { invalidate } = useThree();
  const target = useMemo(() => latLonToVector3(snapshot.latitude, snapshot.longitude, getOrbitRadius(snapshot.altitude, EARTH_RADIUS)), [snapshot]);
  const initial = useRef(target.clone());
  useFrame((_, delta) => {
    if (!marker.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    marker.current.position.lerp(target, reduced ? 1 : 1 - Math.exp(-delta * 7));
    if (marker.current.position.distanceTo(target) > 0.0001) invalidate();
  });
  return <group ref={marker} position={initial.current}>
    <mesh><sphereGeometry args={[0.04, 16, 16]} /><meshBasicMaterial color="#d5f878" /></mesh>
    <Html occlude={[earthRef]} center>
      <div className="iss-overlay"><span className="iss-core-dot" /><div className="iss-tag">ISS</div></div>
    </Html>
  </group>;
}

function EarthBody({ snapshot, history, isMobile, positionY, following, orbit, time }) {
  const trackingRef = useRef(null);
  const earthRef = useRef(null);
  const target = useRef(new THREE.Quaternion());
  const { invalidate } = useThree();
  useEffect(() => { invalidate(); }, [time, invalidate]);
  const hasPosition = Number.isFinite(snapshot?.latitude) && Number.isFinite(snapshot?.longitude);
  const trailSegments = useMemo(() => toTrailSegments(history, EARTH_RADIUS), [history]);
  const preview = useMemo(() => orbit.points.map(point => latLonToVector3(point.latitude, point.longitude, getOrbitRadius(point.altitude, EARTH_RADIUS)).toArray()), [orbit.points]);
  useEffect(() => {
    if (following && hasPosition) {
      target.current.setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(snapshot.latitude), THREE.MathUtils.degToRad(-snapshot.longitude), 0));
      invalidate();
    }
  }, [following, snapshot, hasPosition, invalidate]);
  useFrame((_, delta) => {
    if (!following || !trackingRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackingRef.current.quaternion.slerp(target.current, reduced ? 1 : 1 - Math.exp(-delta * 6));
    if (trackingRef.current.quaternion.angleTo(target.current) > 0.0001) invalidate();
  });
  return <group position={[0, positionY, 0]}><group ref={trackingRef}>
    <EarthSurface earthRef={earthRef} radius={EARTH_RADIUS} isMobile={isMobile} time={time} />
    {trailSegments.map((points, index) => <Line key={index} points={points} color="#f3a7a0" transparent opacity={0.65} lineWidth={2} />)}
    {preview.length > 1 && <Line points={preview} color="#d5f878" transparent opacity={0.65} lineWidth={1.4} dashed dashScale={20} dashSize={0.8} gapSize={0.5} />}
    {hasPosition && <IssMarker snapshot={snapshot} earthRef={earthRef} />}
  </group></group>;
}

function SceneControls({ isMobile, viewTargetY }) {
  const { invalidate } = useThree();

  return (
    <OrbitControls
      target={[0, viewTargetY, 0]}
      enablePan={false}
      enableZoom
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={isMobile ? 0.72 : 0.55}
      zoomSpeed={isMobile ? 0.92 : 0.86}
      minDistance={isMobile ? 5.9 : 4.9}
      maxDistance={isMobile ? 12.3 : 11.8}
      minPolarAngle={Math.PI / 3.2}
      maxPolarAngle={Math.PI / 1.48}
      touches={
        isMobile
          ? {
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_ROTATE
            }
          : {
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }
      }
      onChange={() => invalidate()}
    />
  );
}

function SceneFallback() {
  const { t } = useI18n();

  return (
    <div className="scene-fallback">
      <span>{t.scene.fallback}</span>
    </div>
  );
}

function SceneHeading() {
  const { t } = useI18n();

  return (
    <div>
      <span className="panel-eyebrow">{t.scene.kicker}</span>
      <h2>{t.scene.title}</h2>
    </div>
  );
}

function SceneToolbar({ isFullscreen, isFullscreenAvailable, onToggleFullscreen }) {
  const { t } = useI18n();

  if (!isFullscreenAvailable) {
    return null;
  }

  return (
    <div className="scene-toolbar">
      <button
        type="button"
        className={`scene-action-button${isFullscreen ? " is-active" : ""}`}
        onClick={onToggleFullscreen}
        aria-pressed={isFullscreen}
        aria-label={
          isFullscreen
            ? t.scene.closeFullscreen
            : t.scene.openFullscreen
        }
      >
        {isFullscreen ? t.scene.exitFullscreen : t.scene.fullscreen}
      </button>
    </div>
  );
}

function SceneHudCard({ groundTrack, statusText, interactionHint, inline = false }) {
  const { t } = useI18n();

  return (
    <div className={`scene-hud-card${inline ? " scene-hud-card-inline" : ""}`}>
      <span className="scene-card-label">{t.scene.groundTrack}</span>
      <strong>{groundTrack || t.scene.findingPosition}</strong>
      <span>{statusText}</span>
      <span>{interactionHint}</span>
    </div>
  );
}

export function EarthScene({ telemetry }) {
  const { snapshot, history, status } = telemetry;
  const { t, language } = useI18n();
  const copy = missionCopy[language];
  const orbit = useOrbitPrediction();
  const [following, setFollowing] = useState(true);
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const tick = () => { if (!document.hidden) setTime(Date.now()); };
    const timer = setInterval(tick, 30000);
    document.addEventListener("visibilitychange", tick);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", tick); };
  }, []);
  const isMobile = useIsMobileScene();
  const stageRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFullscreenAvailable, setIsFullscreenAvailable] = useState(false);
  const viewTargetY = VIEW_TARGET_Y;
  const earthPositionY = isMobile ? MOBILE_EARTH_POSITION_Y : viewTargetY;
  const statusText =
    status === "live"
      ? t.scene.status.live
      : status === "partial"
        ? t.scene.status.partial
      : status === "stale"
        ? t.scene.status.stale
        : t.scene.status.waiting;
  const interactionHint = isMobile
    ? t.scene.mobileHint
    : t.scene.desktopHint;

  useEffect(() => {
    const stageElement = stageRef.current;

    setIsFullscreenAvailable(
      Boolean(stageElement && canRequestFullscreen(stageElement) && isFullscreenSupported())
    );

    const handleFullscreenChange = () => {
      setIsFullscreen(getCurrentFullscreenElement() === stageElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    handleFullscreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  async function handleToggleFullscreen() {
    const stageElement = stageRef.current;

    if (!stageElement || !canRequestFullscreen(stageElement)) {
      return;
    }

    try {
      if (getCurrentFullscreenElement() === stageElement) {
        await exitCurrentFullscreen();
        return;
      }

      await requestElementFullscreen(stageElement);
    } catch {
      // Ignore browser fullscreen rejections and leave the current UI state intact.
    }
  }

  return (
    <section id="orbital-view" className="scene-panel earth-scene-panel scroll-target">
      {isMobile ? (
        <div className="scene-copy scene-copy-mobile">
          <SceneHeading />
        </div>
      ) : null}

      <div className="orbit-controls-bar">
        <button type="button" aria-pressed={following} onClick={() => setFollowing(value => !value)}>{following ? copy.following : copy.freeView}</button>
        <span><i className="orbit-key" />{orbit.status === "ready" ? copy.orbitPreview : copy.orbitUnavailable}</span>
        <span className="solar-clock">☀ {new Date(time).toISOString().slice(11, 16)} UTC</span>
      </div>
      <div
        ref={stageRef}
        className={`scene-stage${isFullscreen ? " scene-stage-fullscreen" : ""}`}
      >
        {!isMobile ? (
          <div className="scene-copy scene-copy-overlay">
            <SceneHeading />
          </div>
        ) : null}

        <SceneToolbar
          isFullscreen={isFullscreen}
          isFullscreenAvailable={isFullscreenAvailable}
          onToggleFullscreen={handleToggleFullscreen}
        />

        <Canvas
          dpr={isMobile ? [0.85, 1.05] : [1, 1.25]}
          frameloop="demand"
          gl={{
            alpha: true,
            antialias: !isMobile,
            powerPreference: "low-power"
          }}
          fallback={<SceneFallback />}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, viewTargetY, isMobile ? MOBILE_CAMERA_DISTANCE : CAMERA_DISTANCE]}
            fov={36}
          />
          <fog attach="fog" args={["#02030b", 10, 22]} />
          <EarthBody
            snapshot={snapshot}
            history={history}
            isMobile={isMobile}
            positionY={earthPositionY}
            following={following}
            orbit={orbit}
            time={time}
          />
          <SceneControls isMobile={isMobile} viewTargetY={viewTargetY} />
        </Canvas>

        {!isMobile ? (
          <SceneHudCard
            groundTrack={snapshot?.groundTrack}
            statusText={statusText}
            interactionHint={interactionHint}
          />
        ) : null}

        <div className="scene-overlay scene-overlay-top" />
        <div className="scene-overlay scene-overlay-bottom" />
      </div>

      <p className="orbit-source-note">{copy.solarNote}{orbit.epoch ? ` · ${copy.orbitEpoch}: ${new Date(orbit.epoch).toLocaleString(language, { dateStyle: "short", timeStyle: "short" })}` : ""}</p>
      {isMobile ? (
        <SceneHudCard
          groundTrack={snapshot?.groundTrack}
          statusText={statusText}
          interactionHint={interactionHint}
          inline
        />
      ) : null}
    </section>
  );
}
