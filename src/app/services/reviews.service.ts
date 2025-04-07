import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Review} from "../models/review";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly httpClient = inject(HttpClient)
  private readonly url = `http://localhost:8080/reviews`
  getReviews(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.url);
  }

  getReviewsByYear(year: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.url}/byYear/${year}`);
  }

  deleteReview(id: number): Observable<any> {
    return this.httpClient.delete<Review>(`${this.url}/${id}`);
  }
}
