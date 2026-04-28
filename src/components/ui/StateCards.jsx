export function LoadingSkeleton({ label = "Loading live data..." }) {
  return (
    <div className="state-card state-card-loading" role="status" aria-live="polite">
      <span className="skeleton-bar" />
      <p>{label}</p>
    </div>
  );
}

export function ErrorState({ title = "Data unavailable", children }) {
  return (
    <div className="state-card state-card-error" role="alert">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}

export function EmptyState({ title = "Nothing to show yet", children }) {
  return (
    <div className="state-card">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}
