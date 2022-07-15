import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOrdenadorComponent } from './listar-ordenador.component';

describe('ListarOrdenadorComponent', () => {
  let component: ListarOrdenadorComponent;
  let fixture: ComponentFixture<ListarOrdenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarOrdenadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOrdenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
