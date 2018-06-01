import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciojogoComponent } from './iniciojogo.component';

describe('IniciojogoComponent', () => {
  let component: IniciojogoComponent;
  let fixture: ComponentFixture<IniciojogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciojogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciojogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
