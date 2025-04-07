import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);

    constructor() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(user: User): void {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    logout(): void {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        return this.currentUserSubject.asObservable();
    }

    isLoggedIn() {
        return this.currentUserSubject.value !== null;
    }
}
