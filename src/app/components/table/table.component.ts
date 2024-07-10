import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EmployeesModel } from '../../service/employees.model';
import { RemoveModalComponent } from '../modals/remove/remove.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NzTableModule, NzDividerModule, NzButtonModule, NzIconModule, RemoveModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() employeesList: EmployeesModel[] = [];
  @Input() isEmployeesListLoading = false;

  @Output() editEmployee = new EventEmitter<string>();
  @Output() openRemoveEmployeeModal = new EventEmitter<EmployeesModel>();

  onEditEmployee(id: string): void {
    this.editEmployee.emit(id);
  }

  onOpenRemoveModal(employee: EmployeesModel) {
    this.openRemoveEmployeeModal.emit(employee);
  }
}
