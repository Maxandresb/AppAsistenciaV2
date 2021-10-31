
import {  AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { FirestoreService } from '../../services/firestore.service';
import { credenciales, Usuario } from '../../interfaces/models';

import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales :credenciales={
    username:'',
    password:'',
   
   
  };
  usuario:Usuario={
    uid:'',
    email:'',
    nombre:'',
    asignaturas:[],

  };
  
  

  constructor(private menuCtrl: MenuController,
     public Firestore: FirestoreService, 
     private storage: Storage , 
     private router:Router,
     public firebaseauthService: FirebaseauthService
     ) {
      this.firebaseauthService.stateAuth().subscribe( res =>{
        console.log(res)
      });
    
   }

  async ngOnInit() {
   const uid= await this.firebaseauthService.getUid();
    console.log('usuario ' +uid)
    this.menuCtrl.enable(false)
  }

  

  
  
   async onSubmit(){
    await this.logear().then(()=>{
      this.router.navigate(['../'])
    });
    
   }
      
  
  async logear(){
    let email= this.credenciales.username+'@duocuc.cl';
    //console.log(email)
   return this.firebaseauthService.login(email , this.credenciales.password);
   
  }

  logout(){
    this.firebaseauthService.logout();
  }


  
}
    
  

