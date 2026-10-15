import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./adventure-camps/presentation/views/home/home')
      .then(module => module.Home),
  },
];
