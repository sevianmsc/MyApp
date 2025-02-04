import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:false,
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
      this.carga = true; // Mostrar la carga inmediatamente
      this.msj = 'Conectando...'; // Mensaje más apropiado

      const success = await this.auth.loginAPI(this.user.usuario, this.user.password);
      if (success) {
        this.msj = 'Conexión Exitosa';
        

        setTimeout(() => {
          const user = JSON.parse(localStorage.getItem('conectado') || '{}'); // Valor por defecto '{}'
          const role = this.auth.getUserRole(); // Obtener el rol *después* de la conexión exitosa
  
          if (role === 'student') {
            this.router.navigate(['/perfil'], { replaceUrl: true });
          } else if (role === 'teacher') {
            this.router.navigate(['/perfil-profe'], { replaceUrl: true });
          } else {
            this.router.navigate(['/error'], { replaceUrl: true });
            console.error("Rol desconocido:", role);
          }
  
          this.msj = '';
          this.carga = false;
        }, 2000);
      } else {
        this.msj = 'Credenciales erróneas';
        this.carga = false; // Ocultar la carga en caso de error
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

  ngAfterContentInit(){
    this.animacionLogin();
  }

  animacionLogin(){
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
