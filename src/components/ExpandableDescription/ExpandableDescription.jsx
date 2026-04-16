import { useState } from 'react';
import { COLLAPSE_THRESHOLD } from '../../utils/constants';
import './ExpandableDescription.css'

export default function ExpandableDescription({ description }) {
  const isLong = description.length > COLLAPSE_THRESHOLD;
  const [expanded, setExpanded] = useState(!isLong);

  return (
    <div className="desc-wrapper">
      <p
        data-testid="test-todo-description"
        className={`card__desc${expanded ? " expanded" : ""}`}
        style={!expanded ? { WebkitLineClamp: 2 } : {}}
      >
        {description}
      </p>
      {isLong && (
        <button
          data-testid="test-todo-expand-toggle"
          className="expand-btn"
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-controls="collapsible-section"
        >
          <span>{expanded ? "Show less" : "Show more"}</span>
          <svg
            className={`expand-chevron${expanded ? " up" : ""}`}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <div
        id="collapsible-section"
        data-testid="test-todo-collapsible-section"
        className={`collapsible-section${expanded ? " open" : ""}`}
        aria-hidden={!expanded}
      >
        <div className="collapsible-inner" />
      </div>
    </div>
  );
}