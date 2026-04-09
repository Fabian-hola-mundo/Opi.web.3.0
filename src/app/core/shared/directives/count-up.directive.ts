import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements OnInit, OnDestroy {
  readonly countUpTo = input.required<number>();
  readonly duration = input(1500);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private animationFrameId?: number;

  ngOnInit(): void {
    const target = this.countUpTo();
    const el = this.el.nativeElement;

    if (!isPlatformBrowser(this.platformId)) {
      el.textContent = target.toLocaleString();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.observer?.disconnect();
          this.animate(target);
        }
      },
      { threshold: 0.3 },
    );

    this.observer.observe(el);
  }

  private animate(target: number): void {
    const start = performance.now();
    const dur = this.duration();
    const el = this.el.nativeElement;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / dur, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
