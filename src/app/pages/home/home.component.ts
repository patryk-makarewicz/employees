import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [NgOptimizedImage],
})
export class HomePageComponent {
  logoUrl = '/assets/logo.svg';
  logoAlt = 'Angular logo';

  title = 'Employees App';
  description = 'Hi, this is app to manage employees 🎉';
}
