import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { EmployeesModel, RemoveEmployeeModel } from '../../service/employees.model';
import { EmployeesService } from '../../service/employees.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { ButtonComponent } from '../../components';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

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
    NzModalModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesPageComponent implements OnInit {
  employeesList: EmployeesModel[] = [];
  isEmployeesListLoading = true;

  constructor(
    private employees_service: EmployeesService,
    private message: NzMessageService,
    private fb: NonNullableFormBuilder
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

  createEmployeeForm: FormGroup<{
    name: FormControl<string>;
    surname: FormControl<string>;
    position: FormControl<string>;
    fte: FormControl<number>;
    salary: FormControl<number>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    position: ['', [Validators.required]],
    fte: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    salary: [0, [Validators.required, Validators.min(0), Validators.max(1000000)]],
  });

  addEmployee(): void {
    if (this.createEmployeeForm.valid) {
      this.isEmployeesListLoading = true;
      this.employees_service
        .addEmployee({
          records: [
            {
              fields: {
                name: this.createEmployeeForm.value.name!,
                surname: this.createEmployeeForm.value.surname!,
                position: this.createEmployeeForm.value.position!,
                fte: this.createEmployeeForm.value.fte! / 100,
                salary: this.createEmployeeForm.value.salary!,
              },
            },
          ],
        })
        .subscribe({
          next: () => {
            this.getEmployeesList();
            this.createMessage('success', 'Employee added successfully');
            this.createEmployeeForm.reset();
          },
          error: (error) => {
            this.isEmployeesListLoading = false;
            this.createMessage('error', 'Failed to add employee');
            console.error(error);
          },
        });
      console.log('submit', this.createEmployeeForm.value);
      this.isModalAddEmployeeVisible = false;
    } else {
      Object.values(this.createEmployeeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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

  isModalAddEmployeeVisible = false;
  openAddEmployeeModal(): void {
    this.isModalAddEmployeeVisible = true;
  }

  onCloseAddEmployeeModal(): void {
    this.isModalAddEmployeeVisible = false;
    this.createEmployeeForm.reset();
  }
}
