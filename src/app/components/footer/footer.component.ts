import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [NgOptimizedImage],
})
export class FooterComponent {
  logoUrl = '/assets/makaDev.png';
  logoAlt = 'makaDev logo';
  currentYear: number = new Date().getFullYear();
}
