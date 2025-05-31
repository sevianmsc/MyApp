import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user = {
    usuario: '',
    password: '',
  };
  msj = "";
  carga = false;
  mostrarBtnRecuperar = false;

  constructor(private router: Router, private animation: AnimationController, private auth: AuthService) { }

  async conectar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      this.carga = true;
      this.msj = 'Conectando...';

      console.log('HomePage: Iniciando proceso de login...');
      const success = await this.auth.loginAPI(this.user.usuario, this.user.password);
      
      if (success) {
        console.log('HomePage: Login exitoso, procesando navegación...');
        this.msj = 'Conexión Exitosa';
        
        setTimeout(() => {
          // Verificar que el usuario esté realmente autenticado
          const isAuthenticated = this.auth.isAuthenticated();
          const role = this.auth.getUserRole();
          
          console.log('HomePage: ¿Usuario autenticado?', isAuthenticated);
          console.log('HomePage: Rol del usuario:', role);

          if (isAuthenticated && role) {
            if (role === 'student') {
              console.log('HomePage: Navegando a perfil de estudiante...');
              this.router.navigate(['/perfil'], { replaceUrl: true });
            } else if (role === 'teacher') {
              console.log('HomePage: Navegando a perfil de profesor...');
              this.router.navigate(['/perfil-profe'], { replaceUrl: true });
            } else {
              console.error('HomePage: Rol desconocido:', role);
              this.router.navigate(['/error'], { replaceUrl: true });
            }
          } else {
            console.error('HomePage: Usuario no autenticado después del login exitoso');
            console.error('HomePage: isAuthenticated:', isAuthenticated);
            console.error('HomePage: role:', role);
            this.msj = 'Error en la autenticación';
            this.carga = false;
            return; // Salir temprano para no limpiar msj y carga
          }

          this.msj = '';
          this.carga = false;
        }, 1000); // Reducido a 1 segundo ya que el retry ya maneja el timing
      } else {
        console.log('HomePage: Login falló');
        this.msj = 'Credenciales erróneas';
        this.carga = false;
      }
    } else {
      this.msj = 'Credenciales no pueden estar vacías';
    }
  }

  recuperarContrasenia() {
    this.carga = true;
    this.msj = 'Cargando recuperación...';

    setTimeout(() => {
      this.router.navigate(['/recuperar-contrasenia']);
      this.carga = false;
      this.msj = '';
    }, 2000);
  }

  ngAfterContentInit() {
    this.animacionLogin();
  }

  animacionLogin() {
    const imagen = document.querySelector('#container ion-card ion-card-header ion-img') as HTMLElement;
    const fondo = document.querySelector('#logoDuoc') as HTMLElement;

    const animacionFondo = this.animation
      .create()
      .addElement(fondo)
      .duration(9000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(-70px) scale(1)' },
        { offset: 0.25, transform: 'translateX(55px) scale(1.2)' },
        { offset: 0.5, transform: 'translateX(-70px) scale(1)' },
        { offset: 0.75, transform: 'translateX(90px) scale(0.8)' },
        { offset: 1, transform: 'translateX(-70px) scale(1)' }
      ]);
    animacionFondo.play();
  }
}