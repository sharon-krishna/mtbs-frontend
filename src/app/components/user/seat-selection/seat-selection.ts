import { Component, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

import { SeatSocketService } from '../../../core/services/seat-socket.service';
import { BookingService } from '../../../core/services/booking.service';
import { SeatAvailability } from '../../../core/models/seat.model';
import { SeatService } from '../../../core/services/seat.service';


@Component({
  selector: 'app-seat-selection',
  imports: [NgClass],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.css',
})
export class SeatSelection implements OnDestroy {

  showId!: number;

  seats = signal<SeatAvailability[]>([]);
  selectedSeats = signal<number[]>([]);

  constructor(
    private route: ActivatedRoute,
    private seatService: SeatService,
    private bookingService: BookingService,
    private socketService: SeatSocketService
  ) {
    this.showId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadSeats();
    this.openSocket();
  }

  loadSeats() {
    this.seatService.getSeatAvailability(this.showId).subscribe(res => {
      this.seats.set(res);
    });
  }

  toggleSeat(seatId: number) {
    const selected = this.selectedSeats();

    if (selected.includes(seatId)) {
      this.selectedSeats.set(selected.filter(id => id !== seatId));
    } else {
      this.selectedSeats.set([...selected, seatId]);
    }
  }

  lockSeats() {
  this.bookingService
    .lockSeats(this.showId, this.selectedSeats())
    .subscribe({
      next: () => {
        const seats = [...this.selectedSeats()];
        this.selectedSeats.set([]);

        this.bookingService
          .createBooking(this.showId, seats)
          .subscribe({
            next: (res) => {
              // Navigate to payment page
              window.location.href = `/payment/${res.booking_id}`;
            },
            error: () => alert('Booking creation failed')
          });
        },
        error: () => alert('Seat locking failed')
      });
  }

  openSocket() {
    this.socketService.connect(this.showId, (data) => {
      if (data.event === 'SEAT_LOCKED') {
        this.updateSeatStatus(data.seat_ids, 'LOCKED');
      }

      if (data.event === 'SEAT_RELEASED') {
        this.updateSeatStatus(data.seat_ids, 'AVAILABLE');
      }

      if (data.event === 'SEAT_BOOKED') {
        this.updateSeatStatus(data.seat_ids, 'BOOKED');
      }
    });
  }

  updateSeatStatus(seatIds: number[], status: SeatAvailability['status']) {
    this.seats.set(
      this.seats().map(seat =>
        seatIds.includes(seat.seat_id)
          ? { ...seat, status }
          : seat
      )
    );
  }

  seatRows() {
    const map: Record<string, SeatAvailability[]> = {};

    for (const seat of this.seats()) {
      map[seat.row_label] ||= [];
      map[seat.row_label].push(seat);
    }

    return Object.keys(map).map(row => ({
      row,
      seats: map[row]
    }));
  }

  ngOnDestroy() {
    this.socketService.disconnect();
    this.bookingService.releaseSeats().subscribe();
  }
}
