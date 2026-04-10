import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LanguageService, type Lang } from '../../../../services/language.service';

interface LangOption {
  code: Lang;
  label: string;
  flagCode: string;
}

const LANGUAGES: LangOption[] = [
  { code: 'es', label: 'Español', flagCode: 'co' },
  { code: 'en', label: 'English', flagCode: 'us' },
  { code: 'pt', label: 'Português', flagCode: 'br' },
];

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'lang-selector-host' },
})
export class LanguageSelectorComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly langService = inject(LanguageService);
  readonly languages = LANGUAGES;
  readonly isOpen = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent<MouseEvent>(document, 'click')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(event => {
          if (!this.elementRef.nativeElement.contains(event.target as Node)) {
            this.isOpen.set(false);
          }
        });

      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter(e => e.key === 'Escape'),
        )
        .subscribe(() => this.isOpen.set(false));
    }
  }

  get activeLang(): LangOption {
    return LANGUAGES.find(l => l.code === this.langService.currentLang()) ?? LANGUAGES[0];
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  select(lang: Lang): void {
    this.langService.setLang(lang);
    this.isOpen.set(false);
  }
}
