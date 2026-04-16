export const INITIAL_TASK = {
  id: "task-launch-readme",
  title: "Ship onboarding flow polish",
  description:
    "Refine the empty states, tighten copy, and prep a clickable demo for the investor update. The card is designed to feel active, focused, and slightly premium. This extended description should trigger the expand/collapse behavior because it is longer than the threshold.",
  priority: "High",
  status: "In Progress",
  dueDate: "2026-04-16T18:00:00+01:00",
  completed: false,
  tags: ["Design System", "Frontend", "Launch"],
};

export const PRIORITY_CONFIG = {
  Low:    { color: "#6bceff", bg: "rgba(107,206,255,0.13)", border: "rgba(107,206,255,0.28)", dot: "#6bceff" },
  Medium: { color: "#ffc96b", bg: "rgba(255,201,107,0.13)", border: "rgba(255,201,107,0.28)", dot: "#ffc96b" },
  High:   { color: "#ff8585", bg: "rgba(255,133,133,0.15)", border: "rgba(255,133,133,0.32)", dot: "#ff5e5e" },
};

export const STATUS_CONFIG = {
  Pending:       { color: "#9fb4d8", bg: "rgba(159,180,216,0.12)", border: "rgba(159,180,216,0.22)" },
  "In Progress": { color: "#89f2ce", bg: "rgba(56,211,159,0.14)",  border: "rgba(56,211,159,0.24)"  },
  Done:          { color: "#b8a4ff", bg: "rgba(148,108,255,0.14)", border: "rgba(148,108,255,0.28)" },
};

export const COLLAPSE_THRESHOLD = 120;