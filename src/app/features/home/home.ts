import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookingComponent } from './booking/booking';
import { BridgeComponent } from './bridge/bridge';
import { HeroComponent } from './hero/hero';
import { ImpactMetricsComponent } from './impact-metrics/impact-metrics';
import { PainBlockComponent } from './pain-block/pain-block';
import { TrustBarComponent } from './trust-bar/trust-bar';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    TrustBarComponent,
    PainBlockComponent,
    BridgeComponent,
    ImpactMetricsComponent,
    BookingComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
