import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly theme = signal<'light' | 'dark'>('dark');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Restore saved theme preference from localStorage
      const saved = localStorage.getItem('opi-theme') as 'light' | 'dark' | null;
      if (saved) {
        this.theme.set(saved);
      }

      // Sync current theme to DOM data attribute and persist to localStorage
      effect(() => {
        document.documentElement.dataset['theme'] = this.theme();
        localStorage.setItem('opi-theme', this.theme());
      });
    }
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }
}
