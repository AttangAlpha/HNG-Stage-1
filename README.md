# Task Card UI – Stage 1A

An advanced, interactive, and stateful evolution of the Stage 0 Task Card. The card now supports editable content, status transitions, priority changes, expand/collapse behavior, richer time handling, and an improved accessibility pattern.

---

## What changed from Stage 0

### New interactive features
- **Edit mode** – Clicking "Edit" renders an inline form with inputs for title, description, priority, and due date. Save commits the changes; Cancel discards them and restores focus to the Edit button.
- **Status control** – A segmented control replaces the read-only status pill for in-place status transitions: `Pending → In Progress → Done`.
- **Checkbox ↔ status sync** – Toggling the checkbox sets status to `Done`; unchecking reverts to `Pending`. Setting status to `Done` via the control also checks the checkbox.
- **Expand/collapse** – Descriptions over 120 characters are collapsed by default. A toggle button (keyboard accessible) reveals the full text and animates the section open/closed.
- **Overdue indicator** – A distinct badge (`data-testid="test-todo-overdue-indicator"`) appears when the due date has passed and status is not `Done`.
- **Priority indicator** – A colored dot/pill (`data-testid="test-todo-priority-indicator"`) provides a visual accent per priority level. A matching accent bar on the card's left edge reinforces this color.
- **Time freeze on Done** – When status is `Done`, the countdown stops updating and displays "Completed" instead of a live relative time.

---

## New design decisions

- **Segmented status control** – Chosen over a `<select>` for immediate visual feedback and because there are only three options. Each option has an `aria-pressed` attribute for screen reader clarity.
- **Inline edit form** – The form appears inside the card rather than in a modal or separate page. This keeps context visible while editing and avoids focus-trap complexity for a demo card. The form animates in with a subtle `fadeSlide` CSS animation.
- **Priority accent bar** – A 4 px left border on the card changes color (`#6bceff` / `#ffc96b` / `#ff5e5e`) based on priority, providing an at-a-glance signal without cluttering the header area.
- **CSS-grid collapsible** – `grid-template-rows: 0fr → 1fr` provides a smooth height animation without JavaScript-measured heights or `max-height` hacks.
- **Focus management** – After Save or Cancel, focus is returned to the Edit button via `setTimeout(() => ref.current?.focus(), 0)` to satisfy WCAG 2.4.3 (Focus Order).
- **Syne + DM Sans** – The existing design was extended with `Syne` (headings) for a distinct editorial feel, paired with `DM Sans` for body text readability.

---

## Project structure (updated)

```text
src/
  components/
    TaskCard.jsx          ← Stage 1A (self-contained with inline styles)
    TaskActions.jsx       ← Stage 0 (retained)
    TaskDescription.jsx   ← Stage 0 (retained, logic merged into TaskCard)
    TaskHeader.jsx        ← Stage 0 (retained)
    TaskSchedule.jsx      ← Stage 0 (retained)
    TaskTags.jsx          ← Stage 0 (retained)
  data/
    taskData.js
  utils/
    time.js
  __tests__/
    TaskCard.test.jsx     ← Stage 1A (updated)
  App.jsx
  main.jsx
  styles.css
```

> The Stage 1A card is delivered as a **single self-contained file** (`TaskCard_Stage1A.jsx`). Inline styles are scoped via a `<style>` tag injected once, keeping the component portable without a build-step CSS dependency. For production integration, extract the `css` string into a `.css` or `.module.css` file.

---

## New required `data-testid` elements

| Element | `data-testid` |
|---|---|
| Edit form container | `test-todo-edit-form` |
| Title input | `test-todo-edit-title-input` |
| Description textarea | `test-todo-edit-description-input` |
| Priority select | `test-todo-edit-priority-select` |
| Due date input | `test-todo-edit-due-date-input` |
| Save button | `test-todo-save-button` |
| Cancel button | `test-todo-cancel-button` |
| Status segmented control | `test-todo-status-control` |
| Priority visual indicator | `test-todo-priority-indicator` |
| Expand/collapse toggle | `test-todo-expand-toggle` |
| Collapsible container | `test-todo-collapsible-section` |
| Overdue badge | `test-todo-overdue-indicator` |

All Stage 0 `data-testid` attributes are preserved.

---

## Accessibility notes

- **Focus management** – Edit → Save/Cancel returns focus to the Edit button. The edit form uses `aria-label="Edit task"` and `role="dialog"`.
- **Escape key** – Pressing `Escape` inside the edit form cancels editing and returns focus.
- **Status control** – Each button carries `aria-pressed` to convey the active state to screen readers.
- **Expand toggle** – Uses `aria-expanded` and `aria-controls` pointing to the collapsible section's `id`.
- **Overdue time** – The countdown `<time>` element has `aria-live="polite"` so updates are announced without interrupting the user.
- **Checkbox** – Uses a real `<input type="checkbox">` with `aria-label` inside a `<label>`.
- **Card root** – The `<article>` uses `aria-labelledby` pointing to the heading id.

---

## Known limitations

- **No focus trap in edit form** – Focus is not fully trapped inside the edit form (bonus requirement). Tabbing can leave the form. A production app should use a focus trap utility.
- **Single card** – The demo still renders one card; status/edit state is local only.
- **Tag editing not supported** – Tags are read-only in Stage 1A.
- **Inline styles** – For portability the CSS lives in a `<style>` tag; in a real project it should be extracted.
- **`datetime-local` input format** – The due date input is set from an ISO string sliced to 16 chars. Timezone offset may shift the displayed value by the user's UTC offset. In production, handle this via a date-picker library or explicit timezone awareness.

---

## How to run

```bash
npm install
npm run dev       # dev server
npm test          # run tests once
npm run test:watch
```

---

## Test coverage (Stage 1A)

- All Stage 0 testids still render
- All new Stage 1A testids render
- Edit mode opens with correct form fields
- Save commits new values
- Cancel discards changes
- Checkbox → status sync (both directions)
- Status control → checkbox sync
- "Completed" shown when Done
- Relative time updates on interval
- Overdue indicator visible when past due
- Expand toggle present for long descriptions only
- Collapsible section present in DOM