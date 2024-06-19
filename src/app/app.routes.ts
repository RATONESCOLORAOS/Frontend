import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroUsuarioComponent } from './components/pages/registro-usuario/registro-usuario.component';
import { ComparativaComponent } from './components/pages/comparativa/comparativa.component';
import { LocationComponent } from './components/pages/location/location.component'; // Importa el componente de ubicación
import { StatisticsComponent } from './components/pages/statistics/statistics.component'; // Importa el nuevo componente


export const routes: Routes = [
  { path: 'register', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'comparativa/:id', component: ComparativaComponent },
  { path: 'comparativa', component: ComparativaComponent },
  { path: 'location', component: LocationComponent },
  { path: 'statistics', component: StatisticsComponent }, // Agrega la nueva ruta
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
