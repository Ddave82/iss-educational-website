export function FeatureCard({ kicker, title, children, facts = [], href, cta = "Learn more" }) {
  return (
    <article className="feature-card">
      {kicker ? <span className="section-kicker">{kicker}</span> : null}
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
      {facts.length ? (
        <ul>
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      ) : null}
      {href ? (
        <a className="card-link" href={href}>
          {cta}
        </a>
      ) : null}
    </article>
  );
}
