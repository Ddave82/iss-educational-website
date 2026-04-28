import { InfoTip } from "./InfoTip";

export function StatCard({ label, value, detail, info, tone = "cyan" }) {
  return (
    <article className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-label-row">
        <span>{label}</span>
        {info ? <InfoTip label={label}>{info}</InfoTip> : null}
      </div>
      <strong>{value}</strong>
      {detail ? <p>{detail}</p> : null}
    </article>
  );
}
