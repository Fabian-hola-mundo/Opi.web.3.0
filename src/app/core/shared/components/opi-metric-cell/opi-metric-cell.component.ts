import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CountUpDirective } from '../../directives/count-up.directive';
import { InViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'opi-metric-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CountUpDirective, InViewDirective],
  template: `
    <div appInView class="metric-cell fade-in-up" [class.span-2]="span() === 2">
      <span class="metric-value">
        <span appCountUp [countUpTo]="value()"></span>{{ suffix() }}
      </span>
      <span class="metric-label">{{ label() }}</span>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .metric-cell {
      background-color: var(--color-inverse-surface);
      color: var(--color-inverse-on-surface);
      border-radius: var(--radius-lg);
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      text-align: center;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;

      &.in-view {
        opacity: 1;
        transform: translateY(0);
      }

      &.span-2 {
        grid-column: span 2;
      }
    }

    .metric-value {
      font-family: var(--font-family-sans);
      font-size: var(--font-display-md);
      font-weight: var(--font-weight-bold);
      line-height: var(--lh-heading);
      color: var(--color-secondary);
      display: flex;
      align-items: baseline;
      gap: 0.1em;
    }

    .metric-label {
      font-family: var(--font-family-sans);
      font-size: var(--font-body-sm);
      font-weight: var(--font-weight-regular);
      line-height: var(--lh-body);
      color: var(--color-inverse-on-surface);
      opacity: 0.75;
    }
  `],
})
export class OpiMetricCellComponent {
  readonly value = input.required<number>();
  readonly label = input.required<string>();
  readonly suffix = input<string>('');
  readonly span = input<1 | 2>(1);
}
