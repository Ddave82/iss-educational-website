import { getStatusLabel } from "../../lib/formatters";
import { useI18n } from "../../lib/i18n.jsx";

export function StatusPill({ status, error }) {
  const { t } = useI18n();

  return (
    <div className={`status-pill status-${status}`}>
      <span className="status-dot" />
      {getStatusLabel(status, error, t)}
    </div>
  );
}
