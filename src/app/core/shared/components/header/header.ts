import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { OpiButtonComponent } from '../opi-button/opi-button.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ThemeService } from '../../../../services/theme.service';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-header',
  imports: [OpiButtonComponent, LanguageSelectorComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly themeService = inject(ThemeService);
  readonly lang = inject(LanguageService);

  readonly isVisible = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const scrollThreshold = window.innerHeight;
          const currentScrollY = window.scrollY || document.documentElement.scrollTop;
          this.isVisible.set(currentScrollY > scrollThreshold);
        });
    }
  }
}
