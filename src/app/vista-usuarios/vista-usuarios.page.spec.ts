import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaUsuariosPage } from './vista-usuarios.page';

describe('VistaUsuariosPage', () => {
  let component: VistaUsuariosPage;
  let fixture: ComponentFixture<VistaUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
