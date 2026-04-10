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
    value: 6,
    suffix: '+',
    label: 'Años de ejecución continua',
    description: 'Construyendo software de misión crítica sin interrupciones desde 2019.',
  },
  {
    value: 20,
    suffix: '+',
    label: 'Proyectos en producción',
    description: 'Cada uno operando en entornos reales. Cada uno con un cliente que respalda el resultado.',
  },
  {
    value: 90,
    suffix: '%',
    label: 'Tasa de recontratación',
    description: '9 de cada 10 clientes eligen volver. La confianza no se declara — se demuestra con contratos.',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Entidades de alto impacto',
    description: 'Instituciones públicas que nos confían sus sistemas más sensibles y regulados del país.',
  },
  {
    value: 10,
    suffix: ' Millones',
    label: 'De colombianos impactados',
    description: 'Los sistemas que construimos atienden a ciudadanos que dependen de servicios públicos esenciales.',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Disponibilidad garantizada',
    description: 'Sistemas que no se pueden caer, operando con la solidez que exige la misión crítica.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'De proyectos entregados',
    description: 'Sin proyectos abandonados. Sin excusas. Lo que acordamos, lo cumplimos.',
  },
  {
    value: 40,
    suffix: '%',
    label: 'De eficiencia operativa',
    description: 'Optimización real de costos y procesos en los proyectos de nuestros clientes.',
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
