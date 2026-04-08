import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';

// ---------------------------------------------------------------------------
// BOOKING PLACEHOLDER URL
// Replace with the official Microsoft Bookings URL when available.
// ---------------------------------------------------------------------------
const BOOKING_URL =
  'https://outlook.office365.com/book/OPI@opigroup.com.co/';

interface Feature {
  readonly text: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /** Only set after first browser render — SSR safe. */
  private readonly rawSrc = signal<string | null>(null);

  /** Angular-safe resource URL for the iframe. */
  protected readonly safeSrc = computed((): SafeResourceUrl | null => {
    const src = this.rawSrc();
    return src
      ? this.sanitizer.bypassSecurityTrustResourceUrl(src)
      : null;
  });

  /** true while the iframe is still loading. */
  protected readonly isLoading = signal(true);

  protected readonly features: readonly Feature[] = [
    { text: 'Diagnóstico de madurez tecnológica de tu organización' },
    { text: 'Identificación de riesgos operativos no visibles' },
    { text: 'Hoja de ruta técnica inicial sin costo adicional' },
  ];

  constructor() {
    // Defer iframe src to browser — prevents SSR mismatch and unnecessary
    // network requests on the server.
    afterNextRender(() => {
      this.rawSrc.set(BOOKING_URL);
    });
  }

  protected onIframeLoad(): void {
    this.isLoading.set(false);
  }
}
