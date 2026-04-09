import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'opi-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="badge"
      [class.color-primary]="color() === 'primary'"
      [class.color-secondary]="color() === 'secondary'"
    >{{ text() }}</span>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      border-radius: var(--radius-full);
      padding: 4px 12px;
      font-size: var(--font-label);
      font-weight: var(--font-weight-semibold);
      font-family: var(--font-family-sans);
      line-height: 1.4;
      white-space: nowrap;
    }

    .color-primary {
      background: rgba(99, 27, 122, 0.15);
      color: var(--color-primary-container);
      border: 1px solid rgba(99, 27, 122, 0.3);
    }

    .color-secondary {
      background: rgba(252, 157, 35, 0.15);
      color: var(--color-secondary);
      border: 1px solid rgba(252, 157, 35, 0.3);
    }
  `],
})
export class OpiBadgeComponent {
  readonly text = input.required<string>();
  readonly color = input<'primary' | 'secondary'>('secondary');
}
