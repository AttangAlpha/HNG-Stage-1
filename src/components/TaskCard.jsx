import { useEffect, useMemo, useState } from 'react';
import TaskHeader from './TaskHeader';
import TaskDescription from './TaskDescription';
import TaskSchedule from './TaskSchedule';
import TaskTags from './TaskTags';
import TaskActions from './TaskActions';

export default function TaskCard({ task, refreshMs = 30000, onEdit, onDelete }) {
  const [completed, setCompleted] = useState(task.completed);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, refreshMs);

    return () => window.clearInterval(timer);
  }, [refreshMs]);

  const progressLabel = useMemo(() => {
    if (completed) return 'Done and ready to archive';
    if (task.status.toLowerCase() === 'in progress') return 'Momentum is building';
    return 'Ready for the next move';
  }, [completed, task.status]);

  function handleToggleComplete() {
    setCompleted((current) => !current);
  }

  function handleEdit() {
    if (onEdit) return onEdit(task);
    window.alert(`Edit: ${task.title}`);
  }

  function handleDelete() {
    if (onDelete) return onDelete(task);
    window.alert(`Delete: ${task.title}`);
  }

  return (
    <article
      data-testid="test-todo-card"
      className={`task-card ${completed ? 'task-card--completed' : ''}`}
      aria-labelledby="task-card-title"
    >
      <div className="task-card__glow" aria-hidden="true" />
      <div className="task-card__grid">
        <div className="task-card__main">
          <TaskHeader title={task.title} priority={task.priority} status={task.status} />
          <div className="task-card__pulse-row" aria-hidden="true">
            <span className="task-card__pulse-dot" />
            <span className="task-card__pulse-text">{progressLabel}</span>
          </div>
          <TaskDescription description={task.description} />
          <TaskSchedule dueDate={task.dueDate} now={now} />
          <TaskTags tags={task.tags} />
        </div>

        <TaskActions
          completed={completed}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </article>
  );
}