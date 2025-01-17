import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  //JSON
  user = {
    usuario: '',
    password: '',
  };
  msj = "";
  carga = false;
  mostrarBtnRecuperar= false;

  constructor(private router: Router, private animation: AnimationController) { }


//Boton conectar con router a Perfil

  conectar() {

    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      if (this.user.usuario == "sevian" && this.user.password == "1234") {

//spiner de carga simulando delay con MS

        let navigationExtras: NavigationExtras = {
          state: { user: this.user },
        };
        this.carga =true;
        this.msj="Conexion Exitosa"
        setTimeout(()=>{
        this.router.navigate(['/perfil'], navigationExtras);
        this.msj='';
        this.carga = false;
      },3000);

      }
      else {
        this.msj = "Credenciales erroneas";
        this.mostrarBtnRecuperar = true;
      }
    } else {
      this.msj = 'Credenciales no pueden estar vacias';
      this.mostrarBtnRecuperar = false;
    }
  }

  recuperarContrasenia() {
    // Mostrar spinner de carga cuando se haga clic en el botón de recuperar contraseña
    this.carga = true;
    this.msj = 'Cargando recuperación...';

    // Simular un retraso de 2 segundos antes de redirigir
    setTimeout(() => {
      // Redirigir al usuario a la página de recuperación de contraseña
      console.log('Redirigiendo a la página de recuperación de contraseña...');
      this.router.navigate(['/recuperar-contrasenia']);
      this.carga = false; // Desactivar el spinner
      this.msj = ''; // Limpiar mensaje
    }, 2000);
  }

ngAfterContentInit(){
  this.animacionLogin();
}

animacionLogin(){
const imagen = document.querySelector(
  '#container ion-card ion-card-header ion-img'
) as HTMLElement;

const fondo = document.querySelector(
  '#logoDuoc'
) as HTMLElement;

const animacion = this.animation
.create()
.addElement(imagen)
.duration(1000)
.iterations(Infinity)
.keyframes([
  {
    offset: 0.5,
    border: '10px 	solid #C21E56',
    //transform: 'translateY(0px)',
  },
])
;
// Animación para la imagen de fondo
const animacionFondo = this.animation
.create()
.addElement(fondo)
.duration(9000)  // Duración de la animación en milisegundos
.iterations(Infinity) // Animación infinita
.keyframes([
  {
    offset: 0,              // Al principio de la animación
    transform: 'translateX(-70px) scale(1)',  // Mueve la imagen y tamaño original
  },
  {
    offset: 0.25,           // A los 25% de la animación
    transform: 'translateX(55px) scale(1.2)',  // La imagen se mueve a la derecha y se agranda un 20%
  },
  {
    offset: 0.5,            // A la mitad de la animación
    transform: 'translateX(-70px) scale(1)',  // Vuelve a la posición original y tamaño original
  },
  {
    offset: 0.75,           // A los 75% de la animación
    transform: 'translateX(90px) scale(0.8)',  // Se mueve a la derecha y se achica un 20%
  },
  {
    offset: 1,              // Al final de la animación
    transform: 'translateX(-70px) scale(1)',  // Vuelve a la posición original y tamaño original
  }
]);
animacionFondo.play();

animacion.play();
  }

  //ngAfterContentInit(){
    //this.animacionFondo();
  //}



}
