import {Component, DestroyRef, inject, OnInit } from '@angular/core';
import {Movie} from "../../models/movie";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MoviesService} from "../../services/movies.service";
import {DatePipe} from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})
export class AddMovieComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
  }

  errorMessages = {
    general: '',
    title: '',
    director: '',
    releaseDate: '',
    synopsis: '',
  };


  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: 0,
    rate: undefined,
    image: undefined
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moviesService.getMovie(+id).subscribe(
        movie => this.movie = movie
      );
    }
  }

  validateForm(): boolean {
    this.errorMessages = {
        general: '',
        title: '',
        director: '',
        releaseDate: '',
        synopsis: ''
    }

    if (!this.movie.title || !this.movie.director || !this.movie.synopsis || !this.movie.releaseDate) {
        this.errorMessages.general = 'Tous les champs doivent être remplis.';
        return false;
    }

    if (!/^[A-Z ]+$/.test(this.movie.title)) {
      this.errorMessages.title = 'Le titre doit être en majuscules.';
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const releaseDate = new Date(this.movie.releaseDate);
    releaseDate.setHours(0, 0, 0, 0);

    if (releaseDate >= today) {
      this.errorMessages.releaseDate = "La date de sortie doit être avant aujourd'hui.";
      return false;
    }

    if (!/^[A-Z][a-zéèêëîïôöûüç\-']+\s[A-Z][a-zéèêëîïôöûüç\-']+$/.test(this.movie.director)) {
      this.errorMessages.director = 'Le nom du réalisateur doit être au format "Prénom Nom".';
      return false;
    }

    if (this.movie.synopsis.length < 30) {
      this.errorMessages.synopsis = 'Le synopsis doit contenir au moins 30 caractères.';
      return false;
    }

    return true;
  }

  addMovie(id?: number): void {
    if (!this.validateForm()) {
      return;
    }

    if (id) {
      this.moviesService.updateMovie(this.movie).subscribe(
          () => {
            this.toastr.success('Film mis à jour !', 'Succès');
            this.router.navigate(['/movies']);
          }
      );
    } else {
      this.moviesService.addMovie(this.movie).subscribe(
          () => {
            this.toastr.success('Nouveau film ajouté !', 'Succès');
            this.router.navigate(['/movies']);
          }
      );
    }
  }

  onReleaseDateChange(newDate: Date) {
    this.movie.releaseDate = newDate;
  }
}
