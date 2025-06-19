import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular'; // Asegúrate de importar ToastController si no lo está
import { AuthService } from '../Servicios/auth.service';
import { ThemeService } from '../Servicios/theme.service'; // <--- Importamos el ThemeService

// No necesitamos BarcodeScanner aquí, si lo usas en otro lado está bien.
// import { BarcodeScanner, BarcodeFormat, LensFacing, } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private animation: AnimationController,
    private auth: AuthService,
    private toast: ToastController,
    private themeService: ThemeService // <--- Inyectamos el ThemeService
  ) {}

  user = {
    usuario: '',
    password: '',
    // Puedes añadir otras propiedades del usuario aquí, como 'nombre', 'tipo', etc.
    // si las manejas en tu AuthService o en la data que recibes.
  };
  nombreUsuario = '';
  isDarkMode: boolean = false; // <--- Variable para controlar el ion-toggle del modo oscuro

  ngOnInit() {
    console.log('PerfilPage: Página cargada');
    console.log('PerfilPage: ¿Usuario autenticado?', this.auth.isAuthenticated());
    console.log('PerfilPage: Rol del usuario:', this.auth.getUserRole());

    if (history.state?.user) {
      this.user = history.state.user;
      this.nombreUsuario = this.user.usuario;
    } else {
      this.generarToast('Sesión Inválida');
      this.router.navigate(['/home']);
    }

    // <--- Inicializamos el estado del ion-toggle con el tema actual
    this.isDarkMode = this.themeService.isDarkModeEnabled();
  }

  ngAfterViewInit() {
    this.animacionAutito(); // Llama la animación después de que los elementos estén disponibles
  }

  // <--- Nuevo método para alternar el tema
  toggleTheme(event: any) {
    this.themeService.enableDarkMode(event.detail.checked);
    this.isDarkMode = event.detail.checked; // Actualiza la variable para reflejar el cambio en la UI
  }

  infoRamos() {
    this.router.navigate(['/ramos']);
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

  qrpage() {
    this.router.navigate(['/qr']);
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