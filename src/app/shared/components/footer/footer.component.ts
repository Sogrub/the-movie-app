import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  sources = [
    {
      title: 'Tabler Icons',
      url: 'https://tablericons.com/'
    },
    {
      title: 'Tailwind',
      url: 'https://tailwindcss.com/'
    },
    {
      title: 'Pure CSS Loaders',
      url: 'https://loading.io/css/'
    },
    {
      title: 'TMDB',
      url: 'https://www.themoviedb.org/'
    }
  ]

}
