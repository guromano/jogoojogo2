import { TestBed, inject } from '@angular/core/testing';

import { BarradevidaService } from './barradevida.service';

describe('BarradevidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarradevidaService]
    });
  });

  it('should be created', inject([BarradevidaService], (service: BarradevidaService) => {
    expect(service).toBeTruthy();
  }));
});
