import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { EmployeesModel } from '../../../service/employees.model';
import { EmployeesService } from '../../../service/employees.service';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [NzIconModule, NzTableModule, NzDividerModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesPageComponent implements OnInit {
  employees: EmployeesModel[] = [];
  errorMessage!: string;
  isLoading = true;
  isError = false;

  constructor(private employees_service: EmployeesService) {}

  ngOnInit() {
    this.employees_service.getEmployeesList().subscribe({
      next: (employees) => {
        this.employees = employees.records;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isError = true;
        this.isLoading = false;
      },
    });
  }
}
