import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [NgOptimizedImage, ButtonComponent, NzIconModule],
})
export class HomePageComponent {
  logoUrl = '/assets/logo.svg';
  logoAlt = 'Angular logo';

  title = 'Employees App';
  description = 'Hi, this is the app to manage employees';

  constructor(private router: Router) {}

  getStarted() {
    this.router.navigate(['/employees']);
  }
}
