import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [NgOptimizedImage, ButtonComponent],
})
export class HomePageComponent {
  logoUrl = '/assets/logo.svg';
  logoAlt = 'Angular logo';

  title = 'Employees App';
  description = 'Hi, this is app to manage employees 🎉';

  getStarted() {
    console.log('logged');
  }
}
