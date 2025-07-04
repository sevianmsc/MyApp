import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page'; // <-- Importa AboutPage

const routes: Routes = [
  {
    path: '',
    component: AboutPage // <-- Usa AboutPage aquí
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPageRoutingModule {}