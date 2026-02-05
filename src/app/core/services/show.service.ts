import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Show } from '../models/show.model';


@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private apiUrl = `${environment.apiUrl}/shows/`;

  constructor(private http: HttpClient) {}

  getShowsByMovie(movieId: number) {
    return this.http.get<Show[]>(`${this.apiUrl}?movie=${movieId}`);
}
}
