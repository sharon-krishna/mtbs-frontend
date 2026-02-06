import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BookingService {
private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  lockSeats(showId: number, seatIds: number[]) {
    return this.http.post(`${this.apiUrl}/lock/`, {
      show_id: showId,
      seat_ids: seatIds
    });
  }

  releaseSeats() {
    return this.http.post(`${this.apiUrl}/release/`, {});
  }
  
  createBooking(showId: number, seatIds: number[]) {
    return this.http.post<{ booking_id: number }>(
      `${this.apiUrl}/create/`,
      {
        show_id: showId,
        seat_ids: seatIds
      }
    );
  }
}
