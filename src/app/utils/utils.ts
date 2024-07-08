import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';

export function toastMessage(messageService: NzMessageService, type: string, content: string): void {
  messageService.create(type, content);
}

export function handleError(messageService: NzMessageService, errorMessage: string) {
  return (error: string) => {
    toastMessage(messageService, 'error', errorMessage);
    console.error(error);
    return of(null);
  };
}

export function resetFormAndCloseModal(form: FormGroup, setIsModalVisible: (visible: boolean) => void): void {
  form.reset();
  setIsModalVisible(false);
}
