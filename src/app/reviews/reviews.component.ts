import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UsersService} from "../services/users.service";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {ReviewsService} from "../services/reviews.service";
import {Review} from "../models/review";
import {routes} from "../app.routes";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    DatePipe,
    FormsModule
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  private readonly reviewsService = inject(ReviewsService);
  reviews$: Observable<Review[]> = this.reviewsService.getReviews();

  protected readonly routes = routes;
  selectedYear: string | undefined = "ALL";

  years: string[] = ["ALL"];
  onFilterChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    const newValue = selectElement.value;
    console.log(newValue);
    if (newValue === "ALL"){
      this.reviews$ = this.reviewsService.getReviews();
    } else {
      this.reviews$ = this.reviewsService.getReviewsByYear(newValue);
    }
  };

  ngOnInit(){
    this.reviewsService.getReviews().subscribe(reviews => {
      for (let review of reviews) {
        const year: string | undefined = review.reviewDate?.toString().split('-')[0]
        console.log(year!);
        if (!this.years.includes(year!)) {
          this.years.push(year!);
        }
      }
    })
  }

  deleteReview(id: number | undefined): void {
    this.reviewsService.deleteReview(id!).subscribe(
      () => this.reviews$ = this.reviewsService.getReviews()
    );
  }
}
