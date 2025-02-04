import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toastController: ToastController = inject(ToastController);

  if (auth.isAuthenticated()) { // Usar isAuthenticated() que ya verifica isConnected()
    const role = auth.getUserRole();

    //  Simplificar la lógica.  No es necesario verificar route.url.
    if (route.routeConfig?.path === 'perfil' && role !== 'student') {
      router.navigate(['/home'], { replaceUrl: true }); // Redirigir a home si el rol no coincide
      return false;
    }

    if (route.routeConfig?.path === 'perfil-profe' && role !== 'teacher') {
      router.navigate(['/home'], { replaceUrl: true }); // Redirigir a home si el rol no coincide
      return false;
    }

    return true; // Permitir el acceso si el rol coincide o no se especifica la ruta.
  } else {
    router.navigate(['/home'], { replaceUrl: true }); // Redirigir a home si no está autenticado
    toastController.create({
      message: 'Debe autentificarse para acceder',
      duration: 1500,
      position: 'bottom',
    }).then((toast) => toast.present());
    return false;
  }
};