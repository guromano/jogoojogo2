import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VezComponent } from './vez.component';

describe('VezComponent', () => {
  let component: VezComponent;
  let fixture: ComponentFixture<VezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
