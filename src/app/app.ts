import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LayoutComponent } from './layout/layout';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: '<app-layout />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
