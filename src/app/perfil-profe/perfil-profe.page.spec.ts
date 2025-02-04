import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilProfePage } from './perfil-profe.page';

describe('PerfilProfePage', () => {
  let component: PerfilProfePage;
  let fixture: ComponentFixture<PerfilProfePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilProfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
