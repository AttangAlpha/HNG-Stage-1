import { formatDueDate, formatTimeRemaining, isOverdue } from '../../utils/time';
import './TaskSchedule.css'

export default function TaskSchedule({ dueDate, now, status }) {
  const overdue = status !== "Done" && isOverdue(dueDate, now);
  const timeText = formatTimeRemaining(dueDate, now, status);

  return (
    <section className="schedule" aria-label="Task schedule">
      <div className="sched-item">
        <span className="sched-label">Deadline</span>
        <time
          data-testid="test-todo-due-date"
          className="sched-value"
          dateTime={new Date(dueDate).toISOString()}
        >
          {formatDueDate(dueDate)}
        </time>
      </div>
      <div className="sched-item">
        <span className="sched-label">Countdown</span>
        <time
          data-testid="test-todo-time-remaining"
          className={`sched-value${overdue ? " overdue" : ""}`}
          dateTime={new Date(dueDate).toISOString()}
          aria-live="polite"
        >
          {timeText}
        </time>
      </div>
    </section>
  );
}