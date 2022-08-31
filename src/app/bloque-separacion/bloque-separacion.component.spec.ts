import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueSeparacionComponent } from './bloque-separacion.component';

describe('BloqueSeparacionComponent', () => {
  let component: BloqueSeparacionComponent;
  let fixture: ComponentFixture<BloqueSeparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloqueSeparacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueSeparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
