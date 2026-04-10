import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-bridge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpiSectionWrapperComponent],
  templateUrl: './bridge.component.html',
  styleUrl: './bridge.component.scss',
})
export class BridgeComponent {
  readonly lang = inject(LanguageService);
}
