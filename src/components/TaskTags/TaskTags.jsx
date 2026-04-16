import './TaskTags.css'

export default function TaskTags({ tags }) {
  return (
    <div className="tags-block">
      <span className="sched-label">Categories</span>
      <ul data-testid="test-todo-tags" className="tags-list" role="list">
        {tags.map((tag) => (
          <li key={tag}>
            <span
              className="tag-chip"
              data-testid={`test-todo-tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}