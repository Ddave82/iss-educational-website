import { formatTimestamp, formatWholeMetric } from "../../lib/formatters";
import { useI18n } from "../../lib/i18n.jsx";
import { StatCard } from "../ui/StatCard";

function formatAltitude(value, t) {
  if (!Number.isFinite(value)) {
    return t.common.aboutAltitude;
  }

  return `${value.toFixed(0)} km`;
}

function formatVelocity(value, locale, t) {
  if (!Number.isFinite(value)) {
    return t.common.aboutVelocity;
  }

  return formatWholeMetric(value, "km/h", locale, t);
}

export function FactStrip({ telemetry }) {
  const { snapshot, lastUpdated } = telemetry;
  const { languageInfo, t } = useI18n();
  const facts = [
    {
      value: formatAltitude(snapshot?.altitude, t),
      label: t.factStrip.altitudeLabel,
      detail: t.factStrip.altitudeDetail,
      info: t.factStrip.altitudeInfo
    },
    {
      value: formatVelocity(snapshot?.velocity, languageInfo.intlLocale, t),
      label: t.factStrip.speedLabel,
      detail: t.factStrip.speedDetail,
      info: t.factStrip.speedInfo
    },
    {
      value: t.factStrip.orbitsValue,
      label: t.factStrip.orbitsLabel,
      detail: t.factStrip.orbitsDetail
    },
    {
      value: t.factStrip.statusValue,
      label: t.factStrip.statusLabel,
      detail: t.factStrip.statusDetail
    },
    {
      value: formatTimestamp(lastUpdated, languageInfo.intlLocale, t),
      label: t.factStrip.updatedLabel,
      detail: t.factStrip.updatedDetail,
      info: t.factStrip.updatedInfo
    }
  ];

  return (
    <section className="fact-strip" aria-label={t.factStrip.aria}>
      {facts.map((fact) => (
        <StatCard
          key={fact.label}
          value={fact.value}
          label={fact.label}
          detail={fact.detail}
          info={fact.info}
        />
      ))}
    </section>
  );
}
