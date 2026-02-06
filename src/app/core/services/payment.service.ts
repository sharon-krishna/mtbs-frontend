import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  createPayment(bookingId: number) {
    return this.http.post<{
      gateway_order_id: string;
      amount: number;
    }>(`${this.apiUrl}/create/`, {
      booking_id: bookingId
    });
  }
}
