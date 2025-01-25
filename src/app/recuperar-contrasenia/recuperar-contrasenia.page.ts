import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { APIService } from '../Servicios/api.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: 'recuperar-contrasenia.page.html',
  styleUrls: ['recuperar-contrasenia.page.scss'],
  standalone: false,
})
export class RecuperarContraseniaPage {
  // JSON
  user = {
    usuario: '',
    password: '',
    repetir_password: '',
  };
  msj = '';
  carga = false;
  mostrarBtnRecuperar = false;

  constructor(
    private router: Router,
    private animation: AnimationController,
    private apiService: APIService // Inyectamos el servicio de la API
  ) {}

  recuperar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      if (this.user.repetir_password === this.user.password) {
        if (this.user.password !== '1234') {
          this.carga = true;
          this.msj = 'Procesando...';

          // Llamar a la API para cambiar la contraseña
          this.apiService
            .cambiarContrasena(this.user.usuario, this.user.password)
            .subscribe({
              next: () => {
                this.msj = 'Éxito! Contraseña cambiada...';
                setTimeout(() => {
                  console.log(
                    'Redirigiendo a la página de ingreso de usuario...'
                  );
                  this.router.navigate(['/home']);
                  this.carga = false; // Desactivar el spinner
                  this.msj = ''; // Limpiar mensaje
                }, 2000);
              },
              error: (err) => {
                console.error(err);
                this.msj = 'Error: Usuario no encontrado o hubo un problema.';
                this.carga = false;
              },
            });
        } else {
          this.msj = 'La nueva contraseña no puede ser igual a la anterior.';
        }
      } else {
        this.msj = 'Las contraseñas no coinciden.';
      }
    } else {
      this.msj = 'No puede dejar campos vacíos.';
    }
  }

  ngAfterContentInit() {
    this.animacionLogin();
  }

  animacionLogin() {
    const imagen = document.querySelector(
      '#container ion-card ion-card-header ion-img'
    ) as HTMLElement;

    const fondo = document.querySelector('#logoDuoc') as HTMLElement;

    const animacion = this.animation
      .create()
      .addElement(imagen)
      .duration(1000)
      .iterations(Infinity)
      .keyframes([
        {
          offset: 0.5,
          border: '10px solid #C21E56',
        },
      ]);

    const animacionFondo = this.animation
      .create()
      .addElement(fondo)
      .duration(9000) // Duración de la animación en milisegundos
      .iterations(Infinity) // Animación infinita
      .keyframes([
        {
          offset: 0,
          transform: 'translateX(-70px) scale(1)', // Mueve la imagen y tamaño original
        },
        {
          offset: 0.25,
          transform: 'translateX(55px) scale(1.2)', // La imagen se mueve a la derecha y se agranda un 20%
        },
        {
          offset: 0.5,
          transform: 'translateX(-70px) scale(1)', // Vuelve a la posición original y tamaño original
        },
        {
          offset: 0.75,
          transform: 'translateX(90px) scale(0.8)', // Se mueve a la derecha y se achica un 20%
        },
        {
          offset: 1,
          transform: 'translateX(-70px) scale(1)', // Vuelve a la posición original y tamaño original
        },
      ]);
    animacionFondo.play();

    animacion.play();
  }
}
