import { Route } from "@angular/router";

export default [
    { path: '', loadComponent: () => import('./workouts-list-page/workouts-list-page.component').then(x => x.WorkoutsListPageComponent) }
] as Route[]