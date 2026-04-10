import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { SocialProofComponent } from './sections/social-proof/social-proof.component';
import { PainBlockComponent } from './sections/pain-block/pain-block.component';
import { BridgeComponent } from './sections/bridge/bridge.component';
import { MetricsComponent } from './sections/metrics/metrics.component';
import { ContactSectionComponent } from './sections/contact-section/contact-section.component';
import { ContactFabComponent } from '../shared/components/contact-fab/contact-fab.component';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    SocialProofComponent,
    PainBlockComponent,
    BridgeComponent,
    MetricsComponent,
    ContactSectionComponent,
    ContactFabComponent,
    Header,
    Footer
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly themeService = inject(ThemeService);
}
