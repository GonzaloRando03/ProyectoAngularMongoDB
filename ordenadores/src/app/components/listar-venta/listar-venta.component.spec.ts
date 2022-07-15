import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVentaComponent } from './listar-venta.component';

describe('ListarVentaComponent', () => {
  let component: ListarVentaComponent;
  let fixture: ComponentFixture<ListarVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
