import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
  constructor(private router: Router) { }



  conectar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      if (this.user.usuario == "sevian" && this.user.password == "1234") {


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
        this.msj = "Credenciales erroneas"
      }
    } else {
      this.msj = 'Credenciales no pueden estar vacias';
    }
  }
}
