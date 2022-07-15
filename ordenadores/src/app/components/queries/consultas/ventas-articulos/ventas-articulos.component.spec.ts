import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasArticulosComponent } from './ventas-articulos.component';

describe('VentasArticulosComponent', () => {
  let component: VentasArticulosComponent;
  let fixture: ComponentFixture<VentasArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
