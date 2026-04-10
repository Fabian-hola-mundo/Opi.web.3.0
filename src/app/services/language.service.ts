import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ES, type Translations } from '../i18n/es';
import { EN } from '../i18n/en';
import { PT } from '../i18n/pt';

export type Lang = 'es' | 'en' | 'pt';

const TRANSLATION_MAP: Record<Lang, Translations> = { es: ES, en: EN, pt: PT };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentLang = signal<Lang>('es');

  readonly translations = computed<Translations>(() => TRANSLATION_MAP[this.currentLang()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('opi-lang') as Lang | null;
      if (saved && saved in TRANSLATION_MAP) {
        this.currentLang.set(saved);
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('en')) {
          this.currentLang.set('en');
        } else if (browserLang.startsWith('pt')) {
          this.currentLang.set('pt');
        }
      }

      effect(() => {
        const lang = this.currentLang();
        localStorage.setItem('opi-lang', lang);
        document.documentElement.lang = lang;
      });
    }
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
  }

  toggle(): void {
    const order: Lang[] = ['es', 'en', 'pt'];
    const next = order[(order.indexOf(this.currentLang()) + 1) % order.length];
    this.currentLang.set(next);
  }
}
