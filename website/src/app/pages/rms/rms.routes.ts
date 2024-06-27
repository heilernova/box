import { Route } from "@angular/router";

export default [
    { path: '', loadComponent: () => import('./rms-list-page/rms-list-page.component').then(x => x.RmsListPageComponent) }
] as Route[]