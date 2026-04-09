import { Component, HostListener, signal, ChangeDetectionStrategy } from '@angular/core';
import { OpiButtonComponent } from '../opi-button/opi-button.component';

@Component({
  selector: 'app-header',
  imports: [OpiButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  isVisible = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si bajamos 100vh se revela el nav. Si regresamos se oculta.
    // Usamos document.documentElement.clientHeight o window.innerHeight.
    const scrollThreshold = window.innerHeight;
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
    
    if (currentScrollY > scrollThreshold) {
      if (!this.isVisible()) {
        this.isVisible.set(true);
      }
    } else {
      if (this.isVisible()) {
        this.isVisible.set(false);
      }
    }
  }
}
