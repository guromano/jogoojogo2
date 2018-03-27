import { TestBed, inject } from '@angular/core/testing';

import { PersonagensService } from './personagens.service';

describe('PersonagensService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonagensService]
    });
  });

  it('should be created', inject([PersonagensService], (service: PersonagensService) => {
    expect(service).toBeTruthy();
  }));
});
