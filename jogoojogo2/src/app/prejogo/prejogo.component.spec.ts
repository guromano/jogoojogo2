import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrejogoComponent } from './prejogo.component';

describe('PrejogoComponent', () => {
  let component: PrejogoComponent;
  let fixture: ComponentFixture<PrejogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrejogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrejogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
