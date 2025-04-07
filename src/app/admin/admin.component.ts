import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ChartType} from "chart.js";
import {Chart} from "chart.js/auto";
import {MoviesService} from "../services/movies.service";
import {UsersService} from "../services/users.service";
import {ReviewsService} from "../services/reviews.service";
import {Movie} from "../models/movie";
import {lastValueFrom} from "rxjs";
import {Review} from "../models/review";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  public labels = ['film1', 'film2', 'film3'];
  public data = [
    {data: [2, 10, 5]}
  ]
  public chartType: ChartType = 'line';

  private readonly moviesService = inject(MoviesService);
  private readonly usersService = inject(UsersService);
  private readonly reviewsService = inject(ReviewsService);

  moviesAmount: number = 0;
  usersAmount: number = 0;
  reviewsAmount: number = 0;
  reviewsAverage: number = 0;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartReviewsAmount') chartReviewsAmount!: ElementRef<HTMLCanvasElement>;

  async ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => {
      this.moviesAmount = movies.length;
    });
    this.usersService.getUsers().subscribe(users => {
      this.usersAmount = users.length;
    });
    this.reviewsService.getReviews().subscribe(reviews => {
      this.reviewsAmount = reviews.length;
    });
    const movies: Movie[] = await lastValueFrom(this.moviesService.getMovies());

    const reviewsRateAverage: number[] = [];
    const filmTitles: string[] = [];

    const reviewsAmount: number[] = [];
    let counter = 0;
    for (let movie of movies) {
      const reviews: Review[] = await lastValueFrom(this.moviesService.getMovieReviews(movie.id));
      if (movie.rate === null){
        continue;
      }
      counter++;
      this.reviewsAverage += reviews.length;
      reviewsAmount.push(reviews.length);
      reviewsRateAverage.push(movie.rate!);
      filmTitles.push(movie.title);
    }
    this.reviewsAverage = Number((this.reviewsAverage/counter).toFixed(2));
    new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: filmTitles,
        datasets: [{
          label: 'Movie rates',
          data: reviewsRateAverage
        }]
      },
      options: {
        responsive: true
      }
    });

    new Chart(this.chartReviewsAmount.nativeElement, {
      type: 'bar',
      data: {
        labels: filmTitles,
        datasets: [{
          label: 'Number of reviews',
          data: reviewsAmount
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
