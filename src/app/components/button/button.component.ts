import { Component, Input } from '@angular/core';
import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() nzType: NzButtonType = 'primary';
  @Input() label = 'Label';
  @Input() nzDanger = 'false';
  @Input() nzGhost = 'false';
  @Input() disabled = 'false';
  @Input() nzLoading = 'false';
}
