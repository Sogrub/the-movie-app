import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IMovie } from '../../shared/services/movie.models';
import { MovieService } from '../../shared/services/movie.service';
import { PercentPipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PersonalIconsComponent } from '../../shared/components/personal-icons/personal-icons.component';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [PersonalIconsComponent, FormatDatePipe, PercentPipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  movies: IMovie[] | undefined;
  page: number = 1;
  maxPages: number = 1;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private MovieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getFavoritesMovies(this.page)
    }
  }

  getFavoritesMovies(page: number) {
    this.MovieService.getFavorites(page).subscribe({
      next: ({ results, total_pages }) => {
        this.movies = results;
        this.maxPages = total_pages > 500 ? 500 : total_pages;
      }
    })
  }

  setPage(page: number) {
    this.page = page;
    this.movies = undefined;
    this.getFavoritesMovies(this.page)
  }
  
  lessPage() {
    const newPage = this.page - 1;
    this.page = newPage < 1 ? 1: newPage;
    this.movies = undefined;
    this.getFavoritesMovies(this.page)
  }  

  addPage() {
    const newPage = this.page + 1;
    this.page = newPage > this.maxPages ? this.maxPages: newPage;
    this.movies = undefined;
    this.getFavoritesMovies(this.page)
  }

  detailMovie(movie: IMovie) {
    this.router.navigate(['/detalle', movie.id])
  }
}
