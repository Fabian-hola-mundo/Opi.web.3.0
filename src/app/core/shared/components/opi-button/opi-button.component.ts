import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'opi-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'opi-btn-host' },
  template: `
    @if (href()) {
      <a
        [href]="href()"
        class="opi-btn"
        [class.variant-primary]="variant() === 'primary'"
        [class.variant-secondary]="variant() === 'secondary'"
        [class.variant-ghost]="variant() === 'ghost'"
      >{{ label() }}</a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled()"
        class="opi-btn"
        [class.variant-primary]="variant() === 'primary'"
        [class.variant-secondary]="variant() === 'secondary'"
        [class.variant-ghost]="variant() === 'ghost'"
      >{{ label() }}</button>
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
    }

    .opi-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 28px;
      border-radius: var(--radius-full);
      font-family: var(--font-family-sans);
      font-size: var(--font-body-md);
      font-weight: var(--font-weight-semibold);
      line-height: 1;
      text-decoration: none;
      cursor: pointer;
      border: none;
      outline: none;
      transition: all 0.25s ease;
      white-space: nowrap;

      &:hover {
        transform: scale(1.02);
      }

      &:active {
        transform: scale(0.98);
      }

      &:focus-visible {
        outline: 2px solid var(--color-secondary);
        outline-offset: 3px;
      }

      &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        transform: none;
      }
    }

    .variant-primary {
      background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
      color: #ffffff;
      border: none;

      &:hover:not(:disabled) {
        box-shadow: var(--shadow-glow-primary);
      }
    }

    .variant-secondary {
      background: transparent;
      color: var(--color-secondary);
      border: 1px solid var(--color-secondary);

      &:hover:not(:disabled) {
        background: rgba(252, 157, 35, 0.08);
      }
    }

    .variant-ghost {
      background: transparent;
      color: var(--color-on-surface);
      border: none;

      &:hover:not(:disabled) {
        background: var(--color-surface-high);
      }
    }
  `],
})
export class OpiButtonComponent {
  readonly label = input.required<string>();
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  readonly href = input<string | undefined>(undefined);
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
}
