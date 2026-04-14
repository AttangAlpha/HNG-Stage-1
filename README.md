# Task Card UI

A clean, high-fidelity React task card built as a small component system for a productivity app. The UI is intentionally more alive than a standard card, with subtle motion, layered surfaces, live time updates, and clear semantic structure.

## What is included

- Reusable React components for the card layout
- A separate data file that acts as the core UI source
- Semantic markup with the required `data-testid` mappings
- Live due-date and time-remaining formatting
- Basic tests with React Testing Library and Vitest

## Project structure

```text
src/
  components/
    TaskActions.jsx
    TaskCard.jsx
    TaskDescription.jsx
    TaskHeader.jsx
    TaskSchedule.jsx
    TaskTags.jsx
  data/
    taskData.js
  utils/
    time.js
  __tests__/
    TaskCard.test.jsx
  App.jsx
  main.jsx
  styles.css
```

## How to run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal.

## How to run tests

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

## Decisions made

- **Separate components:** The card is broken into focused pieces so the layout is easier to evolve inside a real app.
- **Dedicated data layer:** `taskData.js` keeps the card data-driven and easy to swap with API data later.
- **Semantic HTML first:** The root uses `<article>`, text uses heading and paragraph tags, due data uses `<time>`, the checkbox is a real `<input type="checkbox">`, and tags are rendered as a list.
- **Live time updates:** Relative time updates on an interval so the hints stay accurate without a manual refresh.
- **High-fidelity feel without heavy libraries:** The polished look comes from CSS only, which keeps the component light and portable.

## Trade-offs

- **Local state only:** Edit and delete currently use placeholder actions instead of a parent-managed data flow. This keeps the demo focused on UI structure.
- **Single-card demo:** The page shows one standout card rather than a full task board to keep the deliverable tight.
- **Approximate relative time buckets:** The relative time formatting uses rounded minutes, hours, and days for readable labels instead of second-by-second precision.
- **No animation library:** Motion is subtle and CSS-based. A production app might use a motion library for richer transitions.

## Test coverage

The tests verify:

- All required test IDs render correctly
- The completion checkbox toggles
- The relative time text refreshes over time

## Notes

The sample due date is set to a fixed value so the tests stay predictable. In a real app, you would likely pass the task from server data and keep the refresh interval at 30 to 60 seconds.
