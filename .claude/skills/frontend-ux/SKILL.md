---
name: "Frontend Developer & UI/UX Expert"
description: "Expert Angular 21 frontend development with UI/UX design principles. Use when building components, designing screens, implementing layouts, improving accessibility, applying design systems, or any task involving visual design, user experience, interaction patterns, or Angular standalone component architecture with signals."
---

# Frontend Developer & UI/UX Expert

## What This Skill Does

Guides the development of Angular 21 standalone components following best-in-class UI/UX principles: visual hierarchy, accessibility (WCAG AA), motion design, color theory, and responsive layouts — all aligned with this project's architecture (signals, OnPush, SSR-safe, no NgModules).

---

## Project Stack Quick Reference

| Concern | Solution |
|---|---|
| Framework | Angular 21 standalone (NO NgModules) |
| State | Signals: `signal()`, `computed()`, `effect()` |
| Change Detection | `ChangeDetectionStrategy.OnPush` (always) |
| Styling | Per-component SCSS + global `styles.scss` |
| Images | `NgOptimizedImage` (never raw `<img>` for static) |
| Control Flow | `@if`, `@for`, `@switch` (never `*ngIf`/`*ngFor`) |
| DI | `inject()` inside constructor/function (never param injection) |
| Host bindings | `host: {}` in decorator (never `@HostBinding`/`@HostListener`) |
| Class binding | `[class.foo]` (never `ngClass`) |
| Style binding | `[style.foo]` (never `ngStyle`) |
| Inputs/Outputs | `input()` / `output()` functions (never `@Input`/`@Output`) |
| Forms | Reactive Forms only |
| Testing | Vitest + jsdom |
| i18n | Angular i18n (`$localize`) |
| A11y | Must pass all AXE checks, WCAG AA minimum |

---

## UI/UX Principles to Apply Always

### Visual Hierarchy
- Use size, weight, and color contrast to direct attention
- One primary action per screen/section; secondary actions visually subordinate
- Whitespace is intentional — group related elements, separate unrelated ones

### Color & Contrast
- Text on background: minimum 4.5:1 ratio (WCAG AA)
- Large text (18px+ or 14px bold): minimum 3:1 ratio
- Interactive elements: visible focus indicator with 3:1 contrast against adjacent colors
- Never convey information by color alone

### Typography
- Limit to 2–3 type scales per view
- Line height: 1.4–1.6 for body text
- Max line length: 60–80 characters for readability

### Motion & Animation
- Purpose: guide attention, confirm actions, communicate state
- Duration: 150–300ms for micro-interactions, 300–500ms for transitions
- Respect `prefers-reduced-motion` — always provide a no-motion fallback
- Use CSS `@media (prefers-reduced-motion: reduce)` or Angular CDK

### Responsive Design
- Mobile-first: design the smallest viewport first, then expand
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Touch targets: minimum 44×44px (iOS HIG / WCAG 2.5.5)
- Avoid hover-only interactions (no touch equivalent)

### Feedback & States
Every interactive element must have all 5 states styled:
1. **Default** — normal resting state
2. **Hover** — desktop pointer affordance
3. **Focus** — keyboard navigation (visible outline, never `outline: none` without replacement)
4. **Active/Pressed** — click/tap feedback
5. **Disabled** — low opacity + `cursor: not-allowed` + `aria-disabled`

---

## Angular Component Checklist

When creating or modifying a component:

- [ ] `standalone: true` is NOT in the decorator (default in v20+)
- [ ] `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] State via `signal()`, derived state via `computed()`
- [ ] `inject()` used for DI (not constructor params)
- [ ] Host events/bindings in `host: {}` object
- [ ] SCSS scoped to component; no global style leakage
- [ ] `NgOptimizedImage` for any static image
- [ ] Native control flow: `@if`, `@for`, `@switch`
- [ ] `[class.x]` instead of `ngClass`
- [ ] `[style.x]` instead of `ngStyle`
- [ ] All interactive elements have aria labels/roles
- [ ] Focus management correct for modals/drawers
- [ ] SSR-safe: no direct `window`/`document` access without guards
- [ ] `prefers-reduced-motion` respected in any CSS animation

---

## Accessibility (AXE/WCAG AA) Requirements

### Mandatory
- `<img>` must have descriptive `alt` (empty `alt=""` for decorative images)
- Form inputs must have associated `<label>` (or `aria-label`)
- Buttons must have accessible name (text content or `aria-label`)
- Color contrast meets minimums (use browser DevTools or axe extension to verify)
- Skip navigation link at top of page for keyboard users
- Focus trap in modal dialogs (`cdkTrapFocus` or custom)
- `role`, `aria-expanded`, `aria-selected`, `aria-current` on custom interactive widgets
- Heading hierarchy: one `<h1>` per page, logical `h2`→`h3` nesting

### ARIA Quick Reference
```html
<!-- Button that opens something -->
<button [attr.aria-expanded]="isOpen()" aria-controls="menu-id">Menu</button>

<!-- Live region for dynamic content -->
<div aria-live="polite" aria-atomic="true">{{ statusMessage() }}</div>

<!-- Decorative icon -->
<svg aria-hidden="true" focusable="false">...</svg>

<!-- Icon-only button -->
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>
```

---

## Component Patterns

### Signal-based state example
```typescript
@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {
  private readonly service = inject(ExampleService);

  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(v => v + 1);
  }
}
```

### Template control flow
```html
@if (isLoading()) {
  <app-skeleton />
} @else if (items().length === 0) {
  <p i18n>No items found.</p>
} @else {
  @for (item of items(); track item.id) {
    <app-item [data]="item" />
  }
}
```

### SCSS with motion guard
```scss
.card {
  transform: translateY(0);
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
```

---

## Design Token Conventions (project SCSS)

Use CSS custom properties defined in `src/styles.scss`. When adding new design values, add them as tokens there — not as magic numbers inside component SCSS.

```scss
// Prefer
color: var(--color-primary);
border-radius: var(--radius-md);

// Avoid
color: #4f46e5;
border-radius: 8px;
```

---

## Troubleshooting

### AXE violation: "Elements must have sufficient color contrast"
- Use the browser's DevTools contrast checker or the axe DevTools extension
- Adjust lightness values in your color token until ratio ≥ 4.5:1

### SSR errors: "window is not defined"
```typescript
// Guard browser-only code
import { isPlatformBrowser } from '@angular/common';
const platformId = inject(PLATFORM_ID);
if (isPlatformBrowser(platformId)) {
  // safe to use window/document
}
```

### Focus ring disappearing
- Never use `outline: none` without replacing with a visible alternative
- Use `:focus-visible` to show outline only for keyboard users:
```scss
&:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Component not detecting changes
- Ensure all state is wrapped in `signal()`
- Inputs passed from parent must be signals or the parent must trigger CD
- Avoid mutating objects/arrays directly — use `signal.update()`

---

## Related Resources

- [Angular Signals](https://angular.dev/guide/signals)
- [Angular Accessibility](https://angular.dev/guide/accessibility)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Material Design 3](https://m3.material.io/) — reference for interaction patterns
- [Inclusive Components](https://inclusive-components.design/) — ARIA pattern library
