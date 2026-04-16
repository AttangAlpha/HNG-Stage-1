import { useEffect, useRef, useState } from 'react';
import './EditForm.css'

export default function EditForm({ task, onSave, onCancel }) {
  const [draft, setDraft] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: new Date(task.dueDate).toISOString().slice(0, 16),
  });
  const firstRef = useRef(null);

  useEffect(() => { firstRef.current?.focus(); }, []);

  function set(field) {
    return (e) => setDraft((d) => ({ ...d, [field]: e.target.value }));
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") onCancel();
  }

  return (
    <div
      data-testid="test-todo-edit-form"
      className="edit-form"
      role="dialog"
      aria-label="Edit task"
      onKeyDown={handleKeyDown}
    >
      <div className="form-group">
        <label className="form-label" htmlFor="edit-title">Title</label>
        <input
          id="edit-title"
          ref={firstRef}
          data-testid="test-todo-edit-title-input"
          className="form-input"
          type="text"
          value={draft.title}
          onChange={set("title")}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="edit-desc">Description</label>
        <textarea
          id="edit-desc"
          data-testid="test-todo-edit-description-input"
          className="form-textarea"
          value={draft.description}
          onChange={set("description")}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="edit-priority">Priority</label>
          <select
            id="edit-priority"
            data-testid="test-todo-edit-priority-select"
            className="form-select"
            value={draft.priority}
            onChange={set("priority")}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="edit-due">Due date</label>
          <input
            id="edit-due"
            data-testid="test-todo-edit-due-date-input"
            className="form-input"
            type="datetime-local"
            value={draft.dueDate}
            onChange={set("dueDate")}
          />
        </div>
      </div>
      <div className="form-actions">
        <button
          data-testid="test-todo-cancel-button"
          type="button"
          className="form-btn form-btn--cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          data-testid="test-todo-save-button"
          type="button"
          className="form-btn form-btn--save"
          onClick={() => onSave(draft)}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}