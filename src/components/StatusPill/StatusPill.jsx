import { STATUS_CONFIG } from '../../utils/constants';
import './StatusPill.css'

export default function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span
      data-testid="test-todo-status"
      className="status-pill"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
    >
      {status}
    </span>
  );
}