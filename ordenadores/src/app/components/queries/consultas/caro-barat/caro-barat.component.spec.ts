import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaroBaratComponent } from './caro-barat.component';

describe('CaroBaratComponent', () => {
  let component: CaroBaratComponent;
  let fixture: ComponentFixture<CaroBaratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaroBaratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaroBaratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
