import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface Testimonial {
  readonly quote: string;
  readonly authorName: string;
  readonly authorRole: string;
  readonly authorCompany: string;
  readonly avatarSrc: string;
}

interface ClientLogo {
  readonly id: string;
  readonly name: string;
  readonly logoSrc: string;
  readonly logoWidth: number;
  readonly logoHeight: number;
  readonly testimonial: Testimonial;
}

const CLIENTS: readonly ClientLogo[] = [
  {
    id: 'sena',
    name: 'SENA',
    logoSrc: '/logos/sena.svg',
    logoWidth: 120,
    logoHeight: 40,
    testimonial: {
      quote: 'OPI demostró una capacidad operativa excepcional durante la implementación de nuestro sistema de gestión. Su experiencia en el sector público marcó una diferencia real en los tiempos de entrega.',
      authorName: 'Carlos Rodríguez',
      authorRole: 'Director de Tecnología',
      authorCompany: 'SENA',
      avatarSrc: '/avatars/carlos-r.svg',
    },
  },
  {
    id: 'mineducacion',
    name: 'MinEducación',
    logoSrc: '/logos/mineducacion.svg',
    logoWidth: 120,
    logoHeight: 40,
    testimonial: {
      quote: 'El equipo de OPI entendió desde el primer día la complejidad de los procesos del sector público. Entregaron una solución robusta que hoy es referente en el Ministerio.',
      authorName: 'María González',
      authorRole: 'Subdirectora de Sistemas',
      authorCompany: 'MinEducación',
      avatarSrc: '/avatars/maria-g.svg',
    },
  },
  {
    id: 'ani',
    name: 'ANI',
    logoSrc: '/logos/ani.svg',
    logoWidth: 120,
    logoHeight: 40,
    testimonial: {
      quote: 'Gracias a OPI logramos un 99.9% de disponibilidad en nuestros sistemas críticos de concesiones. Una garantía que pocos proveedores pueden ofrecer.',
      authorName: 'Andrés Morales',
      authorRole: 'Gerente de Infraestructura TI',
      authorCompany: 'ANI',
      avatarSrc: '/avatars/andres-m.svg',
    },
  },
  {
    id: 'bancoldex',
    name: 'Bancóldex',
    logoSrc: '/logos/bancoldex.svg',
    logoWidth: 120,
    logoHeight: 40,
    testimonial: {
      quote: 'La transición a una plataforma moderna fue más ágil de lo que esperábamos. OPI gestionó el cambio con una metodología clara y sin interrupciones operativas.',
      authorName: 'Lucía Pedraza',
      authorRole: 'VP de Transformación Digital',
      authorCompany: 'Bancóldex',
      avatarSrc: '/avatars/lucia-p.svg',
    },
  },
  {
    id: 'dnp',
    name: 'DNP',
    logoSrc: '/logos/dnp.svg',
    logoWidth: 120,
    logoHeight: 40,
    testimonial: {
      quote: 'OPI convirtió datos complejos de planeación nacional en tableros accionables que hoy usan más de 200 funcionarios. Un impacto directo en la toma de decisiones del Estado.',
      authorName: 'Jorge Vargas',
      authorRole: 'Director de Seguimiento',
      authorCompany: 'DNP',
      avatarSrc: '/avatars/jorge-v.svg',
    },
  },
  {
    id: 'aerocivil',
    name: 'Aerocivil',
    logoSrc: '/logos/aerocivil.svg',
    logoWidth: 120,
    logoHeight: 40,
    testimonial: {
      quote: 'Trabajar con OPI fue elegir un socio que comprende las exigencias regulatorias del sector aeronáutico. Su rigurosidad técnica es incomparable.',
      authorName: 'Diana Fuentes',
      authorRole: 'Jefe de Sistemas Aeronáuticos',
      authorCompany: 'Aerocivil',
      avatarSrc: '/avatars/diana-f.svg',
    },
  },
];

@Component({
  selector: 'app-trust-bar',
  imports: [NgOptimizedImage],
  templateUrl: './trust-bar.html',
  styleUrl: './trust-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrustBarComponent {
  protected readonly logos = CLIENTS;

  /**
   * Duplicate set for the seamless loop. Uses suffixed IDs so Angular's
   * @for tracker keeps them distinct from the first set.
   */
  protected readonly dupLogos = CLIENTS.map((c) => ({
    ...c,
    id: `${c.id}--dup`,
  }));

  /** ID del logo actualmente bajo el cursor. null = ninguno. */
  protected readonly hoveredId = signal<string | null>(null);

  /** true cuando el carousel debe pausarse. */
  protected readonly isPaused = computed(() => this.hoveredId() !== null);

  /** Testimonio activo (logo bajo el cursor), o null. */
  protected readonly activeTestimonial = computed(() =>
    CLIENTS.find((c) => c.id === this.hoveredId()) ?? null
  );

  protected onLogoEnter(id: string): void {
    this.hoveredId.set(id);
  }

  protected onLogoLeave(): void {
    this.hoveredId.set(null);
  }
}
