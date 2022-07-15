import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaVentaComponent } from './marca-venta.component';

describe('MarcaVentaComponent', () => {
  let component: MarcaVentaComponent;
  let fixture: ComponentFixture<MarcaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcaVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
