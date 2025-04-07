import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule, TitleCasePipe} from "@angular/common";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {UsersService} from "../services/users.service";
import {AuthService} from "../services/auth.service";
import {FormsModule} from '@angular/forms';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
      FormsModule,
    TitleCasePipe,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user$: Observable<User | null>;

  constructor( private authService: AuthService,
               private searchService: SearchService
  ) {
    this.user$ = this.authService.getCurrentUser();
  }
  @Input({ required: true }) title! : string
  searchQuery = '';

  onSearch(): void {
    console.log('Search for:', this.searchQuery);
    this.searchService.SetSearchQuery(this.searchQuery);
  }
}






