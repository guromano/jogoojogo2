import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacarGeralComponent } from './placar-geral.component';

describe('PlacarGeralComponent', () => {
  let component: PlacarGeralComponent;
  let fixture: ComponentFixture<PlacarGeralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacarGeralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacarGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
