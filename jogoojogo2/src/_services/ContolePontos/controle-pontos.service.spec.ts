import { TestBed, inject } from '@angular/core/testing';

import { ControlePontosService } from './controle-pontos.service';

describe('ControlePontosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlePontosService]
    });
  });

  it('should be created', inject([ControlePontosService], (service: ControlePontosService) => {
    expect(service).toBeTruthy();
  }));
});
