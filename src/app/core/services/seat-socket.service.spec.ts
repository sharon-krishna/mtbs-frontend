import { TestBed } from '@angular/core/testing';

import { SeatSocketService } from './seat-socket.service';

describe('SeatSocketService', () => {
  let service: SeatSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
