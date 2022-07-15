import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradoresComponent } from './compradores.component';

describe('CompradoresComponent', () => {
  let component: CompradoresComponent;
  let fixture: ComponentFixture<CompradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
