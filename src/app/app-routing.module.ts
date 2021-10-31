import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes,  } from '@angular/router';
import { LoginguardGuard } from './guards/loginguard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[LoginguardGuard],
  },
  
  
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
 
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'passrecover',
    loadChildren: () => import('./pages/passrecover/passrecover.module').then( m => m.PassrecoverPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
