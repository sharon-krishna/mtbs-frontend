import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

import { SeatAvailability } from '../../../core/models/seat.model';
import { SeatService } from '../../../core/services/seat.service';


@Component({
  selector: 'app-seat-selection',
  imports: [NgClass],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.css',
})
export class SeatSelection {
showId!: number;

  seats = signal<SeatAvailability[]>([]);
  selectedSeats = signal<number[]>([]);

  constructor(
    private route: ActivatedRoute,
    private seatService: SeatService
  ) {
    this.showId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSeats();
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
}
