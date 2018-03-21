import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitsceneComponent } from './initscene.component';

describe('InitsceneComponent', () => {
  let component: InitsceneComponent;
  let fixture: ComponentFixture<InitsceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitsceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitsceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
