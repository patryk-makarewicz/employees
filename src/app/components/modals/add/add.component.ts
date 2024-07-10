import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../../button/button.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddModalComponent {
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  @Input() editingEmployeeId: string | null = null;
  @Input() isSaveLoading = false;
  @Input() isEmployeeDataLoading = false;
  @Input() createEmployeeForm!: FormGroup;

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveEmployee = new EventEmitter<void>();

  onCloseModal(): void {
    this.closeModal.emit();
  }

  onSaveEmployee(): void {
    this.saveEmployee.emit();
  }
}
