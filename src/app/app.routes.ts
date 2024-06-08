import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employee-list', pathMatch: 'full' },

  { path: 'employee-list', component: EmployeeListComponent },

  { path: 'new-employee', component: NewEmployeeComponent },

  { path: 'edit-employee', component: NewEmployeeComponent },

  { path: 'edit-employee/:id', component: EditEmployeeComponent },
];
