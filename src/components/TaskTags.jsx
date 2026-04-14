function toTestId(tag) {
  return `test-todo-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`;
}

export default function TaskTags({ tags }) {
  return (
    <div className="task-card__tags-block">
      <span className="task-card__schedule-label">Categories</span>
      <ul data-testid="test-todo-tags" className="task-card__tags" role="list">
        {tags.map((tag) => (
          <li key={tag} className="task-card__tag-item">
            <span className="tag-chip" data-testid={toTestId(tag)}>
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}