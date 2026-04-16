import './StatusControl.css'

const STATUSES = ["Pending", "In Progress", "Done"];

export default function StatusControl({ status, onChange }) {
  return (
    <div
      data-testid="test-todo-status-control"
      className="status-control"
      role="group"
      aria-label="Task status"
    >
      {STATUSES.map((s) => (
        <button
          key={s}
          type="button"
          className={`status-btn${status === s ? " active" : ""}`}
          onClick={() => onChange(s)}
          aria-pressed={status === s}
        >
          {s}
        </button>
      ))}
    </div>
  );
}