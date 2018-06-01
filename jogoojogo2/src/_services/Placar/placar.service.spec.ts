import { TestBed, inject } from '@angular/core/testing';

import { PlacarService } from './placar.service';

describe('PlacarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlacarService]
    });
  });

  it('should be created', inject([PlacarService], (service: PlacarService) => {
    expect(service).toBeTruthy();
  }));
});
