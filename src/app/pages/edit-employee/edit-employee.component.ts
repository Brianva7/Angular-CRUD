import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: FormGroup;
  private employeeService = inject(EmployeeService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  employee = this.route.snapshot.paramMap.get('id');

  constructor() {
    this.editEmployeeForm = this.formBuilder.group({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      salary: '',
      updatedAt: Date.now(),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getById(id).subscribe({
        next: (employee: Employee) => {
          this.editEmployeeForm.patchValue(employee);
        },
        error: (err) => {
          console.error('Error fetching employee data', err);
          alert('Failed to load employee data');
        },
      });
    }
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.update(id, this.editEmployeeForm.value).subscribe({
        next: () => {
          alert('Employee updated successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating employee', err);
          alert('Failed to update employee');
        },
      });
    }
  }
}
