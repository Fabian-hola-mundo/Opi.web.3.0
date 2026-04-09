import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'opi-logo-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <div class="logo-tile">
      <img
        [ngSrc]="src()"
        [alt]="alt()"
        [width]="width()"
        [height]="height()"
      />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .logo-tile {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-4);
      opacity: 0.7;
      transition: opacity 0.25s ease, filter 0.25s ease;

      img {
        display: block;
        max-width: 100%;
        height: auto;
        filter: grayscale(1);
        transition: filter 0.25s ease;
      }

      &:hover {
        opacity: 1;

        img {
          filter: grayscale(0);
        }
      }
    }
  `],
})
export class OpiLogoTileComponent {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly width = input.required<number>();
  readonly height = input.required<number>();
}
