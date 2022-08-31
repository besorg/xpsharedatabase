import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraPaginaComponent } from './cabecera-pagina.component';

describe('CabeceraPaginaComponent', () => {
  let component: CabeceraPaginaComponent;
  let fixture: ComponentFixture<CabeceraPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabeceraPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabeceraPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
