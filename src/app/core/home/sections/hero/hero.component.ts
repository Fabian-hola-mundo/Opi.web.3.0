import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroParticlesDirective } from './hero-particles.directive';
import { OpiButtonComponent } from '../../../shared/components/opi-button/opi-button.component';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-hero',
  imports: [HeroParticlesDirective, OpiButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly lang = inject(LanguageService);
}
