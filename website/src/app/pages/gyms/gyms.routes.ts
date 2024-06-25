import { Route } from "@angular/router";

export default [
    { path: '', loadComponent: () => import('./gyms-home-page/gyms-home-page.component').then(x => x.GymsHomePageComponent) },
    { path: ':gym', loadComponent: () => import('./gyms-info-page/gyms-info-page.component').then(x => x.GymsInfoPageComponent) },
] as Route[]