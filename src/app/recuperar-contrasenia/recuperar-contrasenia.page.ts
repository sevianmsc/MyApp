/*
 import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
  standalone: false,
})
export class RecuperarContraseniaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: 'recuperar-contrasenia.page.html',
  styleUrls: ['recuperar-contrasenia.page.scss'],
  standalone: false,
})
export class RecuperarContraseniaPage {

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

  recuperar() {
      if (this.user.usuario.length > 0 && this.user.password.length > 0) {
        if (this.user.usuario == "sevian") {
          if (this.user.password != "1234") {

      this.carga = true;
      this.msj = 'Éxito! Contraseña cambiada...';

      setTimeout(() => {
        console.log('Redirigiendo a la página de ingreso de usuario...');
        this.router.navigate(['/home']);
        this.carga = false; // Desactivar el spinner
        this.msj = ''; // Limpiar mensaje
      }, 2000);
      } else {
        this.msj = "Contraseña no puede ser igual que la anterior";
      }
      } else {
        this.msj = 'Nombre de usuario inexistente';
      }
      } else {
        this.msj = 'No puedes dejar campos vacíos';
      } 
  }

ngAfterContentInit(){
  this.animacionLogin();
}

animacionLogin(){
const imagen = document.querySelector(
  '#container ion-card ion-card-header ion-img'
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
 
 
  
]);
animacion.play();
  }

}

