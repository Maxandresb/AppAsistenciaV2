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

 
  constructor( private storage:Storage) {

  }

  async ngOnInit() {
    
    await this.storage.create();
    
  }



}
