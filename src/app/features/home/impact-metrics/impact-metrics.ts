import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';

// ---------------------------------------------------------------------------
// DATA MODEL
// ---------------------------------------------------------------------------

interface MetricItem {
  readonly id: string;
  readonly value: number;       // target number to count up to
  readonly prefix?: string;
  readonly suffix?: string;
  readonly decimals?: number;   // decimal places shown during count
  readonly label: string;
  readonly description: string;
  readonly gridArea: string;
  readonly variant: 'featured' | 'default' | 'narrative' | 'warm';
}

const METRICS: readonly MetricItem[] = [
  {
    id: 'avail',
    value: 99.9,
    suffix: '%',
    decimals: 1,
    label: 'Disponibilidad garantizada',
    description: 'En sistemas críticos del Estado sin tolerancia al fallo.',
    gridArea: 'avail',
    variant: 'featured',    // dark card — máximo impacto visual
  },
  {
    id: 'years',
    value: 15,
    suffix: '+',
    label: 'Años de experiencia',
    description: 'Operando donde el error tiene consecuencias reales.',
    gridArea: 'years',
    variant: 'default',
  },
  {
    id: 'projects',
    value: 500,
    suffix: '+',
    label: 'Proyectos ejecutados',
    description: 'En infraestructura, educación y hacienda pública.',
    gridArea: 'projects',
    variant: 'default',
  },
  {
    id: 'narr',
    value: 0,               // narrative — sin count-up
    label: 'La experiencia que el sector privado necesita',
    description:
      'Operamos durante años en entornos donde el margen de error es prácticamente cero. Esa rigurosidad operativa es la credencial que hoy ponemos al servicio de tu empresa.',
    gridArea: 'narr',
    variant: 'narrative',   // warm tint — insight destacado
  },
  {
    id: 'sectors',
    value: 8,
    label: 'Sectores de industria',
    description: 'Desde telecomunicaciones hasta infraestructura vial.',
    gridArea: 'sectors',
    variant: 'default',
  },
  {
    id: 'delivery',
    value: 100,
    suffix: '%',
    label: 'Proyectos documentados',
    description: 'Con transferencia real de conocimiento incluida.',
    gridArea: 'delivery',
    variant: 'warm',        // warm accent — contrasta con defaults
  },
];

// ---------------------------------------------------------------------------
// EASING
// ---------------------------------------------------------------------------

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-impact-metrics',
  templateUrl: './impact-metrics.html',
  styleUrl: './impact-metrics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactMetricsComponent {
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly metrics = METRICS;

  /**
   * Map of metric id → current animated display value (0 → target).
   * Updated every rAF frame during the count-up animation.
   */
  private readonly _progress = signal<Record<string, number>>(
    Object.fromEntries(METRICS.map((m) => [m.id, 0]))
  );

  /** Formatted display string per metric id. */
  protected readonly displayValues = computed(() => {
    const raw = this._progress();
    const result: Record<string, string> = {};
    for (const m of METRICS) {
      if (m.variant === 'narrative') continue;
      const n = raw[m.id] ?? 0;
      const formatted = m.decimals
        ? n.toFixed(m.decimals)
        : Math.round(n).toString();
      result[m.id] = `${m.prefix ?? ''}${formatted}${m.suffix ?? ''}`;
    }
    return result;
  });

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            this.runCountUp();
          }
        },
        { threshold: 0.18 }
      );
      observer.observe(this.el.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private runCountUp(): void {
    const DURATION = 1500; // ms
    const startTime = performance.now();

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / DURATION, 1);
      const eased = easeOutCubic(t);

      this._progress.set(
        Object.fromEntries(METRICS.map((m) => [m.id, m.value * eased]))
      );

      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
}
