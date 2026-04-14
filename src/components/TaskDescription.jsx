export default function TaskDescription({ description }) {
  return (
    <p data-testid="test-todo-description" className="task-card__description">
      {description}
    </p>
  );
}