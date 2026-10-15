import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./adventure-camps/presentation/views/home/home')
      .then(module => module.Home),
  },
  {
    path: 'reservations/new',
    loadComponent: () => import('./reservations/presentation/views/new-reservation/new-reservation')
      .then(module => module.NewReservation),
  },
  {
    path: '**',
    loadComponent: () => import('./shared/presentation/views/not-found/not-found')
      .then(module => module.NotFound),
  },
];
