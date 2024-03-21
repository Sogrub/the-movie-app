import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonalIconsComponent } from '../personal-icons/personal-icons.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PersonalIconsComponent, RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  theme: 'dark' | 'light' = 'dark';

  OPTIONS = [
    {
      title: 'Inicio',
      label: 'Home',
      url: '/'
    },
    {
      title: 'Favoritos',
      label: 'favorites',
      url: '/favoritos'
    }
  ]
  @ViewChild('headerComponent') header!: ElementRef<HTMLHeadElement>
  
  eventSubscribe$!: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    if (isPlatformBrowser(this.platformId)) {
      this.changeThemeMode()
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    let scrollPosition = document.documentElement.scrollTop;
    
    if (scrollPosition > 100) {
      this.header.nativeElement.classList.add('backdrop-blur-md')
    } else {
      this.header.nativeElement.classList.remove('backdrop-blur-md')
    }
  }

  changeThemeMode() {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      this.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark')
      this.theme = 'light';
    }
  }

  changeTheme() {
    const newTheme = this.theme == 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    this.changeThemeMode()
  }
}
