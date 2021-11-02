import { Component } from '@angular/core';
import { Opcionesmenu } from './interfaces/opcionesmenu';
import {Storage} from '@ionic/storage-angular'
import { FirebaseauthService } from './services/firebaseauth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  items:Opcionesmenu[]=[{
    destino:'home',
    texto:'Inicio',
    icono:'home'
  },
]

 
  constructor( 
    private storage:Storage,
    private firebaseauthService: FirebaseauthService,
    private router:Router
    ) {
      this.storage.create()
  }

  async ngOnInit() {
    this.storage.create()
   
  }
  logout(){
    this.firebaseauthService.logout().then(()=>{
      this.vaciarSaludo
      this.router.navigate(['login'])
    });
  }

  async vaciarSaludo(){
    await this.storage.set('saludo',0)
  }
}
