import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

// ---------------------------------------------------------------------------
// Replace with OPI's official WhatsApp number (format: country code + number,
// no '+', no spaces). E.g. Colombia (+57) → '573001234567'
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = '573000000000';

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola OPI, me gustaría agendar una sesión de diagnóstico. ' +
  'Mi nombre es [Nombre] y trabajo en [Empresa / Cargo]. ' +
  'El desafío que tenemos es [Problema].',
);

const WHATSAPP_HREF =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

@Component({
  selector: 'app-whatsapp-float',
  templateUrl: './whatsapp-float.html',
  styleUrl: './whatsapp-float.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true', // the <a> inside carries all a11y semantics
  },
})
export class WhatsappFloatComponent {
  private readonly destroyRef = inject(DestroyRef);

  /** Drives the CSS visibility — true once the Hero has scrolled out of view. */
  protected readonly isVisible = signal(false);

  protected readonly href = WHATSAPP_HREF;

  constructor() {
    afterNextRender(() => {
      const hero = document.getElementById('hero');

      if (!hero) {
        // Fallback: show immediately if hero element is not found.
        this.isVisible.set(true);
        return;
      }

      // IntersectionObserver: button appears when hero exits the viewport.
      const observer = new IntersectionObserver(
        ([entry]) => this.isVisible.set(entry.intersectionRatio < 0.9),
        {
          // Fire when hero drops below 90% visible (= 10% has scrolled out)
          threshold: 0.9,
        },
      );

      observer.observe(hero);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
