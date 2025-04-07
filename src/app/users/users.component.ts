import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MoviesService} from "../services/movies.service";
import {Observable} from "rxjs";
import {routes} from "../app.routes";
import {Movie} from "../models/movie";
import {UsersService} from "../services/users.service";
import {User} from "../models/user";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private readonly usersService = inject(UsersService);
  users$: Observable<User[]> = this.usersService.getUsers();

  protected readonly routes = routes;

  deleteUser(id: number | undefined): void {
    this.usersService.deleteUser(id!).subscribe(
      () => this.users$ = this.usersService.getUsers()
    );
  }
  //
  // addImage(id: number | undefined): void {
  //   this.moviesService.addImage(id).subscribe(
  //     () => this.movies$ = this.moviesService.getMovies()
  //   );
  // }
}
