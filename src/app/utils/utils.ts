import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';

export const toastMessage = (messageService: NzMessageService, type: string, content: string): void => {
  messageService.create(type, content);
};

export const handleError = (messageService: NzMessageService, errorMessage: string) => {
  return (error: string) => {
    toastMessage(messageService, 'error', errorMessage);
    console.error(error);
    return of(null);
  };
};

export const resetFormAndCloseModal = (form: FormGroup, setIsModalVisible: (visible: boolean) => void): void => {
  form.reset();
  setIsModalVisible(false);
};

export const validateForm = (form: FormGroup): boolean => {
  if (form.invalid) {
    Object.values(form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
    return false;
  }
  return true;
};

export const getEmployeeFormFields = (form: FormGroup) => {
  return {
    name: form.value.name!,
    surname: form.value.surname!,
    position: form.value.position!,
    fte: form.value.fte! / 100,
    salary: form.value.salary!,
  };
};
