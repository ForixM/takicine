import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly httpClient = inject(HttpClient)
    private readonly url = "http://localhost:8080/users"

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.url);
    }

    getUser(id: number): Observable<User> {
        return this.httpClient.get<User>(`${this.url}/${id}`);
    }

    addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.url, user);
    }

    getUserByEmail(email: string): Observable<User> {
        return this.httpClient.get<User>(`${this.url}/byEmail/${email}`);
    }

    updateUser(user: User): Observable<User> {
        return this.httpClient.put<User>(`${this.url}/${user.id}`, user);
    }

    getReviewsByUserId(userId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.url}/${userId}/reviews`);
    }
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
