import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpiCardComponent, type OpiCardScene } from '../../../shared/components/opi-card/opi-card.component';
import { InViewDirective } from '../../../shared/directives/in-view.directive';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';

interface PainPoint {
  sceneType: OpiCardScene;
  category: string;
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
      sceneType: 'sphere',
      category: 'Ejecución',
      title: 'Ingeniería de cumplimiento',
      body: 'Cerramos la distancia entre sus ideas y la tecnología. Nos aseguramos de que su proyecto cumpla con el presupuesto pactado y se entregue a tiempo, evitando retrasos innecesarios que frenan su crecimiento.',
    },
    {
      sceneType: 'torus',
      category: 'Datos',
      title: 'Visibilidad total y trazabilidad',
      body: 'Conectamos todas las piezas de su operación para que nada quede oculto. Convertimos datos dispersos en una visión clara del negocio, permitiéndole tomar decisiones con seguridad y basadas en hechos reales.',
    },
    {
      sceneType: 'knot',
      category: 'Talento',
      title: 'Potencial Optimizado',
      body: 'Liberamos a su equipo de las tareas técnicas que los desgastan. Nosotros nos encargamos de la complejidad tecnológica para que su gente se concentre exclusivamente en generar ventaja competitiva y capturar oportunidades de mercado',
    },
  ];
}
