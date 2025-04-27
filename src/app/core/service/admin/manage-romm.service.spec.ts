import { TestBed } from '@angular/core/testing';

import { ManageRommService } from './manage-romm.service';

describe('ManageRommService', () => {
  let service: ManageRommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageRommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
