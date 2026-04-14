import { render, screen, cleanup, act, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, afterAll, describe, expect, it, vi } from 'vitest';
import TaskCard from '../components/TaskCard';

const task = {
  id: 'task-1',
  title: 'Prepare founder update',
  description: 'Pull metrics, refine story, and publish the internal recap.',
  priority: 'High',
  status: 'In Progress',
  dueDate: '2026-04-16T17:00:00.000Z',
  completed: false,
  tags: ['Ops', 'Product'],
};

describe('TaskCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-13T12:00:00.000Z'));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('renders all required test ids', () => {
    render(<TaskCard task={task} />);

    expect(screen.getByTestId('test-todo-card')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-title')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-description')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-priority')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-due-date')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-time-remaining')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-status')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-complete-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-tags')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-tag-ops')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-tag-product')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-edit-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-delete-button')).toBeInTheDocument();
  });

  it('toggles the completion checkbox', () => {
    render(<TaskCard task={task} />);

    const checkbox = screen.getByTestId('test-todo-complete-toggle');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('updates the relative time text on an interval', () => {
    render(<TaskCard task={task} refreshMs={30000} />);

    expect(screen.getByTestId('test-todo-time-remaining')).toHaveTextContent('Due in 3 days');

    act(() => {
      vi.setSystemTime(new Date('2026-04-15T12:00:00.000Z'));
      vi.advanceTimersByTime(30000);
    });

    expect(screen.getByTestId('test-todo-time-remaining')).toHaveTextContent('Due in 29 hours');
  });
});