import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroUsuarioComponent } from './components/pages/registro-usuario/registro-usuario.component';
import { ComparativaComponent } from './components/pages/comparativa/comparativa.component';
import { AuthGuard } from './services/auth.guard';
import { LocationComponent } from './components/pages/location/location.component'; 
import { StatisticsComponent } from './components/pages/statistics/statistics.component'; 

export const routes: Routes = [
  { path: 'register', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'comparativa/:id',
    component: ComparativaComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'location', component: LocationComponent },
  { path: 'statistics', component: StatisticsComponent },
];
