import { formatDueDate, formatTimeRemaining, isOverdue } from '../utils/time';

export default function TaskSchedule({ dueDate, now }) {
  const overdue = isOverdue(dueDate, now);

  return (
    <section className="task-card__schedule" aria-label="Task schedule details">
      <div className="task-card__schedule-item">
        <span className="task-card__schedule-label">Deadline</span>
        <time
          data-testid="test-todo-due-date"
          className="task-card__schedule-value"
          dateTime={new Date(dueDate).toISOString()}
        >
          {formatDueDate(dueDate)}
        </time>
      </div>

      <div className="task-card__schedule-item">
        <span className="task-card__schedule-label">Countdown</span>
        <time
          data-testid="test-todo-time-remaining"
          className={`task-card__schedule-value ${overdue ? 'is-overdue' : ''}`}
          dateTime={new Date(dueDate).toISOString()}
          aria-live="polite"
        >
          {formatTimeRemaining(dueDate, now)}
        </time>
      </div>
    </section>
  );
}