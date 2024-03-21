import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detalle/:id',
    component: DetailsComponent
  },
  {
    path: 'favoritos',
    component: FavoritesComponent
  },
  {
    path: 'buscar',
    component: SearchMoviesComponent
  }
];
