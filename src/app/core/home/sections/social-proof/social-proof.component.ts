import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';

interface ClientLogo {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-social-proof',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './social-proof.component.html',
  styleUrl: './social-proof.component.scss',
  imports: [NgOptimizedImage],
})
export class SocialProofComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  readonly carousel = viewChild.required<ElementRef<HTMLDivElement>>('carousel');

  readonly logos: ClientLogo[] = [
    { src: '/clients/and.svg', alt: 'Logo de AND' },
    { src: '/clients/cidet.svg', alt: 'Logo de CIDET' },
    { src: '/clients/colombia-digital.svg', alt: 'Logo de Colombia Digital' },
    { src: '/clients/etb.svg', alt: 'Logo de ETB' },
    { src: '/clients/fcm.svg', alt: 'Logo de FMC' },
    { src: '/clients/icetex.svg', alt: 'Logo de ICETEX' },
    { src: '/clients/microsoft.svg', alt: 'Logo de Microsoft' },
    { src: '/clients/minin.svg', alt: 'Logo de MinInterior' },
    { src: '/clients/mta.svg', alt: 'Logo de MTA' },
    { src: '/clients/platzi.svg', alt: 'Logo de Platzi' },
    { src: '/clients/pygma.svg', alt: 'Logo de Pygma' },
    { src: '/clients/tecnnova.svg', alt: 'Logo de Tecnnova' },
    { src: '/clients/telecafe.svg', alt: 'Logo de Telecafé' },
    { src: '/clients/tour-colombia.svg', alt: 'Logo de Tour Colombia' },
    { src: '/clients/unad.svg', alt: 'Logo de UNAD' },
  ];

  private intervalId?: ReturnType<typeof setInterval>;
  private scrollStep = 2;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => this.scrollCarousel(), 50);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  private scrollCarousel(): void {
    const el = this.carousel().nativeElement;
    el.scrollLeft += this.scrollStep;

    if (el.scrollLeft >= el.scrollWidth - el.offsetWidth) {
      this.scrollStep = -1;
    } else if (el.scrollLeft <= 0) {
      this.scrollStep = 1;
    }
  }
}
