import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./ui/sign-in/sign-in.component').then(x => x.SignInComponent) },
    { path: 'registrarse', loadComponent: () => import('./ui/sign-up/sign-up.component').then(x => x.SignUpComponent) },
    {
        path: '',
        loadComponent: () => import('./ui/layout/layout.component').then(x => x.LayoutComponent),
        children: [
            { path: 'gyms', loadChildren: () => import('./pages/gyms/gyms.routes') },
            { path: 'ejercicios', loadComponent: () => import('./pages/workouts-page/workouts-page.component').then(x => x.WorkoutsPageComponent) },
            { path: 'atletas', loadComponent: () => import('./pages/athlete-list-pages/athlete-list-pages.component').then(x => x.AthleteListPagesComponent) },
            { path: '**', loadComponent: () => import('./pages/not-found-page/not-found-page.component').then(x => x.NotFoundPageComponent) },
        ]
    }
];
