import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioPcComponent } from './precio-pc.component';

describe('PrecioPcComponent', () => {
  let component: PrecioPcComponent;
  let fixture: ComponentFixture<PrecioPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
