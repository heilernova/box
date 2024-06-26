import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./ui/sign-in/sign-in.component').then(x => x.SignInComponent) },
    { path: 'registrarse', loadComponent: () => import('./ui/sign-up/sign-up.component').then(x => x.SignUpComponent) },
    {
        path: '',
        loadComponent: () => import('./ui/layout/layout.component').then(x => x.LayoutComponent),
        children: [
            { path: 'rms', loadComponent: () => import('./pages/rms-page/rms-page.component').then(x => x.RmsPageComponent) },
            { path: 'gyms', loadChildren: () => import('./pages/gyms/gyms.routes') },
            { path: 'ejercicios', loadComponent: () => import('./pages/workouts-page/workouts-page.component').then(x => x.WorkoutsPageComponent) },
            { path: 'atletas', loadComponent: () => import('./pages/athlete-list-pages/athlete-list-pages.component').then(x => x.AthleteListPagesComponent) },
            { path: 'wods', loadComponent: () => import('./pages/wods-page/wods-page.component').then(x => x.WodsPageComponent) },
            { path: 'menu', loadComponent: () => import('./pages/menu-page/menu-page.component').then(x => x.MenuPageComponent) },
            { path: 'competencias', loadComponent: () => import('./pages/competencies-page/competencies-page.component').then(x => x.CompetenciesPageComponent) },
            { path: 'perfil', loadComponent: () => import('./pages/profile-page/profile-page.component').then(x => x.ProfilePageComponent) },
            { path: '**', loadComponent: () => import('./pages/not-found-page/not-found-page.component').then(x => x.NotFoundPageComponent) },
        ]
    }
];
