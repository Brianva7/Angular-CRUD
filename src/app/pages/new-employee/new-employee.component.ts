import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css',
})
export class NewEmployeeComponent {
  newEmployeeForm: FormGroup;

  formBuilder = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  router = inject(Router);

  constructor() {
    this.newEmployeeForm = this.formBuilder.group({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      salary: '',
      createdAt: Date.now(),
    });
  }

  onSubmit() {
    this.employeeService
      .create(this.newEmployeeForm.value)
      .subscribe(() => this.router.navigate(['/employee-list']));
  }
}
