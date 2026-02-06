import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { PaymentService } from '../../../core/services/payment.service';


@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
bookingId!: number;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.bookingId = Number(this.route.snapshot.paramMap.get('id'));
  }

  pay() {
    this.paymentService.createPayment(this.bookingId).subscribe({
      next: () => {
        alert('Payment initiated. Backend webhook will confirm.');
        this.router.navigate(['/confirmation']);
      }
    });
  }

  fail() {
    alert('Payment failed');
    this.router.navigate(['/']);
  }
}
