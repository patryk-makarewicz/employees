import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterLink, NgOptimizedImage, NzMenuModule],
})
export class HeaderComponent {
  logoUrl = '/assets/makaDev.png';
  logoAlt = 'makaDev logo';
}
