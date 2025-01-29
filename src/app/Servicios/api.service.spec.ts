import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { APIService } from './api.service';

describe('APIService', () => {
  let service: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
