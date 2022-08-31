import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsoLandingPageStructureComponent } from './bso-landing-page-structure.component';

describe('BsoLandingPageStructureComponent', () => {
  let component: BsoLandingPageStructureComponent;
  let fixture: ComponentFixture<BsoLandingPageStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsoLandingPageStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BsoLandingPageStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
