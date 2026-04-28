export function SectionHeader({ kicker, title, children, className = "" }) {
  return (
    <div className={`section-heading-wide ${className}`.trim()}>
      {kicker ? <span className="section-kicker">{kicker}</span> : null}
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
