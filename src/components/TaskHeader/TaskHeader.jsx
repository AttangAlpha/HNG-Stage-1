import PriorityIndicator from '../PriorityIndicator/PriorityIndicator';
import StatusPill from '../StatusPill/StatusPill';
import './TaskHeader.css'

export default function TaskHeader({ title, priority, status, overdue }) {
  return (
    <header className="card__header">
      <div className="eyebrow" aria-hidden="true">Live sprint item</div>
      <h2 id="tc-title" data-testid="test-todo-title" className="card__title">
        {title}
      </h2>
      <div className="meta-row">
        <span data-testid="test-todo-priority">
          <PriorityIndicator priority={priority} />
        </span>
        <StatusPill status={status} />
        {overdue && (
          <span data-testid="test-todo-overdue-indicator" className="overdue-badge">
            <span className="overdue-dot" />
            Overdue
          </span>
        )}
      </div>
    </header>
  );
}