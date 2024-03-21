import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PersonalIconsComponent } from '../../shared/components/personal-icons/personal-icons.component';
import { MovieService } from '../../shared/services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { PercentPipe, isPlatformBrowser } from '@angular/common';
import { IMovie } from '../../shared/services/movie.models';
import { Router } from '@angular/router';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PersonalIconsComponent, FormatDatePipe, PercentPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies: IMovie[] | undefined;
  page: number = 1;
  maxPages: number = 1;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getPopularMovies(this.page)
    }
  }

  getPopularMovies(page: number) {
    this.movieService.getPopular(page).subscribe({
      next: ({ results, total_pages }) => {
        this.movies = results;
        this.maxPages = total_pages > 500 ? 500 : total_pages;
      }
    })
  }

  setPage(page: number) {
    this.page = page;
    this.movies = undefined;
    this.getPopularMovies(this.page)
  }
  
  lessPage() {
    const newPage = this.page - 1;
    this.page = newPage < 1 ? 1: newPage;
    this.movies = undefined;
    this.getPopularMovies(this.page)
  }  

  addPage() {
    const newPage = this.page + 1;
    this.page = newPage > 500 ? 500: newPage;
    this.movies = undefined;
    this.getPopularMovies(this.page)
  }

  detailMovie(movie: IMovie) {
    this.router.navigate(['/detalle', movie.id])
  }
}
