import { PRIORITY_CONFIG } from '../../utils/constants';
import './PriorityIndicator.css'

export default function PriorityIndicator({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.Medium;
  return (
    <span
      data-testid="test-todo-priority-indicator"
      className="priority-indicator"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
    >
      <span className="priority-dot" style={{ background: cfg.dot }} />
      {priority}
    </span>
  );
}