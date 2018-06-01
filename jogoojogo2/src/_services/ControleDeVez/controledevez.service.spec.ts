import { TestBed, inject } from '@angular/core/testing';

import { ControledevezService } from './controledevez.service';

describe('ControledevezService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControledevezService]
    });
  });

  it('should be created', inject([ControledevezService], (service: ControledevezService) => {
    expect(service).toBeTruthy();
  }));
});
