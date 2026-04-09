import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';

interface SuccessCase {
  tag: string;
  title: string;
  challenge?: string;
  result?: string;
  metric: string;
  metricLabel: string;
  client?: string;
  description?: string;
}

const successCases: SuccessCase[] = [
  {
    tag: 'Retail',
    title: 'Transformación Digital Retailer Nacional',
    challenge: 'Sistema de inventario heredado causaba pérdidas de $2M anuales por desabasto.',
    result: 'Plataforma en tiempo real redujo pérdidas 78% y mejoró rotación de inventario 34% en 6 meses.',
    metric: '-78%',
    metricLabel: 'Pérdidas Operativas',
  },
  {
    tag: 'Fintech',
    title: 'Automatización de Conciliación Financiera',
    client: 'Firma Financiera Líder',
    challenge: '40% del tiempo operativo invertido en tareas manuales de conciliación.',
    metric: '-92%',
    metricLabel: 'Tiempo de Conciliación',
  },
  {
    tag: 'Construcción',
    title: 'Visibilidad Unificada de Proyectos',
    description: 'Dashboard ejecutivo en tiempo real con alertas proactivas para 12 proyectos simultáneos.',
    metric: '95%',
    metricLabel: 'Proyectos a Tiempo',
  },
  {
    tag: 'Hospitalidad Digital',
    title: 'Experiencia Digital Hotelera',
    metric: '3 min',
    metricLabel: 'Check-in Promedio',
  },
  {
    tag: 'Cadena Hotelera Premium',
    title: 'App Móvil + Integración PMS',
    client: 'Cadena Hotelera Internacional',
    result: 'Reducción de check-in de 18 a 3 minutos en 60+ propiedades',
    metric: '+24',
    metricLabel: 'Puntos NPS',
  },
];

@Component({
  selector: 'app-bridge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpiSectionWrapperComponent],
  templateUrl: './bridge.component.html',
  styleUrl: './bridge.component.scss',
})
export class BridgeComponent {
  readonly cases = successCases;
}
