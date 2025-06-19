import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular'; // Asegúrate de que ToastController esté aquí
import { AuthService } from '../Servicios/auth.service';

import { BarcodeScanner, BarcodeFormat, LensFacing, } from '@capacitor-mlkit/barcode-scanning';
import { APIService } from '../Servicios/api.service';
import { ThemeService } from '../Servicios/theme.service'; // <--- Importamos el ThemeService


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
    private apiService: APIService,
    private themeService: ThemeService 
  ) {}

  user = {
    usuario: '',
    password: '',
  };
  nombreUsuario = '';

  usuariosStudent: any[] = [];
  isDarkMode: boolean = false;

  ngOnInit() {
    if (history.state?.user){
      this.user = history.state.user;
      this.nombreUsuario = this.user.usuario;
    } else {
      this.generarToast('Sesión Inválida');
      this.router.navigate(['/home']);
    }
    this.cargarUsuariosStudent();

  
    this.isDarkMode = this.themeService.isDarkModeEnabled();
  }

  cargarUsuariosStudent() {
    this.router.navigate(['/vista-usuarios'])
  }

  mostrarUsuarios(){
    console.log("this.usuariosStudent",this.usuariosStudent)
  }

  ngAfterViewInit() {
    this.animacionAutito();
  }

  // <--- Nuevo método para alternar el tema
  toggleTheme(event: any) {
    this.themeService.enableDarkMode(event.detail.checked);
    this.isDarkMode = event.detail.checked;
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