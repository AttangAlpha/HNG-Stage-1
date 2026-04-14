export default function TaskHeader({ title, priority, status }) {
  return (
    <header className="task-card__header">
      <div className="task-card__eyebrow" aria-hidden="true">
        Live sprint item
      </div>
      <div className="task-card__title-row">
        <h2 id="task-card-title" data-testid="test-todo-title" className="task-card__title">
          {title}
        </h2>
        <div className="task-card__meta-inline">
          <span
            data-testid="test-todo-priority"
            className={`pill pill--priority pill--${priority.toLowerCase()}`}
          >
            {priority} Priority
          </span>
          <span
            data-testid="test-todo-status"
            className={`pill pill--status pill--${status.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {status}
          </span>
        </div>
      </div>
    </header>
  );
}