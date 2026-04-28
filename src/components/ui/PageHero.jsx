export function PageHero({ kicker, title, children, actions, compact = false }) {
  return (
    <section className={`page-hero${compact ? " page-hero-compact" : ""}`}>
      <div className="page-hero-inner">
        {kicker ? <span className="section-kicker">{kicker}</span> : null}
        <h1>{title}</h1>
        {children ? <p>{children}</p> : null}
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
