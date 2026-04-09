import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CountUpDirective } from '../../directives/count-up.directive';
import { InViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'opi-metric-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountUpDirective, InViewDirective],
  template: `
    <article appInView class="metric-card fade-in-up">
      <p class="metric-value">
        <!-- Static value for screen readers (no animation interference) -->
        <span class="sr-only">{{ value() }}{{ suffix() }}</span>
        <!-- Animated count-up, hidden from a11y tree -->
        <span aria-hidden="true">
          <span appCountUp [countUpTo]="value()"></span>{{ suffix() }}
        </span>
      </p>

      <p class="metric-label">{{ label() }}</p>

      @if (description()) {
        <p class="metric-description">{{ description() }}</p>
      }
    </article>
  `,
  styles: [`
    :host {
      display: block;
      scroll-snap-align: start;
    }

    .metric-card {
      height: 100%;
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);

      // ── Entrance animation ──
      opacity: 0;
      transform: translateY(16px);
      transition:
        opacity 0.45s calc(var(--card-index, 0) * 70ms) ease,
        transform 0.45s calc(var(--card-index, 0) * 70ms) ease;

      &.in-view {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
        opacity: 1;
        transform: none;
      }
    }

    // ── Number ──────────────────────────────────────────────────────────────
    .metric-value {
      font-family: var(--font-family-sans);
      font-size: var(--font-display-lg);
      font-weight: var(--font-weight-bold);
      line-height: var(--lh-heading);
      letter-spacing: -0.03em;
      color: var(--color-on-surface);
      margin: 0;
    }

    // ── Uppercase label in accent color ─────────────────────────────────────
    .metric-label {
      font-family: var(--font-family-sans);
      font-size: var(--font-label);
      font-weight: var(--font-weight-semibold);
      line-height: var(--lh-tight);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-secondary);
      margin: 0;
    }

    // ── Description ─────────────────────────────────────────────────────────
    .metric-description {
      font-family: var(--font-family-sans);
      font-size: var(--font-body-sm);
      font-weight: var(--font-weight-regular);
      line-height: var(--lh-body);
      color: var(--color-on-surface);
      opacity: 0.65;
      margin: 0;
    }

    // ── Screen reader only ──────────────────────────────────────────────────
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `],
})
export class OpiMetricCellComponent {
  readonly value       = input.required<number>();
  readonly label       = input.required<string>();
  readonly suffix      = input<string>('');
  readonly description = input<string>('');
}
