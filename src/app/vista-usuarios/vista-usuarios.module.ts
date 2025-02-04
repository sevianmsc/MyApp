import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaUsuariosPageRoutingModule } from './vista-usuarios-routing.module';

import { VistaUsuariosPage } from './vista-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaUsuariosPageRoutingModule
  ],
  declarations: [VistaUsuariosPage]
})
export class VistaUsuariosPageModule {}
