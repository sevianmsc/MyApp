import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilProfePageRoutingModule } from './perfil-profe-routing.module';

import { PerfilProfePage } from './perfil-profe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilProfePageRoutingModule
  ],
  declarations: [PerfilProfePage]
})
export class PerfilProfePageModule {}
