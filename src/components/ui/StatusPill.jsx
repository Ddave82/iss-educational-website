import { getStatusLabel } from "../../lib/formatters";

export function StatusPill({ status, error }) {
  return (
    <div className={`status-pill status-${status}`}>
      <span className="status-dot" />
      {getStatusLabel(status, error)}
    </div>
  );
}
