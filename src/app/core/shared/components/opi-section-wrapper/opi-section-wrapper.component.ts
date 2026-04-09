import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'opi-section-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InViewDirective],
  template: `
    <section
      [id]="sectionId()"
      appInView
      class="section-wrapper fade-in"
      [class.theme-inverse]="theme() === 'inverse'"
      [class.theme-low]="theme() === 'low'"
      [class.padding-large]="paddingScale() === 'large'"
    >
      <div class="container">
        <ng-content />
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .section-wrapper {
      padding-block: var(--section-py);
      background-color: var(--color-surface);
      opacity: 0;
      transition: opacity 0.6s ease;

      &.in-view {
        opacity: 1;
      }

      &.theme-inverse {
        background-color: var(--color-inverse-surface);
        color: var(--color-inverse-on-surface);
      }

      &.theme-low {
        background-color: var(--color-surface-low);
      }

      &.padding-large {
        padding-block: calc(var(--section-py) * 1.5);
      }
    }

    .container {
      max-width: var(--container-max);
      margin-inline: auto;
      padding-inline: var(--section-px);
    }
  `],
})
export class OpiSectionWrapperComponent {
  readonly sectionId = input.required<string>();
  readonly theme = input<'default' | 'inverse' | 'low'>('default');
  readonly paddingScale = input<'normal' | 'large'>('normal');
}
