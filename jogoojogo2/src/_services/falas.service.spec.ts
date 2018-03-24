import { TestBed, inject } from '@angular/core/testing';

import { FalasService } from './falas.service';

describe('FalasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FalasService]
    });
  });

  it('should be created', inject([FalasService], (service: FalasService) => {
    expect(service).toBeTruthy();
  }));
});
