import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EmployeesModel } from '../../service/employees.model';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ButtonComponent } from '../button/button.component';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NzTableModule, NzDividerModule, NzButtonModule, NzIconModule, NzModalModule, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  isRemoveModalVisible = false;
  employeeData = {} as EmployeesModel;

  @Input() employeesList: EmployeesModel[] = [];
  @Input() isEmployeesListLoading = false;

  @Output() editEmployee = new EventEmitter<string>();
  @Output() removeEmployee = new EventEmitter<string>();

  onEditEmployee(id: string): void {
    this.editEmployee.emit(id);
  }

  onRemoveEmployee(id: string): void {
    this.removeEmployee.emit(id);
    this.isRemoveModalVisible = false;
  }

  onOpenRemoveModal(employee: EmployeesModel): void {
    this.isRemoveModalVisible = true;
    this.employeeData = employee;
  }

  onCloseRemoveModal(): void {
    this.isRemoveModalVisible = false;
  }
}
