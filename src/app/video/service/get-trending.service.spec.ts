import { TestBed, inject } from '@angular/core/testing';

import { GetTrendingService } from './get-trending.service';

describe('GetTrendingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetTrendingService]
    });
  });

  it('should be created', inject([GetTrendingService], (service: GetTrendingService) => {
    expect(service).toBeTruthy();
  }));
});
