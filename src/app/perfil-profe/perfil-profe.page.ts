import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner, BarcodeFormat,LensFacing, } from '@capacitor-mlkit/barcode-scanning';
import { APIService } from '../Servicios/api.service';



@Component({
  selector: 'app-perfil-profe',
  templateUrl: './perfil-profe.page.html',
  styleUrls: ['./perfil-profe.page.scss'],
  standalone: false,
})
export class PerfilProfePage implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private animation: AnimationController,
    private auth: AuthService,
    private toast: ToastController,
    private apiService: APIService
  ) {}
  user = {
    usuario: '',
    password: '',
  };
  nombreUsuario = '';

  usuariosStudent: any[] = [];
  

  ngOnInit() {
    if (history.state?.user){
     this.user = history.state.user;
    this.nombreUsuario = this.user.usuario; 
    } else{
      this.generarToast('Sesion Invalida');
      this.router.navigate(['/home']);
    }
    this.cargarUsuariosStudent();
  }

  cargarUsuariosStudent() {
    this.router.navigate(['/vista-usuarios'])
  }

  mostrarUsuarios(){
    console.log("this.usuariosStudent",this.usuariosStudent)
  }

  ngAfterViewInit() {
    this.animacionAutito(); // Llama la animación después de que los elementos estén disponibles
  }

  recuperarContrasenia() {
    this.router.navigate(['/recuperar-contrasenia']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
    this.generarToast('Usuario Desconectado');
  }

  generarToast(message: string) {
    const toast = this.toast.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });

    toast.then((res) => {
      res.present();
    });
  }

  
  qrpage(){
    this.router.navigate(['/qr'])
  }


  animacionAutito() {
    const autito = document.querySelector('#autito') as HTMLElement;

    if (autito) {
      const animacionAutito = this.animation
        .create()
        .addElement(autito)
        .duration(5000)
        .iterations(Infinity)
        .keyframes([
          {
            offset: 0,
            transform: 'translateX(-300px)',
          },
          {
            offset: 0.5,
            transform: 'translateX(300px)',
          },
          {
            offset: 0.51,
            transform: 'translateX(300px) scaleX(-1)',
          },
          {
            offset: 1,
            transform: 'translateX(-300px) scaleX(-1)',
          },
        ]);
      animacionAutito.play();
    } else {
      console.error('Elemento #autito no encontrado en el DOM.');
    }
  }
}
