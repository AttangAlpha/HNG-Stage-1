import { render, screen, cleanup, act, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, afterAll, describe, expect, it, vi } from 'vitest';
import TaskCard from '../components/TaskCard';

const task = {
  id: 'task-1',
  title: 'Prepare founder update',
  description:
    'Pull metrics, refine story, and publish the internal recap. This description is intentionally long enough to exceed the collapse threshold so that expand/collapse behavior is triggered correctly in the component.',
  priority: 'High',
  status: 'In Progress',
  dueDate: '2026-04-16T17:00:00.000Z',
  completed: false,
  tags: ['Ops', 'Product'],
};

const shortTask = {
  ...task,
  description: 'Short description.',
};

describe('TaskCard – Stage 1A', () => {
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

  // ── Stage 0 testids still present ──────────────────────────────────────────
  it('renders all Stage 0 required test ids', () => {
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

  // ── Stage 1A new testids ────────────────────────────────────────────────────
  it('renders Stage 1A new test ids', () => {
    render(<TaskCard task={task} />);
    expect(screen.getByTestId('test-todo-priority-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-status-control')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-expand-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-collapsible-section')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-time-remaining')).toBeInTheDocument();
  });

  // ── Edit mode ───────────────────────────────────────────────────────────────
  it('enters edit mode when Edit is clicked', () => {
    render(<TaskCard task={task} />);
    fireEvent.click(screen.getByTestId('test-todo-edit-button'));
    expect(screen.getByTestId('test-todo-edit-form')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-edit-title-input')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-edit-description-input')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-edit-priority-select')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-edit-due-date-input')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-save-button')).toBeInTheDocument();
    expect(screen.getByTestId('test-todo-cancel-button')).toBeInTheDocument();
  });

  it('saves updated values on Save', () => {
    render(<TaskCard task={task} />);
    fireEvent.click(screen.getByTestId('test-todo-edit-button'));

    const titleInput = screen.getByTestId('test-todo-edit-title-input');
    fireEvent.change(titleInput, { target: { value: 'Updated title' } });
    fireEvent.click(screen.getByTestId('test-todo-save-button'));

    expect(screen.getByTestId('test-todo-title')).toHaveTextContent('Updated title');
    expect(screen.queryByTestId('test-todo-edit-form')).not.toBeInTheDocument();
  });

  it('restores previous values on Cancel', () => {
    render(<TaskCard task={task} />);
    fireEvent.click(screen.getByTestId('test-todo-edit-button'));

    const titleInput = screen.getByTestId('test-todo-edit-title-input');
    fireEvent.change(titleInput, { target: { value: 'Discarded title' } });
    fireEvent.click(screen.getByTestId('test-todo-cancel-button'));

    expect(screen.getByTestId('test-todo-title')).toHaveTextContent(task.title);
    expect(screen.queryByTestId('test-todo-edit-form')).not.toBeInTheDocument();
  });

  // ── Status control ──────────────────────────────────────────────────────────
  it('status control buttons change displayed status', () => {
    render(<TaskCard task={task} />);
    const control = screen.getByTestId('test-todo-status-control');
    const doneBtn = Array.from(control.querySelectorAll('button')).find(b => b.textContent === 'Done');
    fireEvent.click(doneBtn);
    expect(screen.getByTestId('test-todo-status')).toHaveTextContent('Done');
  });

  // ── Checkbox ↔ status sync ──────────────────────────────────────────────────
  it('checking the checkbox sets status to Done', () => {
    render(<TaskCard task={task} />);
    fireEvent.click(screen.getByTestId('test-todo-complete-toggle'));
    expect(screen.getByTestId('test-todo-status')).toHaveTextContent('Done');
    expect(screen.getByTestId('test-todo-complete-toggle')).toBeChecked();
  });

  it('unchecking after Done reverts status to Pending', () => {
    render(<TaskCard task={task} />);
    fireEvent.click(screen.getByTestId('test-todo-complete-toggle')); // → Done
    fireEvent.click(screen.getByTestId('test-todo-complete-toggle')); // → Pending
    expect(screen.getByTestId('test-todo-status')).toHaveTextContent('Pending');
    expect(screen.getByTestId('test-todo-complete-toggle')).not.toBeChecked();
  });

  it('setting status to Done via control checks the checkbox', () => {
    render(<TaskCard task={task} />);
    const control = screen.getByTestId('test-todo-status-control');
    const doneBtn = Array.from(control.querySelectorAll('button')).find(b => b.textContent === 'Done');
    fireEvent.click(doneBtn);
    expect(screen.getByTestId('test-todo-complete-toggle')).toBeChecked();
  });

  // ── Time management ─────────────────────────────────────────────────────────
  it('shows "Completed" when status is Done', () => {
    render(<TaskCard task={task} />);
    const control = screen.getByTestId('test-todo-status-control');
    const doneBtn = Array.from(control.querySelectorAll('button')).find(b => b.textContent === 'Done');
    fireEvent.click(doneBtn);
    expect(screen.getByTestId('test-todo-time-remaining')).toHaveTextContent('Completed');
  });

  it('updates relative time text on interval', () => {
    render(<TaskCard task={task} refreshMs={30000} />);
    expect(screen.getByTestId('test-todo-time-remaining')).toHaveTextContent('Due in 3 days');

    act(() => {
      vi.setSystemTime(new Date('2026-04-15T12:00:00.000Z'));
      vi.advanceTimersByTime(30000);
    });

    expect(screen.getByTestId('test-todo-time-remaining')).toHaveTextContent('Due in 29 hours');
  });

  it('shows overdue indicator when past due date', () => {
    vi.setSystemTime(new Date('2026-04-20T00:00:00.000Z'));
    render(<TaskCard task={task} />);
    expect(screen.getByTestId('test-todo-overdue-indicator')).toBeInTheDocument();
  });

  // ── Expand / collapse ───────────────────────────────────────────────────────
  it('shows expand toggle for long descriptions', () => {
    render(<TaskCard task={task} />);
    expect(screen.getByTestId('test-todo-expand-toggle')).toBeInTheDocument();
  });

  it('does not show expand toggle for short descriptions', () => {
    render(<TaskCard task={shortTask} />);
    expect(screen.queryByTestId('test-todo-expand-toggle')).not.toBeInTheDocument();
  });

  it('collapsible section is accessible', () => {
    render(<TaskCard task={task} />);
    expect(screen.getByTestId('test-todo-collapsible-section')).toBeInTheDocument();
  });
});