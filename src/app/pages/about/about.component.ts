import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [NzIconModule, NzCardModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutPageComponent {
  logoUrl = '/assets/me.jpg';
  logoAlt = 'My photo';
  imageUrl = 'cover.png';
  imageAlt = 'Image makaDev';
  githubUrl = '/assets/github.svg';
  githubAlt = 'Image makaDev';
  linkedInUrl = '/assets/linkedin.svg';
  linkedInAlt = 'Image makaDev';
}
