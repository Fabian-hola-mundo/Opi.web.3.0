import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { OpiAccordionItemComponent } from '../../../shared/components/opi-accordion-item/opi-accordion-item.component';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';

const cases = [
  {
    title: 'Retailer Nacional — Transformación Digital',
    content:
      'Reto: Sistema de inventario heredado causaba pérdidas de $2M anuales por desabasto. Resultado: Implementamos plataforma de gestión en tiempo real, reduciendo pérdidas en 78% en 6 meses y mejorando la rotación de inventario un 34%.',
  },
  {
    title: 'Firma Financiera — Automatización de Procesos',
    content:
      'Reto: 40% del tiempo operativo se invertía en tareas manuales de conciliación. Resultado: RPA + integración de sistemas redujo el tiempo de conciliación de 3 días a 4 horas, liberando al equipo para trabajo de mayor valor.',
  },
  {
    title: 'Constructora — Visibilidad de Proyectos',
    content:
      'Reto: 12 proyectos simultáneos sin visibilidad unificada del avance y costos. Resultado: Dashboard ejecutivo en tiempo real con alertas proactivas, logrando 95% de proyectos entregados a tiempo vs 60% previo.',
  },
  {
    title: 'Cadena Hotelera — Experiencia Digital',
    content:
      'Reto: Procesos de check-in/check-out tomaban 18 minutos promedio, generando quejas de huéspedes. Resultado: App móvil + integración con PMS redujo tiempo a 3 minutos y aumentó NPS un 24 puntos.',
  },
];

@Component({
  selector: 'app-bridge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpiSectionWrapperComponent, OpiAccordionItemComponent],
  templateUrl: './bridge.component.html',
  styleUrl: './bridge.component.scss',
})
export class BridgeComponent {
  readonly cases = cases;
  readonly openIndex = signal<number | null>(null);

  setOpen(i: number): void {
    this.openIndex.set(this.openIndex() === i ? null : i);
  }
}
