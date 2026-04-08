import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

/**
 * Adds `.is-revealed` to the host element when it enters the viewport.
 * Unobserves after first reveal (fire-once pattern).
 *
 * Usage:
 *   <div appReveal>...</div>
 *   <div appReveal [revealDelay]="200">...</div>
 *
 * CSS contract: pair with `.reveal-target` utility class that defines
 * the initial (hidden) state. `.is-revealed` triggers the transition.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal-target',
  },
})
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Optional delay in ms before the reveal animation starts. */
  readonly revealDelay = input<number>(0);

  constructor() {
    afterNextRender(() => {
      const element = this.el.nativeElement;
      const delay = this.revealDelay();

      if (delay > 0) {
        element.style.transitionDelay = `${delay}ms`;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element.classList.add('is-revealed');
              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      observer.observe(element);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
