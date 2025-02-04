import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilProfePage } from './perfil-profe.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilProfePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilProfePageRoutingModule {}
