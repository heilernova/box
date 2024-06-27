import { Route } from "@angular/router";

export default [
    { path: '', loadComponent: () => import('./athletes-list-page/athletes-list-page.component').then(x => x.AthletesListPageComponent) }
] as Route[]