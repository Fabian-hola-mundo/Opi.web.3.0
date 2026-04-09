import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroParticlesDirective } from './hero-particles.directive';
import { OpiButtonComponent } from '../../../shared/components/opi-button/opi-button.component';
import { OpiBadgeComponent } from '../../../shared/components/opi-badge/opi-badge.component';

@Component({
  selector: 'app-hero',
  imports: [HeroParticlesDirective, OpiButtonComponent, OpiBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
