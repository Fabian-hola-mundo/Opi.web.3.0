import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'opi-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="card"
      [style.border-left]="accentColor() ? '3px solid ' + accentColor() : null"
    >
      @if (icon()) {
        <div class="card-icon" aria-hidden="true">{{ icon() }}</div>
      }
      <h3 class="card-title">{{ title() }}</h3>
      <p class="card-body">{{ body() }}</p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .card {
      border-radius: var(--radius-lg);
      background-color: var(--color-surface-high);
      padding: var(--space-8);
      box-shadow: var(--shadow-md);
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      transition: box-shadow var(--transition-base), transform var(--transition-base);

      &:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
      }
    }

    .card-icon {
      font-size: 2rem;
      line-height: 1;
      flex-shrink: 0;
    }

    .card-title {
      font-family: var(--font-family-sans);
      font-size: var(--font-display-sm);
      font-weight: var(--font-weight-bold);
      line-height: var(--lh-tight);
      color: var(--color-on-surface);
      margin: 0;
    }

    .card-body {
      font-family: var(--font-family-sans);
      font-size: var(--font-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--lh-body);
      color: var(--color-on-surface);
      opacity: 0.75;
      margin: 0;
      flex: 1;
    }
  `],
})
export class OpiCardComponent {
  readonly title = input.required<string>();
  readonly body = input.required<string>();
  readonly accentColor = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
}
