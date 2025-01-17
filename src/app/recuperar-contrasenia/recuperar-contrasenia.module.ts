import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarContraseniaPageRoutingModule } from './recuperar-contrasenia-routing.module';

import { RecuperarContraseniaPage } from './recuperar-contrasenia.page';

import { MatProgressSpinner } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContraseniaPageRoutingModule,
    MatProgressSpinner
  ],
  declarations: [RecuperarContraseniaPage]
})
export class RecuperarContraseniaPageModule {}
