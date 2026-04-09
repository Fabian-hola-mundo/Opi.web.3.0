import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpiCardComponent } from '../../../shared/components/opi-card/opi-card.component';
import { InViewDirective } from '../../../shared/directives/in-view.directive';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';

interface PainPoint {
  icon: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-pain-block',
  imports: [OpiCardComponent, InViewDirective, OpiSectionWrapperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pain-block.component.html',
  styleUrl: './pain-block.component.scss',
})
export class PainBlockComponent {
  readonly painPoints: PainPoint[] = [
    {
      icon: '⚡',
      title: 'Proyectos que no entregan',
      body: 'El 70% de las transformaciones digitales falla por falta de alineación entre tecnología y negocio. Los proyectos se alargan, los presupuestos se disparan y los resultados no llegan.',
    },
    {
      icon: '🔗',
      title: 'Datos aislados, decisiones ciegas',
      body: 'Información fragmentada en silos hace imposible tomar decisiones basadas en datos. Las áreas no se comunican y los líderes operan con visibilidad parcial.',
    },
    {
      icon: '⏰',
      title: 'Tiempo y talento mal invertidos',
      body: 'Equipos internos gastando recursos en tareas que no generan ventaja competitiva, mientras las oportunidades de mercado pasan de largo.',
    },
  ];
}
