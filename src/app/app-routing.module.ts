// src/app/app-routing.module.ts
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
  // ... tus otras rutas protegidas como perfil, perfil-profe, qr, ramos, vista-usuarios
  // Estas deben tener canActivate: [authGuard]
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
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
  // ... otras rutas que no necesiten guard (si las tienes)

  // ***** CAMBIO CLAVE AQUI: LA RUTA 'ABOUT' DEBE ESTAR ANTES DEL CATCH-ALL (**) *****
  {
    path: 'about', // Ruta de 'about'
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  // ******************************************************************************

  {
    path: 'error', // Tu ruta de error debe estar definida para que el redirect funcione
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorPageModule),
  },
  {
    path: '**', // EL WILDCARD DEBE ESTAR AL FINAL
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