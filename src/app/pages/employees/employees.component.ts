import { Component, OnInit } from '@angular/core';

import { EmployeesModel } from '../../service/employees.model';
import { EmployeesService } from '../../service/employees.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { ButtonComponent, TableComponent } from '../../components';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    NzMessageModule,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    TableComponent,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesPageComponent implements OnInit {
  employeesList: EmployeesModel[] = [];
  isEmployeesListLoading = true;
  isEmployeeDataLoading = false;
  isSaveLoading = false;
  editingEmployeeId: string | null = null;
  isModalAddEmployeeVisible = false;

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

  saveEmployee(): void {
    if (this.createEmployeeForm.valid) {
      if (this.editingEmployeeId) {
        this.editEmployee();
      } else {
        this.addEmployee();
      }
    } else {
      Object.values(this.createEmployeeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  addEmployee(): void {
    this.isEmployeesListLoading = true;
    this.isSaveLoading = true;
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
          this.isModalAddEmployeeVisible = false;
          this.isSaveLoading = false;
        },
        error: (error) => {
          this.isEmployeesListLoading = false;
          this.isSaveLoading = false;
          this.createMessage('error', 'Failed to add employee');
          console.error(error);
        },
      });
  }

  removeEmployee(id: string) {
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

  getEmployee(id: string) {
    this.isModalAddEmployeeVisible = true;
    this.isEmployeeDataLoading = true;
    this.editingEmployeeId = id;
    this.employees_service.getEmployee(id).subscribe({
      next: (employee) => {
        this.createEmployeeForm.patchValue({
          name: employee.fields.name,
          surname: employee.fields.surname,
          position: employee.fields.position,
          fte: employee.fields.fte * 100,
          salary: employee.fields.salary,
        });
        this.isEmployeeDataLoading = false;
      },
      error: (error) => {
        this.isEmployeeDataLoading = false;
        this.createMessage('error', 'Failed to get employee data');
        console.error(error);
      },
    });
  }

  editEmployee(): void {
    this.isEmployeesListLoading = true;
    this.isSaveLoading = true;
    this.employees_service
      .editEmployee({
        records: [
          {
            id: this.editingEmployeeId!,
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
          this.createMessage('success', 'Employee edited successfully');
          this.createEmployeeForm.reset();
          this.isModalAddEmployeeVisible = false;
          this.isSaveLoading = false;
          this.editingEmployeeId = null;
        },
        error: (error) => {
          this.isEmployeesListLoading = false;
          this.isSaveLoading = false;
          this.createMessage('error', 'Failed to edit employee');
          console.error(error);
        },
      });
  }

  openAddEmployeeModal(): void {
    this.isModalAddEmployeeVisible = true;
    this.editingEmployeeId = null;
    this.createEmployeeForm.reset();
  }

  onCloseAddEmployeeModal(): void {
    this.isModalAddEmployeeVisible = false;
    this.createEmployeeForm.reset();
    this.editingEmployeeId = null;
  }
}
