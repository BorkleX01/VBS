/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimpleBookingsService } from './simple-bookings.service';

describe('Service: SimpleBookings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleBookingsService]
    });
  });

  it('should ...', inject([SimpleBookingsService], (service: SimpleBookingsService) => {
    expect(service).toBeTruthy();
  }));
});
