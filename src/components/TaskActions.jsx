export default function TaskActions({ completed, onToggleComplete, onEdit, onDelete }) {
  return (
    <footer className="task-card__footer">
      <label className="task-card__checkbox-wrap">
        <input
          data-testid="test-todo-complete-toggle"
          className="task-card__checkbox"
          type="checkbox"
          checked={completed}
          onChange={onToggleComplete}
          aria-label="Mark task as complete"
        />
        <span>{completed ? 'Completed' : 'Mark complete'}</span>
      </label>

      <div className="task-card__buttons">
        <button
          data-testid="test-todo-edit-button"
          className="task-card__button task-card__button--ghost"
          type="button"
          onClick={onEdit}
          aria-label="Edit task"
        >
          Edit
        </button>
        <button
          data-testid="test-todo-delete-button"
          className="task-card__button task-card__button--danger"
          type="button"
          onClick={onDelete}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </footer>
  );
}