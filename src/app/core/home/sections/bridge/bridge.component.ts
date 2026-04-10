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
    tag: 'Gobierno / Sector Público',
    title: 'Modernización de Canales Digitales Fondo Nacional del Ahorro',
    description: 'Rediseño integral de la experiencia digital para eliminar barreras de acceso y alinear la plataforma con las necesidades reales de millones de usuarios.',
    challenge: 'Canales digitales desactualizados generaban fricción y barreras de acceso, especialmente para usuarios con menor experiencia digital.',
    result: 'Plataforma renovada con navegación intuitiva, mayor accesibilidad y reducción significativa de fricción en procesos clave.',
    metric: '-60%',
    metricLabel: 'Fricción en procesos digitales',
  },
  {
    tag: 'Financiero / Público',
    title: 'Plataforma de Garantías FINAGRO',
    description: 'Sistema centralizado para el registro y monitoreo seguro de operaciones.',
    challenge: 'Procesos fragmentados y manuales con altos riesgos de control y auditoría.',
    result: 'Plataforma de módulos unificados con automatización y trazabilidad total.',
    metric: '-65%',
    metricLabel: 'Tiempo de gestión',
  },
  {
    tag: 'Educación / EdTech',
    title: 'Ecosistema LMS Inteligente',
    description: 'Plataforma LMS para experiencias adaptativas y personalizadas.',
    challenge: 'Falta de personalización, integraciones y escasa gestión de estudiantes.',
    result: 'Entorno escalable que mejora la interacción y gestión de contenido.',
    metric: '+42%',
    metricLabel: 'Retención de estudiantes',
  },
  {
    tag: 'Gobierno / Público',
    title: 'Plataforma Territorial MinInterior',
    description: 'Sistema para optimizar la relación entre el Ministerio y autoridades locales.',
    challenge: 'Comunicación manual, descentralizada y sin trazabilidad real.',
    result: 'Plataforma con seguimiento total de comunicados, encuestas y circulares.',
    metric: '-70%',
    metricLabel: 'Tiempo de respuesta',
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
