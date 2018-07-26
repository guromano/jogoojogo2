import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteourevesComponent } from './sorteoureves.component';

describe('SorteourevesComponent', () => {
  let component: SorteourevesComponent;
  let fixture: ComponentFixture<SorteourevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorteourevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteourevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
