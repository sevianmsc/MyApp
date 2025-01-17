import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {

  constructor(private router: Router) { }
  user={
    usuario:"",
    password:""
  }
nombreUsuario= '';
  ngOnInit() {}
    ngAfterContentInit(){
    this.user = history.state.user;
    this.nombreUsuario = this.user.usuario; 
    }
    

    recuperarContrasenia() {
  this.router.navigate(['/recuperar-contrasenia']);
      
      
    }

}
