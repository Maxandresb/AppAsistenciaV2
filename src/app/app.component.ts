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
      
  }

  async ngOnInit() {
    
   
  }
  logout(){
    this.firebaseauthService.logout().then(()=>{
      this.router.navigate(['login'])
    });
  }


}
