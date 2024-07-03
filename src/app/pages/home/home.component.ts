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

  title = 'Angular Training App';
  description = 'Hi, this is my training app 🎉';
}
