import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { SeatAvailability } from '../models/seat.model';


@Injectable({
  providedIn: 'root',
})
export class SeatService {
    private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  getSeatAvailability(showId: number) {
    return this.http.get<SeatAvailability[]>(
      `${this.apiUrl}/availability/${showId}/`
    );
  }
}
