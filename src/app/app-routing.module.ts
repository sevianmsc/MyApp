import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './Guardias/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
      canActivate: [authGuard],
  },
  {
    path: 'recuperar-contrasenia',
    loadChildren: () =>
      import('./recuperar-contrasenia/recuperar-contrasenia.module').then(
        (m) => m.RecuperarContraseniaPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'perfil-profe',
    loadChildren: () => import('./perfil-profe/perfil-profe.module').then( m => m.PerfilProfePageModule),
    canActivate: [authGuard],
  },
  {
    path: 'vista-usuarios',
    loadChildren: () => import('./vista-usuarios/vista-usuarios.module').then( m => m.VistaUsuariosPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'ramos',
    loadChildren: () => import('./ramos/ramos.module').then( m => m.RamosPageModule),
    canActivate: [authGuard],
  },

  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorPageModule),
  },
  {
    path: '**',
    redirectTo: 'error',
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
