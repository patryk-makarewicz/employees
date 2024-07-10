import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonComponent } from '../../button/button.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EmployeesModel } from '../../../service/employees.model';

@Component({
  selector: 'app-modal-remove',
  standalone: true,
  imports: [ButtonComponent, NzModalModule],
  templateUrl: './remove.component.html',
  styleUrl: './remove.component.scss',
})
export class RemoveModalComponent {
  @Input() isRemoveModalVisible = false;
  @Input() employeeData = {} as EmployeesModel;

  @Output() isRemoveModalVisibleChange = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() removeEmployee = new EventEmitter<string>();

  onCloseRemoveModal(): void {
    this.closeModal.emit();
  }

  onRemoveEmployee(id: string): void {
    this.removeEmployee.emit(id);
  }
}
