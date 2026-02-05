export type SeatStatus = 'AVAILABLE' | 'LOCKED' | 'BOOKED';

export interface SeatAvailability {
  seat_id: number;
  row_label: string;
  seat_number: number;
  status: SeatStatus;
}
