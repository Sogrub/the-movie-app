import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { CurrencyPipe, PercentPipe, isPlatformBrowser } from '@angular/common';
import { IDetailMovie } from '../../shared/services/movie.models';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';
import { PersonalIconsComponent } from '../../shared/components/personal-icons/personal-icons.component';
import { TimeConverterPipe } from '../../shared/pipes/time-converter.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormatDatePipe, PersonalIconsComponent, TimeConverterPipe, CurrencyPipe, PercentPipe],
  providers: [MovieService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  movie: IDetailMovie | undefined;
  favoriteMovies: number[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activatedRoute.params.subscribe(params => {
        this.getDetailsMovie(params['id']);
        this.getFavoritesMovie();
      });
    }
  }

  getDetailsMovie(id: number) {
    this.movieService.detailMovie(id).subscribe({
      next: (detailMovie) => {
        this.movie = detailMovie;
      }
    })
  }

  getFavoritesMovie() {
    this.movieService.getFavorites().subscribe({
      next: ({ total_pages }) => {
        for (let i = 1; i <= total_pages; i++) {
          this.movieService.getFavorites(i).subscribe({
            next: ({ results }) => {
              this.favoriteMovies.push(...results.map(result => result.id));
            }
          })
        }
      }
    })
  }

  addFavorite() {
    this.movieService.editFavorite(this.movie!.id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          position: 'top-right',
          title: 'Favorito agregado exitosamente',
          showConfirmButton: false,
          timer: 2000,
        })
        this.favoriteMovies= [];
        this.getFavoritesMovie();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          position: 'top-right',
          title: 'Favorito no agregado exitosamente',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    })
  }

  removeFavorite() {
    this.movieService.editFavorite(this.movie!.id, false).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          position: 'top-right',
          title: 'Favorito eliminado exitosamente',
          showConfirmButton: false,
          timer: 2000,
        })
        this.favoriteMovies= [];
        this.getFavoritesMovie();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          position: 'top-right',
          title: 'Favorito no elimnado exitosamente',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    })
  }
}
