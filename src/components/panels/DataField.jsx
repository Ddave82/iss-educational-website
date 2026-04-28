export function DataField({ label, value, hint, emphasized = false, info }) {
  return (
    <article className={`data-field${emphasized ? " is-emphasized" : ""}`}>
      <span className="data-field-label">
        {label}
        {info ? <span className="data-field-info">{info}</span> : null}
      </span>
      <strong className="data-field-value">{value}</strong>
      {hint ? <span className="data-field-hint">{hint}</span> : null}
    </article>
  );
}
