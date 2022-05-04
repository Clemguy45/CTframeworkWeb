import { TestBed } from '@angular/core/testing';

import { CovidGouvService } from './covid-gouv.service';

describe('CovidGouvService', () => {
  let service: CovidGouvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidGouvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
