import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { OpiCardComponent, type OpiCardScene } from '../../../shared/components/opi-card/opi-card.component';
import { InViewDirective } from '../../../shared/directives/in-view.directive';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';
import { LanguageService } from '../../../../services/language.service';

const SCENE_TYPES: OpiCardScene[] = ['sphere', 'torus', 'knot'];

@Component({
  selector: 'app-pain-block',
  imports: [OpiCardComponent, InViewDirective, OpiSectionWrapperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pain-block.component.html',
  styleUrl: './pain-block.component.scss',
})
export class PainBlockComponent {
  private readonly lang = inject(LanguageService);

  readonly heading = computed(() => this.lang.translations().pain.heading);

  readonly painPoints = computed(() =>
    this.lang.translations().pain.points.map((p, i) => ({
      sceneType: SCENE_TYPES[i],
      category: p.category,
      title: p.title,
      body: p.body,
    })),
  );
}
