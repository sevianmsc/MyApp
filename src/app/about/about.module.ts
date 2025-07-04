import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// No necesitas importar IonicModule aquí si AboutPage es standalone y lo importa directamente.
// import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page'; // Asegúrate de que esta importación exista

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // IonicModule, // <-- NO debe estar aquí si AboutPage lo importa directamente
    AboutPageRoutingModule,
    AboutPage // <-- Aquí va el componente standalone
  ],
  declarations: [] // <-- DEBE ESTAR VACÍO
})
export class AboutPageModule {}