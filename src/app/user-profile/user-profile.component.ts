import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../models/user";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user$: Observable<User | null>;

  constructor(
      private userService: UsersService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private toastr: ToastrService,
) {
    this.user$ = this.authService.getCurrentUser();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
