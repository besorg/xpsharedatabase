import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaUsComponent } from './acerca-us.component';

describe('AcercaUsComponent', () => {
  let component: AcercaUsComponent;
  let fixture: ComponentFixture<AcercaUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercaUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcercaUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
