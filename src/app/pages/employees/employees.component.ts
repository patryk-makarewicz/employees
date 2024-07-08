import { Component, OnInit } from '@angular/core';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EmployeesModel } from '../../service/employees.model';
import { EmployeesService } from '../../service/employees.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { ButtonComponent, TableComponent, ModalComponent } from '../../components';
import { FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { toastMessage, handleError, resetFormAndCloseModal } from '../../utils';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [NzMessageModule, ButtonComponent, TableComponent, ModalComponent],
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
    private employeesService: EmployeesService,
    private message: NzMessageService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit() {
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.isEmployeesListLoading = true;
    this.employeesService
      .getEmployeesList()
      .pipe(
        tap((employeesList) => {
          this.employeesList = employeesList.records;
        }),
        catchError(handleError(this.message, 'Failed to load employees')),
        finalize(() => {
          this.isEmployeesListLoading = false;
        })
      )
      .subscribe();
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

    this.employeesService
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
      .pipe(
        tap(() => toastMessage(this.message, 'success', 'Employee added successfully')),
        switchMap(() => this.employeesService.getEmployeesList()),
        tap((employeesList) => {
          this.employeesList = employeesList.records;
        }),
        catchError(handleError(this.message, 'Failed to add employee')),
        finalize(() => {
          this.isEmployeesListLoading = false;
          this.isSaveLoading = false;
          resetFormAndCloseModal(
            this.createEmployeeForm,
            (visible: boolean) => (this.isModalAddEmployeeVisible = visible)
          );
        })
      )
      .subscribe();
  }

  removeEmployee(id: string) {
    this.isEmployeesListLoading = true;

    this.employeesService
      .removeEmployee(id)
      .pipe(
        tap(() => {
          toastMessage(this.message, 'success', 'Employee removed successfully');
        }),
        switchMap(() => this.employeesService.getEmployeesList()),
        tap((employeesList) => {
          this.employeesList = employeesList.records;
        }),
        catchError((error) => {
          toastMessage(this.message, 'error', 'Failed to remove employee');
          console.error(error);
          return of(null);
        }),
        finalize(() => {
          this.isEmployeesListLoading = false;
        })
      )
      .subscribe();
  }

  getEmployee(id: string) {
    this.isModalAddEmployeeVisible = true;
    this.isEmployeeDataLoading = true;
    this.editingEmployeeId = id;

    this.employeesService
      .getEmployee(id)
      .pipe(
        tap((employee) => {
          this.createEmployeeForm.patchValue({
            name: employee.fields.name,
            surname: employee.fields.surname,
            position: employee.fields.position,
            fte: employee.fields.fte * 100,
            salary: employee.fields.salary,
          });
        }),
        catchError(handleError(this.message, 'Failed to get employee data')),
        finalize(() => {
          this.isEmployeeDataLoading = false;
        })
      )
      .subscribe();
  }

  editEmployee(): void {
    this.isEmployeesListLoading = true;
    this.isSaveLoading = true;

    const employeeData = {
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
    };

    this.employeesService
      .editEmployee(employeeData)
      .pipe(
        tap(() => {
          toastMessage(this.message, 'success', 'Employee edited successfully');
        }),
        switchMap(() => this.employeesService.getEmployeesList()),
        tap((employeesList) => {
          this.employeesList = employeesList.records;
        }),
        catchError(handleError(this.message, 'Failed to edit employee')),
        finalize(() => {
          this.isEmployeesListLoading = false;
          this.isSaveLoading = false;
          resetFormAndCloseModal(
            this.createEmployeeForm,
            (visible: boolean) => (this.isModalAddEmployeeVisible = visible)
          );
          this.editingEmployeeId = null;
        })
      )
      .subscribe();
  }

  openAddEmployeeModal(): void {
    this.isModalAddEmployeeVisible = true;
    this.editingEmployeeId = null;
    this.createEmployeeForm.reset();
  }

  onCloseAddEmployeeModal(): void {
    resetFormAndCloseModal(this.createEmployeeForm, (visible: boolean) => (this.isModalAddEmployeeVisible = visible));
    this.editingEmployeeId = null;
  }
}
