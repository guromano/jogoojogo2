import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiComponent } from './qi.component';

describe('QiComponent', () => {
  let component: QiComponent;
  let fixture: ComponentFixture<QiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
