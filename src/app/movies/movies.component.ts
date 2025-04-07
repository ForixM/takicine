import {Component, inject} from '@angular/core';
import {MoviesService} from "../services/movies.service";
import {Observable} from "rxjs";
import {Movie} from "../models/movie";
import {AsyncPipe, CommonModule, DatePipe} from "@angular/common";
import {MovieComponent} from "../home/movie/movie.component";
import {routes} from "../app.routes";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-movies',
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  imports: [AsyncPipe, DatePipe, MovieComponent, RouterLink, CommonModule,
    FormsModule],

})
export class MoviesComponent {
  private readonly moviesService = inject(MoviesService);
  movies$: Observable<Movie[]> = this.moviesService.getMovies();
  private toastr: ToastrService;

  constructor() {
    this.toastr = inject(ToastrService);
  }

  protected readonly routes = routes;

  deleteMovie(id: number | undefined): void {
    this.moviesService.deleteMovie(id).subscribe(
      () => {
        this.toastr.success('Film supprimé !', 'Succès');
        this.movies$ = this.moviesService.getMovies()
      }
    );
  }

  addImage(id: number | undefined): void {
    this.moviesService.addImage(id).subscribe(
      () => this.movies$ = this.moviesService.getMovies()
    );
  }
}
