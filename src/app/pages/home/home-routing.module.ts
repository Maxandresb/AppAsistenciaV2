import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:[
      {
        path: 'asignaturas',
        loadChildren: () => import('../asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('../scanner/scanner.module').then( m => m.ScannerPageModule)
      },
      {
        path: '',
        redirectTo: '/home/asignaturas',
        pathMatch:'full',
      }

    ]


  },
  {
    path: '',
    redirectTo: '/home/asignaturas',
    pathMatch:'full',
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
})
export class HomePageRoutingModule {}
