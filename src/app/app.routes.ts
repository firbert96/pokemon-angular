import { Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export default appRoutes;
