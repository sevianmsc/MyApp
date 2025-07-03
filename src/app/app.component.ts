import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
// Asegúrate que la ruta sea correcta. En tu caso, es un nivel arriba de 'app'
// y luego dentro de 'Servicios'.
import { LocalStorageService } from './Servicios/local-storage.service'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private alertController: AlertController,
    private localStorageService: LocalStorageService // Inyecta tu servicio
  ) {}

  ngOnInit() {
    this.checkFirstLaunch();
  }

  async checkFirstLaunch() {
    // Usa tu servicio para obtener el valor.
    // Tu getItem devuelve 'any', y parsea a JSON.
    // Para 'hasOpenedApp', esperamos un booleano (true/false) o null.
    const hasOpenedBefore = this.localStorageService.getItem('hasOpenedApp');

    // La lógica es la misma: si no es 'true' (es null, false, o cualquier otra cosa)
    if (hasOpenedBefore !== true) { // Comparamos directamente con 'true' booleano
      await this.presentWelcomeAlert();

      // Usa tu servicio para guardar el valor.
      // Tu setItem acepta 'any', por lo que podemos pasarle directamente un booleano.
      this.localStorageService.setItem('hasOpenedApp', true); 
    }
  }

  async presentWelcomeAlert() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido a la App de Asistencia!',
      message: 'Estamos emocionados de que uses nuestra aplicación para gestionar la asistencia de tus clases. ¡Esperamos que te sea muy útil!',
      buttons: ['¡Entendido!']
    });

    await alert.present();
  }
}