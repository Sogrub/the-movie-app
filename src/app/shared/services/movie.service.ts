import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IDetailMovie, IRequestMovie } from './movie.models';
import { HttpClient } from '@angular/common/http';

const URI = env.uri;
const TOKEN = env.token;
const ACCOUNT_ID = env.account_id;

const HEADERS = {
  accept: 'application/json',
  Authorization: `Bearer ${TOKEN}`
}

let config = {
  headers: HEADERS,
  params: {}
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  constructor(private httpClient: HttpClient) {}

  getPopular(page?: number): Observable<IRequestMovie> {
    config.params = {
      language: 'es',
      page: page || 1
    }
    return this.httpClient.get<IRequestMovie>(`${URI}/movie/popular`, config)
  }

  getFavorites(page?: number): Observable<IRequestMovie> {
    config.params = {
      language: 'es',
      page: page || 1,
      sort_by: 'created_at.desc'
    }
    return this.httpClient.get<IRequestMovie>(`${URI}/account/${ACCOUNT_ID}/favorite/movies`, config)
  }

  editFavorite(id: number, favorite: boolean = true): Observable<IRequestMovie> {
    const options = {
      media_type: 'movie',
      media_id: id,
      favorite
    }
    return this.httpClient.post<IRequestMovie>(`${URI}/account/${ACCOUNT_ID}/favorite`, options, config)
  }

  detailMovie(id: number): Observable<IDetailMovie> {
    config.params = {
      language: 'es'
    }
    return this.httpClient.get<IDetailMovie>(`${URI}/movie/${id}`, config)
  }

  getMoviesByName(query: string, page?: number): Observable<IRequestMovie> {
    config.params = {
      query,
      language: 'es',
      page: page || 1
    }
    return this.httpClient.get<IRequestMovie>(`${URI}/search/movie`, config)
  }
}
