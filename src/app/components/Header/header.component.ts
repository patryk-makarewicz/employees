import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterLink, NgOptimizedImage],
})
export class HeaderComponent {
  logoUrl = '/assets/makaDev.png';
  logoAlt = 'makaDev logo';
}
