import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MoviesComponent} from "./movies/movies.component";
import {AddMovieComponent} from "./movies/add-movie/add-movie.component";
import {UserSignupComponent} from "./user-signup/user-signup.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {AdminComponent} from "./admin/admin.component";
import {UsersComponent} from "./users/users.component";
import {ReviewsComponent} from "./reviews/reviews.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'add-movie', component: AddMovieComponent},
  { path: 'add-movie/:id', component: AddMovieComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'users', component: UsersComponent},
  { path: 'reviews', component: ReviewsComponent},
  { path: 'signup', component: UserSignupComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'profile', component: UserProfileComponent}
];
