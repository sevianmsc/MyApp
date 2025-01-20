import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { ToastController } from '@ionic/angular';

export const authGuard: CanActivateFn = (route, state) => {
  const auth:AuthService = new AuthService();
  const router: Router = new Router();
  const toast:ToastController;

  if (auth.isConnected()){
    return true;
  } else{
    router.navigate(['/home']);
    this.generarToast('Debe ingresar sus credenciales para acceder');

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
    return false;
  }
};
