import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface LogoPlaceholder {
  abbrev: string;
  label: string;
}

@Component({
  selector: 'app-social-proof',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './social-proof.component.html',
  styleUrl: './social-proof.component.scss',
})
export class SocialProofComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly scrollTrack = viewChild.required<ElementRef<HTMLDivElement>>('scrollTrack');

  readonly logos: LogoPlaceholder[] = [
    { abbrev: 'GS', label: 'GrupoSal' },
    { abbrev: 'FT', label: 'FinTechMX' },
    { abbrev: 'MC', label: 'MedCore' },
    { abbrev: 'LT', label: 'LogiTech' },
    { abbrev: 'CM', label: 'ConstruMX' },
    { abbrev: 'RP', label: 'RetailPro' },
    { abbrev: 'ET', label: 'EduTech' },
    { abbrev: 'BS', label: 'BancaSeg' },
  ];

  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.intervalId = setInterval(() => {
      const track = this.scrollTrack().nativeElement;
      const itemWidth = 176; // 160px tile + 16px gap
      track.scrollBy({ left: itemWidth, behavior: 'smooth' });

      // Loop back when reaching the end
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - itemWidth) {
        setTimeout(() => {
          track.scrollTo({ left: 0, behavior: 'instant' });
        }, 400);
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }
}
