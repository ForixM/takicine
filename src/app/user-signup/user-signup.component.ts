import { Component } from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UsersService} from "../services/users.service";
import {User} from "../models/user";

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  constructor(
      private userService: UsersService,
      private router: Router,
      private route: ActivatedRoute,
      private toastr: ToastrService,
  ) {}

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    points: 0,
  }

  errorMessages = {
    general: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  };

  goToLogin() {
    this.router.navigate(['/login']);
  }

  validateForm(): boolean {
    this.errorMessages = {
      general: '',
      firstName: '',
      lastName: '',
      email: '',
      age: ''
    };

    if (!this.user.firstName || !this.user.lastName || !this.user.email || this.user.age <= 0) {
        this.errorMessages.general = 'Tous les champs doivent être remplis.';
        return false;
    }

    if (!/^[A-Z][a-zéèêëîïôöûüç\-']+$/.test(this.user.firstName)) {
      this.errorMessages.firstName = 'Prénom invalide';
      return false;
    }

    if (!/^[A-Z][a-zéèêëîïôöûüç\-']+$/.test(this.user.lastName)) {
      this.errorMessages.lastName = 'Nom invalide';
      return false;
    }

    if (this.user.age < 13) {
        this.errorMessages.age = 'L\'âge doit être supérieur ou égal à 13 ans.';
        return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.user.email)) {
        this.errorMessages.email = 'Email invalide';
        return false;
    }
    return true;
  }

  addUser(): void {
    if (!this.validateForm()) {
      return;
    }
    this.userService.addUser(this.user).subscribe(() => {
      this.toastr.success('Compte créé avec succès', 'Succès');
      this.router.navigate(['/']);
    });
  }
}
