import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Metric {
  readonly value: string;
  readonly unit: string;
  readonly label: string;
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly metrics: readonly Metric[] = [
    { value: '99.9', unit: '%', label: 'Disponibilidad garantizada' },
    { value: '15',   unit: '+ Años', label: 'Experiencia comprobada' },
    { value: '500',  unit: '+', label: 'Proyectos ejecutados' },
  ];
}
