import { TestBed } from '@angular/core/testing';

import { ShoppigListService } from './shoppig-list.service';

describe('ShoppigListService', () => {
  let service: ShoppigListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppigListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
