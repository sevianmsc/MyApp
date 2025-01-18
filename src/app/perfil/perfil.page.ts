import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit, AfterViewInit {
  constructor(private router: Router, private animation: AnimationController) {}
  user = {
    usuario: '',
    password: '',
  };
  nombreUsuario = '';

  ngOnInit() {
    // Inicializa el usuario desde el estado de la navegación si existe
    this.user = history.state.user || { usuario: '', password: '' };
    this.nombreUsuario = this.user.usuario;
  }

  ngAfterViewInit() {
    this.animacionAutito(); // Llama la animación después de que los elementos estén disponibles
  }

  recuperarContrasenia() {
    this.router.navigate(['/recuperar-contrasenia']);
  }

  cerrarSesion() {
    this.router.navigate(['/home']);
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
