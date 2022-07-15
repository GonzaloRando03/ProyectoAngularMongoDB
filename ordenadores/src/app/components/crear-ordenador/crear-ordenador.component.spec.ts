import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOrdenadorComponent } from './crear-ordenador.component';

describe('CrearOrdenadorComponent', () => {
  let component: CrearOrdenadorComponent;
  let fixture: ComponentFixture<CrearOrdenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOrdenadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOrdenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
