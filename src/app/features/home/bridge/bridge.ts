import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bridge',
  imports: [RouterLink],
  templateUrl: './bridge.html',
  styleUrl: './bridge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-focused]': 'isFocused()',
    id: 'bridge',
  },
})
export class BridgeComponent {
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * True when the section is substantially centered in the viewport.
   * Drives the "clarity" CSS transition on the headline.
   */
  protected readonly isFocused = signal(false);

  constructor() {
    afterNextRender(() => {
      // Threshold 0.4: fires when 40% of the section is visible —
      // the text is roughly centered when this triggers.
      const observer = new IntersectionObserver(
        ([entry]) => this.isFocused.set(entry.isIntersecting),
        { threshold: 0.35 }
      );
      observer.observe(this.el.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
