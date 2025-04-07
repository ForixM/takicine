import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import {SearchService} from '../services/search.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import {AsyncPipe, DatePipe, NgForOf} from '@angular/common';
import {MovieComponent} from "./movie/movie.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css'],
    imports: [AsyncPipe, DatePipe, MovieComponent, NgForOf],
})


export class HomeComponent {

  movies$: Observable<Movie[]> = this.moviesService.getMovies();

  constructor(
      private moviesService: MoviesService,
      private searchService: SearchService
  ) {}

    trackByMovieId(index: number, movie: Movie): number | undefined
    {
        return movie.id;
    }

  ngOnInit(): void {
      console.log('Started ngOnInit');
      this.searchService.search$.subscribe((query) => {
          this.updateMovies();
      });
      this.updateMovies();

  }

  updateMovies(): void {
      console.log('Update Movies');
      this.movies$ = combineLatest([
          this.moviesService.getMovies(),
          this.searchService.search$
      ]).pipe(
          map(([movies, searchQuery]) => {
              if (!searchQuery) {
                  return movies;
              }
              return movies.filter(movie =>
                  movie.title.toLowerCase().includes(searchQuery.toLowerCase())
              );
          })
      );

  }



}
