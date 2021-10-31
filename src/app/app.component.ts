import { Component } from '@angular/core';
import { Opcionesmenu } from './interfaces/opcionesmenu';
import {Storage} from '@ionic/storage-angular'
import { localuser } from './interfaces/models';


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

  user1:localuser={
    username:'max.benavente',
    password:'1234',
    nombre:'',
  };
  user2:localuser={
    username:'ben.gatica',
    password:'1234',
    nombre:'',
  };

  constructor( private storage:Storage) {

  }

  async ngOnInit() {
    
    await this.storage.create();
    
  }



  async guardarUsers(usr:localuser){
    await this.storage.set(usr.username,usr)
  }
}
