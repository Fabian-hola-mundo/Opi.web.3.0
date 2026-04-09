import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpiMetricCellComponent } from '../../../shared/components/opi-metric-cell/opi-metric-cell.component';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';

const metrics = [
  { value: 12, label: 'Años de experiencia', suffix: '+', span: 1 as const },
  { value: 150, label: 'Proyectos entregados', suffix: '+', span: 2 as const },
  { value: 99, label: 'Disponibilidad garantizada', suffix: '%', span: 1 as const },
  { value: 40, label: 'Reducción promedio de costos operativos', suffix: '%', span: 1 as const },
  { value: 3, label: 'Días promedio para primer entregable', suffix: '', span: 1 as const },
  { value: 98, label: 'Clientes que nos recomendarían', suffix: '%', span: 2 as const },
];

@Component({
  selector: 'app-metrics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpiSectionWrapperComponent, OpiMetricCellComponent],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss',
})
export class MetricsComponent {
  readonly metrics = metrics;
}
