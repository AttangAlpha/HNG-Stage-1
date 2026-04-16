import './TaskActions.css'

export default function TaskActions({ completed, editing, onToggleComplete, onEdit, onDelete, editBtnRef }) {
  return (
    <aside className="sidebar">
      <label className="checkbox-wrap">
        <input
          data-testid="test-todo-complete-toggle"
          type="checkbox"
          checked={completed}
          onChange={onToggleComplete}
          aria-label="Mark task as complete"
        />
        <span>{completed ? "Completed" : "Mark complete"}</span>
      </label>
      <button
        ref={editBtnRef}
        data-testid="test-todo-edit-button"
        type="button"
        className="btn btn--primary"
        onClick={onEdit}
        aria-label="Edit task"
        aria-expanded={editing}
      >
        {editing ? "Editing..." : "Edit"}
      </button>
      <button
        data-testid="test-todo-delete-button"
        type="button"
        className="btn btn--danger"
        onClick={onDelete}
        aria-label="Delete task"
      >
        Delete
      </button>
    </aside>
  );
}