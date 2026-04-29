import { DataField } from "./DataField";
import { InfoTip } from "../ui/InfoTip";
import { StatusPill } from "../ui/StatusPill";
import {
  formatCoordinate,
  formatDataAge,
  formatHeading,
  formatMetric,
  formatTimestamp,
  formatVisibility,
  formatWholeMetric
} from "../../lib/formatters";
import { useI18n } from "../../lib/i18n.jsx";

export function SidebarPanel({ telemetry }) {
  const { snapshot, status, error, lastUpdated, history } = telemetry;
  const { languageInfo, t } = useI18n();
  const visibility = formatVisibility(snapshot?.visibility, t);

  const trailWindow =
    history.length > 1
      ? t.sidebar.pointsTrail(history.length, (((history.length - 1) * 10) / 60).toFixed(1))
      : t.sidebar.buildingTrail;

  return (
    <div className="sidebar-stack">
      <section id="live-data" className="panel hero-panel scroll-target">
        <div className="panel-header">
          <div>
            <span className="panel-eyebrow">{t.sidebar.missionControl}</span>
            <h2>{t.sidebar.liveTelemetry}</h2>
          </div>
          <StatusPill status={status} error={error} />
        </div>

        <div className="section-heading telemetry-subheading">
          <span>{trailWindow}</span>
        </div>

        {error ? (
          <div className="alert-card">
            <strong>{t.sidebar.unstable}</strong>
            <p>{error}</p>
          </div>
        ) : null}

        <div className="data-grid">
          <DataField
            label={t.sidebar.labels.latitude}
            value={formatCoordinate(snapshot?.latitude, "N", "S", 2, t)}
            emphasized
          />
          <DataField
            label={t.sidebar.labels.longitude}
            value={formatCoordinate(snapshot?.longitude, "E", "W", 2, t)}
            emphasized
          />
          <DataField
            label={t.sidebar.labels.altitude}
            value={formatMetric(snapshot?.altitude, "km", 1, languageInfo.intlLocale, t)}
            info={
              <InfoTip label={t.sidebar.labels.altitude}>
                {t.sidebar.altitudeInfo}
              </InfoTip>
            }
          />
          <DataField
            label={t.sidebar.labels.speed}
            value={formatWholeMetric(snapshot?.velocity, "km/h", languageInfo.intlLocale, t)}
            info={
              <InfoTip label={t.sidebar.velocityLabel}>
                {t.sidebar.velocityInfo}
              </InfoTip>
            }
          />
          <DataField label={t.sidebar.labels.visibility} value={visibility} />
          <DataField
            label={t.sidebar.labels.groundTrack}
            value={snapshot?.groundTrack || t.sidebar.groundTrackFallback}
            hint={
              snapshot?.footprint
                ? t.sidebar.footprint(formatMetric(snapshot.footprint, "km", 0, languageInfo.intlLocale, t))
                : undefined
            }
            info={
              <InfoTip label={t.sidebar.labels.groundTrack}>
                {t.sidebar.groundTrackInfo}
              </InfoTip>
            }
          />
          <DataField
            label={t.sidebar.labels.direction}
            value={formatHeading(snapshot?.heading, t)}
            hint={t.sidebar.directionHint}
          />
          <DataField
            label={t.sidebar.labels.lastUpdate}
            value={formatTimestamp(lastUpdated, languageInfo.intlLocale, t)}
            hint={formatDataAge(lastUpdated, t)}
          />
        </div>
      </section>
    </div>
  );
}
