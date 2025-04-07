import {Injectable, Output} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private searchSubject = new BehaviorSubject<string>('');
    search$ = this.searchSubject.asObservable();

    @Output()
    SetSearchQuery(query: string)
    {
        this.searchSubject.next(query);
    }
}
