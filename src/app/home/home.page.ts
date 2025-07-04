import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, NavController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  user = {
    usuario: '',
    password: '',
  };
  msj = "";
  carga = false;
  mostrarBtnRecuperar = false;

  constructor(
    private router: Router,
    private animation: AnimationController,
    private auth: AuthService,
    private navCtrl: NavController // Asegúrate de que NavController esté importado e inyectado
  ) { }

  ngOnInit() {
    console.log('HomePage: ngOnInit ejecutado.');
  }

  // ************* INICIO DE LA MODIFICACIÓN (AÑADIDOS CONSOLE.LOGS) *************
  ionViewWillLeave() {
    console.log('HomePage: ionViewWillLeave se está ejecutando.');
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && typeof activeElement.blur === 'function') {
      activeElement.blur();
      console.log('HomePage: Foco removido del elemento activo.');
    } else {
      console.log('HomePage: No hay elemento activo o blur no disponible.');
    }
    console.log('HomePage: Estado del documento.activeElement después de blur:', document.activeElement);
  }
  // ************* FIN DE LA MODIFICACIÓN *************

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
            console.error('HomePage: HomePage: Usuario no autenticado después del login exitoso. isAuthenticated:', isAuthenticated, 'role:', role);
            this.msj = 'Error en la autenticación';
            this.carga = false;
            // No retornar aquí para que se limpie msj y carga si no se pudo autenticar
          }

          // Estos se limpian después del timeout, independientemente del éxito del login
          // (a menos que el `return` en el else de arriba los evite)
          if (this.msj === 'Conexión Exitosa' || this.msj === 'Error en la autenticación') { // Solo limpiar si no se estableció un mensaje específico antes
            this.msj = '';
          }
          this.carga = false;
        }, 1000);
      } else {
        console.log('HomePage: Login falló. Credenciales erróneas.');
        this.msj = 'Credenciales erróneas';
        this.carga = false;
      }
    } else {
      console.log('HomePage: Credenciales vacías.');
      this.msj = 'Credenciales no pueden estar vacías';
      this.carga = false; // Asegurar que carga se desactive si los campos están vacíos
    }
  }

  recuperarContrasenia() {
    this.carga = true;
    this.msj = 'Cargando recuperación...';

    setTimeout(() => {
      this.navCtrl.navigateForward('/recuperar-contrasenia');
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

    if (!imagen || !fondo) { // Añadir verificación para evitar errores si los elementos no se encuentran
      console.warn('HomePage: Elementos de animación no encontrados.');
      return;
    }

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