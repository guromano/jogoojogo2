import { TestBed, inject } from '@angular/core/testing';

import { ControleJogosService } from './controle-jogos.service';

describe('ControleJogosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControleJogosService]
    });
  });

  it('should be created', inject([ControleJogosService], (service: ControleJogosService) => {
    expect(service).toBeTruthy();
  }));
});
