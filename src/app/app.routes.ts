import { Routes } from '@angular/router';
import { HomePageComponent, EmployeesPageComponent, ContactPageComponent } from './pages';

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
    path: 'contact',
    title: 'Employees - Contact',
    component: ContactPageComponent,
  },
];
