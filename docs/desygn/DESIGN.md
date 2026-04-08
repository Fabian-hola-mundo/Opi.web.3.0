# The Design System: Enterprise Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Architect."** 

In the enterprise space, "modern" often slides into "clinical." We are moving in the opposite direction. This system is designed to feel like a high-end editorial publication—structured and authoritative, yet fluid and energetic. We break the "SaaS template" look by utilizing intentional asymmetry, overlapping elements, and high-contrast typography scales. The goal is to move beyond the grid to create a sense of momentum, reflecting a business that is constantly evolving.

### The Signature Experience
*   **Architectural Rigor:** Strong vertical alignments contrasted with horizontal bleeding elements.
*   **Kinetic Accents:** Use of the signature Orange-to-Purple gradient to draw the eye toward "the next step."
*   **Dark-Mode Foundation:** Dark Charcoal surfaces provide a premium, "Executive Suite" feel for navigation and hero moments.

---

## 2. Colors & Tonal Depth

This system avoids the "flat box" look by utilizing a sophisticated Material-based palette and strict rules on boundary definition.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off content. 
Boundaries must be defined solely through background color shifts. Use `surface-container-low` sections sitting on a `surface` background. If you feel the need to draw a line, you have failed to use the tonal scale correctly.

### Surface Hierarchy & Nesting
Treat the UI as physical layers—stacked sheets of frosted glass or fine paper.
*   **Base:** `surface` (#fcf8f9)
*   **Level 1 (Nesting):** `surface-container-low` (#f6f3f4)
*   **Level 2 (Interaction/Cards):** `surface-container-lowest` (#ffffff)
*   **Level 3 (Elevated):** `surface-container-high` (#eae7e8)

### The "Glass & Gradient" Rule
To inject "soul" into enterprise data:
*   **Glassmorphism:** For floating menus or navigation over hero sections, use `surface` at 80% opacity with a `20px` backdrop blur.
*   **Signature Gradient:** Transitions from `secondary_container` (#fc9d23) to `primary_container` (#7d3693). Use this for progress bars, primary CTAs, and thin (2px) top-borders on "Featured" cards.

---

## 3. Typography: Editorial Authority

We use a tri-font system to separate "The Message" from "The Data."

| Level | Token | Font Family | Size | Weight | Character |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Inter | 3.5rem | Bold | High-impact, Swiss-style clarity. |
| **Headline**| `headline-md` | Inter | 1.75rem | Semibold | Direct, professional, no-nonsense. |
| **Title**   | `title-lg` | Work Sans | 1.375rem | Medium | Softens the tech-heavy Inter headers. |
| **Body**    | `body-md` | Work Sans | 0.875rem | Regular | Highly legible for long-form reports. |
| **Label**   | `label-md` | Plus Jakarta | 0.75rem | Medium | Geometric and modern for UI controls. |

**The Typography Strategy:** Use `Inter` for "Decision Moments" (Headings) and `Work Sans` for "Information Context" (Body). This creates a rhythmic shift between reading and acting.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional structural lines.

*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift.
*   **Ambient Shadows:** For floating elements (Modals/Popovers), use an extra-diffused shadow: `0px 12px 32px rgba(27, 27, 28, 0.06)`. Note the tint: we use the `on-surface` color (#1b1b1c) rather than pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token (#d1c2d0) at **15% opacity**. Never 100%.
*   **Corner Radii:** Maintain a tight, structured feel with `DEFAULT` (4px) for small components and `lg` (8px) for cards.

---

## 5. Components

### Buttons: The Kinetic Drivers
*   **Primary:** Uses the Orange-to-Purple gradient. Text: `label-md` in `on-primary` (#ffffff). No border.
*   **Secondary:** `surface-container-lowest` with a "Ghost Border."
*   **Tertiary:** Ghost button, `primary` (#631b7a) text, underline on hover only.

### Cards: The Content Vessels
*   **Rule:** Forbid the use of divider lines within cards.
*   **Implementation:** Separate the header and body of a card using a 24px `spacing-xl` vertical gap or a subtle shift from `surface-container-lowest` (header) to `surface-container` (footer).

### Input Fields: Professional Clarity
*   **State:** Default uses `surface-container-highest` background.
*   **Active:** Transitions to a 2px bottom-border only, using the `primary` (#631b7a) color.
*   **Validation:** Error states use `error` (#ba1a1a) text with a `error_container` (#ffdad6) soft background wash.

### Navigation: The Dark Core
*   **Hero & Nav:** Must use `inverse_surface` (#303031). Text must be `inverse_on_surface` (#f3f0f1). This creates a heavy "anchor" for the top of the experience, signifying enterprise stability.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. If the left margin is 80px, try a 120px right margin for editorial layouts.
*   **Do** use the `secondary_fixed` (#ffdcbd) as a background "wash" for highlighting important insights within a page.
*   **Do** use large, bold `display-lg` type that occasionally overlaps background elements or container edges.

### Don’t
*   **Don’t** use shadows on every card. If everything floats, nothing is important. Use tonal shifts by default.
*   **Don’t** use icons as purely decorative elements. Every icon must have a functional `label-sm` or direct action.
*   **Don’t** use the signature gradient for more than two elements on a single screen. It is a "signature," not a wallpaper.
*   **Don't** ever use 100% black (#000000) for text. Use `on-surface` (#1b1b1c) to maintain a premium, ink-on-paper feel.