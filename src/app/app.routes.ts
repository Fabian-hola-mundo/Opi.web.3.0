import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/home/home.component').then((m) => m.HomeComponent),
    title: 'OPI Technology — Consultoría Tecnológica',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
