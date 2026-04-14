const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

function getSafeDate(input) {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date provided.');
  }
  return date;
}

export function formatDueDate(input) {
  const date = getSafeDate(input);
  return `Due ${DATE_FORMATTER.format(date)}`;
}

export function formatTimeRemaining(input, now = new Date()) {
  const dueDate = getSafeDate(input);
  const current = getSafeDate(now);
  const diffMs = dueDate.getTime() - current.getTime();
  const isPast = diffMs < 0;
  const absMs = Math.abs(diffMs);

  const minutes = Math.round(absMs / (1000 * 60));
  const hours = Math.round(absMs / (1000 * 60 * 60));
  const days = Math.round(absMs / (1000 * 60 * 60 * 24));

  const labelPrefix = isPast ? 'Overdue by' : 'Due in';

  if (minutes < 60) {
    const unit = minutes === 1 ? 'minute' : 'minutes';
    return `${labelPrefix} ${minutes} ${unit}`;
  }

  if (hours < 48) {
    const unit = hours === 1 ? 'hour' : 'hours';
    return `${labelPrefix} ${hours} ${unit}`;
  }

  const unit = days === 1 ? 'day' : 'days';
  return `${labelPrefix} ${days} ${unit}`;
}

export function isOverdue(input, now = new Date()) {
  return getSafeDate(input).getTime() < getSafeDate(now).getTime();
}