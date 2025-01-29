import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContraseniaPage } from './recuperar-contrasenia.page';

describe('RecuperarContraseniaPage', () => {
  let component: RecuperarContraseniaPage;
  let fixture: ComponentFixture<RecuperarContraseniaPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [RecuperarContraseniaPage],
      imports: [HttpClientModule]
    }).compileComponents();
    fixture = TestBed.createComponent(RecuperarContraseniaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
