import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IMovie } from '../../shared/services/movie.models';
import { MovieService } from '../../shared/services/movie.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PersonalIconsComponent } from '../../shared/components/personal-icons/personal-icons.component';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-movies',
  standalone: true,
  imports: [PersonalIconsComponent, FormatDatePipe, CommonModule, FormsModule],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.scss'
})
export class SearchMoviesComponent {
  movies: IMovie[] | undefined;
  page: number = 1;
  maxPages: number = 1;
  currentQuery: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getSearchMovies(this.currentQuery, this.page)
    }
  }

  getSearchMovies(query: string, page: number) {
    this.movieService.getMoviesByName(query, page).subscribe({
      next: ({ results, total_pages }) => {
        this.movies = results;
        this.maxPages = total_pages > 500 ? 500 : total_pages;
      }
    })
  }

  searchMovies($event: any) {
    const value = $event.target.value;
    if (value.length > 2) {
      this.movies = undefined;
      this.getSearchMovies(value, this.page);
    } else {
      this.getSearchMovies('', this.page);
    }
  }

  setPage(page: number) {
    this.page = page;
    this.movies = undefined;
    this.getSearchMovies(this.currentQuery, this.page)
  }
  
  lessPage() {
    const newPage = this.page - 1;
    this.page = newPage < 1 ? 1: newPage;
    this.movies = undefined;
    this.getSearchMovies(this.currentQuery, this.page)
  }  

  addPage() {
    const newPage = this.page + 1;
    this.page = newPage > this.maxPages ? this.maxPages: newPage;
    this.movies = undefined;
    this.getSearchMovies(this.currentQuery, this.page)
  }

  detailMovie(movie: IMovie) {
    this.router.navigate(['/detalle', movie.id])
  }
}
