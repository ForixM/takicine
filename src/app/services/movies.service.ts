import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "../models/movie";
import {filter, map, Observable, tap} from "rxjs";
import {Review} from "../models/review";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly httpClient = inject(HttpClient)
  private readonly url = `http://localhost:8080/movies`

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url);
  }

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.url}/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(this.url, movie);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.put<Movie>(`${this.url}/${movie.id}`, movie);
  }

  deleteMovie(id: number | undefined): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  addImage(id: number | undefined): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${id}/image`, {});
  }

  getMovieReviews(id: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.url}/${id}/reviews`, {});
  }
}
