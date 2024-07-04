import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutPageComponent {}
