import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { OpiMetricCellComponent } from '../../../shared/components/opi-metric-cell/opi-metric-cell.component';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';
import { LanguageService } from '../../../../services/language.service';

const METRIC_VALUES = [6, 20, 90, 10, 10, 99, 100, 40];
const PAGE_SIZE = 3;

@Component({
  selector: 'app-metrics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpiSectionWrapperComponent, OpiMetricCellComponent],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss',
})
export class MetricsComponent {
  private readonly lang = inject(LanguageService);

  readonly metrics = computed(() =>
    this.lang.translations().metrics.items.map((item, i) => ({
      value: METRIC_VALUES[i],
      suffix: item.suffix,
      label: item.label,
      description: item.description,
    })),
  );

  readonly i18n = computed(() => this.lang.translations().metrics);

  // ── Desktop carousel state ──────────────────────────────────────────────
  readonly currentPage = signal(0);
  readonly totalPages = computed(() => Math.ceil(this.metrics().length / PAGE_SIZE));
  readonly hasPrev = computed(() => this.currentPage() > 0);
  readonly hasNext = computed(() => this.currentPage() < this.totalPages() - 1);
  readonly visibleMetrics = computed(() => {
    const start = this.currentPage() * PAGE_SIZE;
    return this.metrics().slice(start, start + PAGE_SIZE);
  });
  readonly pageIndicators = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i),
  );

  prev(): void {
    if (this.hasPrev()) this.currentPage.update(p => p - 1);
  }

  next(): void {
    if (this.hasNext()) this.currentPage.update(p => p + 1);
  }
}
