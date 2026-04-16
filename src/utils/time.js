const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function getSafeDate(input) {
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date");
  return d;
}

export function formatDueDate(input) {
  return `Due ${DATE_FMT.format(getSafeDate(input))}`;
}

export function formatTimeRemaining(input, now = new Date(), status) {
  if (status === "Done") return "Completed";
  const due = getSafeDate(input);
  const cur = getSafeDate(now);
  const diffMs = due.getTime() - cur.getTime();
  const isPast = diffMs < 0;
  const absMs = Math.abs(diffMs);
  const minutes = Math.round(absMs / 60000);
  const hours = Math.round(absMs / 3600000);
  const days = Math.round(absMs / 86400000);
  const prefix = isPast ? "Overdue by" : "Due in";
  if (minutes < 60) return `${prefix} ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  if (hours < 48) return `${prefix} ${hours} ${hours === 1 ? "hour" : "hours"}`;
  return `${prefix} ${days} ${days === 1 ? "day" : "days"}`;
}

export function isOverdue(input, now = new Date()) {
  return getSafeDate(input).getTime() < getSafeDate(now).getTime();
}