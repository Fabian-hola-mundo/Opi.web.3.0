import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly lang = inject(LanguageService);
}
