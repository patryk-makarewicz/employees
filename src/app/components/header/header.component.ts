import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd, Event } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterLink, NgOptimizedImage, NzMenuModule],
})
export class HeaderComponent implements OnInit {
  logoUrl = '/assets/makaDev.png';
  logoAlt = 'makaDev logo';
  currentRoute = '/';

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe((url: string) => {
        this.currentRoute = url;
      });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
