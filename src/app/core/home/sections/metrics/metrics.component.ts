import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { OpiMetricCellComponent } from '../../../shared/components/opi-metric-cell/opi-metric-cell.component';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';

export interface MetricItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const METRICS: MetricItem[] = [
  {
    value: 15,
    suffix: '+',
    label: 'Años de trayectoria',
    description: 'Liderando la vanguardia tecnológica desde la primera ola digital.',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Proyectos completados',
    description: 'Soluciones de misión crítica desplegadas con precisión arquitectónica.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Éxito en entrega',
    description: 'Compromiso inquebrantable con la excelencia técnica y el cumplimiento.',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Disponibilidad garantizada',
    description: 'Infraestructura de alta disponibilidad que opera sin interrupciones.',
  },
  {
    value: 40,
    suffix: '%',
    label: 'Reducción de costos',
    description: 'Eficiencia operativa sostenida, sin sacrificar calidad ni escala.',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Clientes satisfechos',
    description: 'Relaciones de largo plazo construidas sobre resultados concretos.',
  },
];

const PAGE_SIZE = 3;

@Component({
  selector: 'app-metrics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpiSectionWrapperComponent, OpiMetricCellComponent],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss',
})
export class MetricsComponent {
  readonly metrics = METRICS;

  // ── Desktop carousel state ──────────────────────────────────────────────
  readonly currentPage = signal(0);
  readonly totalPages = computed(() => Math.ceil(this.metrics.length / PAGE_SIZE));
  readonly hasPrev = computed(() => this.currentPage() > 0);
  readonly hasNext = computed(() => this.currentPage() < this.totalPages() - 1);
  readonly visibleMetrics = computed(() => {
    const start = this.currentPage() * PAGE_SIZE;
    return this.metrics.slice(start, start + PAGE_SIZE);
  });
  readonly pageIndicators = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i)
  );

  prev(): void {
    if (this.hasPrev()) this.currentPage.update(p => p - 1);
  }

  next(): void {
    if (this.hasNext()) this.currentPage.update(p => p + 1);
  }
}
