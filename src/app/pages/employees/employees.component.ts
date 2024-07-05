import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { EmployeesModel } from '../../service/employees.model';
import { EmployeesService } from '../../service/employees.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [NzIconModule, NzTableModule, NzDividerModule, NzMessageModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesPageComponent implements OnInit {
  employeesList: EmployeesModel[] = [];
  isEmployeesListLoading = true;

  constructor(
    private employees_service: EmployeesService,
    private message: NzMessageService
  ) {}

  createMessage(type: string, content: string): void {
    this.message.create(type, content);
  }

  ngOnInit() {
    this.employees_service.getEmployeesList().subscribe({
      next: (employeesList) => {
        this.employeesList = employeesList.records;
        this.isEmployeesListLoading = false;
      },
      error: (error) => {
        this.isEmployeesListLoading = false;
        this.createMessage('error', 'Failed to load employees');
        console.error(error);
      },
    });
  }
}
