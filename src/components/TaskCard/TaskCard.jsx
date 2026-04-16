import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INITIAL_TASK, PRIORITY_CONFIG } from '../../utils/constants';
import { isOverdue } from '../../utils/time';
import TaskHeader from '../TaskHeader/TaskHeader';
import StatusControl from '../StatusControl/StatusControl';
import ExpandableDescription from '../ExpandableDescription/ExpandableDescription';
import EditForm from '../EditForm/EditForm';
import TaskSchedule from '../TaskSchedule/TaskSchedule';
import TaskTags from '../TaskTags/TaskTags';
import TaskActions from '../TaskActions/TaskActions';
import './TaskCard.css'

export default function TaskCard({ task: initialTask = INITIAL_TASK, refreshMs = 30000 }) {
  const [task, setTask] = useState(initialTask);
  const [status, setStatus] = useState(initialTask.status);
  const [completed, setCompleted] = useState(initialTask.completed);
  const [editing, setEditing] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const editBtnRef = useRef(null);

  // Live time updates — stop when Done
  useEffect(() => {
    if (status === "Done") return;
    const id = window.setInterval(() => setNow(new Date()), refreshMs);
    return () => window.clearInterval(id);
  }, [refreshMs, status]);

  // Sync checkbox ↔ status
  const handleToggleComplete = useCallback(() => {
    const next = !completed;
    setCompleted(next);
    setStatus(next ? "Done" : "Pending");
  }, [completed]);

  const handleStatusChange = useCallback((s) => {
    setStatus(s);
    setCompleted(s === "Done");
  }, []);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setTimeout(() => editBtnRef.current?.focus(), 0);
  };
  const handleSave = (draft) => {
    setTask((t) => ({
      ...t,
      title: draft.title,
      description: draft.description,
      priority: draft.priority,
      dueDate: draft.dueDate,
    }));
    setEditing(false);
    setTimeout(() => editBtnRef.current?.focus(), 0);
  };
  const handleDelete = () => window.alert(`Delete: ${task.title}`);

  const overdue = status !== "Done" && isOverdue(task.dueDate, now);
  const priorityCfg = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.Medium;

  const progressLabel = useMemo(() => {
    if (status === "Done") return "Task complete — ready to archive";
    if (status === "In Progress") return "Momentum is building";
    return "Ready for the next move";
  }, [status]);

  return (
    <article
      data-testid="test-todo-card"
      className={`card${status === "Done" ? " card--done" : ""}`}
      aria-labelledby="tc-title"
    >
      <div
        className="card__priority-bar"
        aria-hidden="true"
        style={{ background: priorityCfg.dot }}
      />
      <div className="card__glow" aria-hidden="true" />
      <div className="card__grid">
        {/* ── Main column ── */}
        <div className="card__main">
          <TaskHeader
            title={task.title}
            priority={task.priority}
            status={status}
            overdue={overdue}
          />
          <StatusControl status={status} onChange={handleStatusChange} />
          <div className="pulse-row" aria-hidden="true">
            <span className="pulse-dot" />
            <span>{progressLabel}</span>
          </div>
          <ExpandableDescription description={task.description} />
          {editing && (
            <EditForm task={task} onSave={handleSave} onCancel={handleCancel} />
          )}
          <TaskSchedule dueDate={task.dueDate} now={now} status={status} />
          <TaskTags tags={task.tags} />
        </div>

        {/* ── Sidebar / actions ── */}
        <TaskActions
          completed={completed}
          editing={editing}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editBtnRef={editBtnRef}
        />
      </div>
    </article>
  );
}