import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  constructor(
      private userService: UsersService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private toastr: ToastrService,
  ) {}

  email: string = '';

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  validateForm(): boolean {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      this.toastr.error('L\'adresse e-mail doit être valide.', 'Erreur');
      return false;
    }
    return true;
  }

  login(): void {
    if (!this.validateForm()) {
      return;
    }
    this.userService.getUserByEmail(this.email).subscribe({
      next: (user) => {
        if (user) {
          this.authService.login(user);
          this.toastr.success('Connexion réussie.', 'Succès');
          this.router.navigate(['/profile']);
        } else {
          this.toastr.error('Utilisateur non trouvé.', 'Erreur');
        }
      },
      error: () => {
        this.toastr.error('Erreur lors de la connexion.', 'Erreur');
      }
    });
  }
}
