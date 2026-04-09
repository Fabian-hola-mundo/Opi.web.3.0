import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'opi-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="accordion-item" [class.open]="isOpen()">
      <button
        class="accordion-header"
        type="button"
        (click)="toggled.emit()"
        [attr.aria-expanded]="isOpen()"
      >
        <span class="accordion-title">{{ title() }}</span>
        <svg
          class="chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      @if (isOpen()) {
        <div class="accordion-body" role="region">
          {{ content() }}
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .accordion-item {
      border-bottom: 1px solid var(--color-outline-variant);
    }

    .accordion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--space-6) 0;
      background: none;
      border: none;
      cursor: pointer;
      gap: var(--space-4);
      text-align: left;
      color: var(--color-on-surface);
      font-family: var(--font-family-sans);
      font-size: var(--font-body-lg);
      font-weight: var(--font-weight-semibold);
      line-height: var(--lh-tight);
      transition: color var(--transition-fast);

      &:focus-visible {
        outline: 2px solid var(--color-secondary);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }

      &:hover {
        color: var(--color-secondary);
      }
    }

    .accordion-title {
      flex: 1;
    }

    .chevron {
      flex-shrink: 0;
      transition: transform 0.25s ease;
      color: var(--color-secondary);
    }

    .accordion-item.open .chevron {
      transform: rotate(180deg);
    }

    .accordion-body {
      padding: 0 0 var(--space-6);
      font-family: var(--font-family-sans);
      font-size: var(--font-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--lh-body);
      color: var(--color-on-surface);
      opacity: 0.75;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 0.75; transform: translateY(0); }
    }
  `],
})
export class OpiAccordionItemComponent {
  readonly title = input.required<string>();
  readonly content = input.required<string>();
  readonly isOpen = input.required<boolean>();
  readonly toggled = output<void>();
}
