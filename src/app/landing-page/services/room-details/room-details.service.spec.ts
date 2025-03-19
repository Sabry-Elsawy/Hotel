import { TestBed } from '@angular/core/testing';

import { RoomDetailsService } from './room-details.service';

describe('RoomDetailsService', () => {
  let service: RoomDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
