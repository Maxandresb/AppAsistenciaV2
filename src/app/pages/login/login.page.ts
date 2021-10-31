import {  AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { FirestoreService } from '../../services/firestore.service';
import { localuser, webuser } from '../../interfaces/models';

import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario :localuser={
    username:'',
    password:'',
    nombre:'',
   
  }
  usertest:localuser={
    username:'',
    password:'',
    nombre:'',
  };
  user1:localuser={
    username:'max.benavente',
    password:'1234',
    nombre:'Maximiliano',
  };
  user2:localuser={
    username:'ben.gatica',
    password:'1234',
    nombre:'Benjamin',
  };
  


  constructor(private menuCtrl: MenuController, public Firestore: FirestoreService, private storage: Storage , private router:Router) {

    
   }

  ngOnInit() {
    this.guardarUsers(this.user1);
    this.guardarUsers(this.user2);
    this.vaciarActivo();
  }

  async guardarUsers(usr:localuser){
    await this.storage.set(usr.username,usr)
  }

  async vaciarActivo(){
    await this.storage.remove('activo')
  }
  ionViewWillEnter(){
   this.menuCtrl.enable(false)
  }
  onSubmit(){
   this.logear()
   }
      
  
  async logear(){
    
    let userok= await this.storage.get(this.usuario.username)
    if (userok!=null){
      userok=this.usertest
      
      if(this.usertest.password==this.usuario.password)
      console.log('aqui')
         await this.crearActivo(this.usuario.username)
        this.router.navigate(['/home'],)
    }
    else{
      console.log('no encotrado')
    }
  }



  async crearActivo(username:string){
    await this.storage.set('activo',username)
  }
}
    
  

