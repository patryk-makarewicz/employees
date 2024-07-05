import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { EmployeesModel, RemoveEmployeeModel } from '../../service/employees.model';
import { EmployeesService } from '../../service/employees.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { ButtonComponent } from '../../components';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzMessageModule,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
  ],
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
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.isEmployeesListLoading = true;
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

  createEmployeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    fte: new FormControl(0, Validators.required),
    salary: new FormControl(0, Validators.required),
  });

  addEmployee() {
    this.isEmployeesListLoading = true;
    this.employees_service
      .addEmployee({
        records: [
          {
            fields: {
              name: this.createEmployeeForm.value.name!,
              surname: this.createEmployeeForm.value.surname!,
              position: this.createEmployeeForm.value.position!,
              fte: Number(this.createEmployeeForm.value.fte),
              salary: Number(this.createEmployeeForm.value.salary),
            },
          },
        ],
      })
      .subscribe({
        next: () => {
          this.getEmployeesList();
          this.createMessage('success', 'Employee added successfully');
        },
        error: (error) => {
          this.isEmployeesListLoading = false;
          this.createMessage('error', 'Failed to add employee');
          console.error(error);
        },
      });
  }

  removeEmployee(id: RemoveEmployeeModel) {
    this.isEmployeesListLoading = true;
    this.employees_service.removeEmployee(id).subscribe({
      next: () => {
        this.getEmployeesList();
        this.createMessage('success', 'Employee removed successfully');
      },
      error: (error) => {
        this.isEmployeesListLoading = false;
        this.createMessage('error', 'Failed to remove employee');
        console.error(error);
      },
    });
  }
  editEmployee() {
    console.log('Edit employee');
  }
}
