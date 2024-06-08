import { Component, OnInit, inject } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  arrEmployee: Employee[] = [];

  employeeService = inject(EmployeeService);
  router = inject(Router);

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((employees) => {
      this.arrEmployee = employees;
    });
  }

  delete(id: string) {
    this.employeeService.delete(id).subscribe(() => {
      this.arrEmployee = this.arrEmployee.filter((employee) => {
        return employee.id !== id;
      });
    });
  }

  update(id: string) {
    this.router.navigate(['/edit-employee', id]);
  }
}
