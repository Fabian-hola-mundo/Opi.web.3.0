import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'contact-fab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fab-container" [class.open]="isOpen()">
      <div class="fab-actions" [attr.aria-hidden]="!isOpen()">
        <a
          href="https://wa.me/message/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          class="fab-action fab-whatsapp"
          aria-label="Contactar por WhatsApp"
          tabindex="0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <a
          href="mailto:hola@opitechnology.com"
          class="fab-action fab-email"
          aria-label="Enviar email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </a>
        <button
          type="button"
          class="fab-action fab-calendar"
          (click)="scrollToContact()"
          aria-label="Agendar reunión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </button>
      </div>
      <button
        type="button"
        class="fab-main"
        (click)="toggle()"
        [attr.aria-expanded]="isOpen()"
        aria-label="Contacto"
      >
        <svg
          class="icon-plus"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      bottom: var(--space-8);
      right: var(--space-8);
      z-index: var(--z-fab);
    }

    .fab-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
    }

    .fab-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
      opacity: 0;
      transform: translateY(16px) scale(0.85);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }

    .fab-container.open .fab-actions {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .fab-action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      border-radius: var(--radius-full);
      border: none;
      cursor: pointer;
      color: #ffffff;
      text-decoration: none;
      box-shadow: var(--shadow-md);
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-lg);
      }

      &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 2px;
      }
    }

    .fab-whatsapp {
      background-color: #25d366;
    }

    .fab-email {
      background-color: #3b82f6;
    }

    .fab-calendar {
      background-color: var(--color-secondary);
    }

    .fab-main {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: var(--radius-full);
      border: none;
      cursor: pointer;
      background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
      color: #ffffff;
      box-shadow: var(--shadow-lg);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: scale(1.08);
        box-shadow: var(--shadow-glow-primary);
      }

      &:active {
        transform: scale(0.96);
      }

      &:focus-visible {
        outline: 2px solid var(--color-secondary);
        outline-offset: 3px;
      }
    }

    .icon-plus {
      transition: transform 0.25s ease;
    }

    .fab-container.open .icon-plus {
      transform: rotate(45deg);
    }
  `],
})
export class ContactFabComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  scrollToContact(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      this.isOpen.set(false);
    }
  }
}
