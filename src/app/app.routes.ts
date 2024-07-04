import { Routes } from '@angular/router';
import { HomePageComponent, EmployeesPageComponent, AboutPageComponent } from './pages';

export const routes: Routes = [
  {
    path: '',
    title: 'Employees - Home',
    component: HomePageComponent,
  },
  {
    path: 'employees',
    title: 'Employees - Manage',
    component: EmployeesPageComponent,
  },
  {
    path: 'about',
    title: 'Employees - About',
    component: AboutPageComponent,
  },
];
