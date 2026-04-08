import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface PainCard {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

const PAIN_CARDS: readonly PainCard[] = [
  {
    id: 'cronogramas',
    number: '01',
    title: 'Proyectos que nunca terminan',
    description:
      'Cronogramas que se extienden indefinidamente mientras los costos operativos siguen acumulándose sin una fecha real de cierre.',
  },
  {
    id: 'riesgo',
    number: '02',
    title: 'El riesgo siempre es tuyo',
    description:
      'Cada decisión crítica recae sobre tu equipo. El proveedor factura, pero la responsabilidad de los resultados la absorbe tu organización.',
  },
  {
    id: 'opacidad',
    number: '03',
    title: 'Gestión sin visibilidad real',
    description:
      'Informes técnicos que no reflejan el estado real del proyecto, impidiendo decisiones oportunas cuando más se necesitan.',
  },
  {
    id: 'dependencia',
    number: '04',
    title: 'Dependencia tecnológica total',
    description:
      'Vendor lock-in que ata tu operación a un único proveedor sin documentación transferible ni continuidad garantizada.',
  },
];

@Component({
  selector: 'app-pain-block',
  imports: [RouterLink, RevealDirective],
  templateUrl: './pain-block.html',
  styleUrl: './pain-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PainBlockComponent {
  protected readonly painCards = PAIN_CARDS;
}
