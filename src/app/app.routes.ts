import { Routes } from '@angular/router';
import { HomePageComponent, EmployeesPageComponent, AboutPageComponent } from './pages';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomePageComponent,
  },
  {
    path: 'employees',
    title: 'Employees',
    component: EmployeesPageComponent,
  },
  {
    path: 'about',
    title: 'About',
    component: AboutPageComponent,
  },
];
