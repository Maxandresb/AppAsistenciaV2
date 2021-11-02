
import {  AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, AlertController } from '@ionic/angular';

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
     public firebaseauthService: FirebaseauthService,
     public  loadingController: LoadingController,
     private alertController:AlertController
     ) {
      this.firebaseauthService.stateAuth().subscribe( res =>{
        console.log(res)
      });
      this.menuCtrl.enable(false)
   }

  async ngOnInit() {
   const uid= await this.firebaseauthService.getUid();
    console.log('usuario ' +uid)
   
    this.vaciarSaludo()
  }

  ionViewDidLoad(){
    
  }

  
  
   async onSubmit(){
     if (this.credenciales.username!='' && this.credenciales.password!=''){
       this.presentLoading()
       await this.logear().then(()=>{
         this.statusSalute()
        this.loadingController.dismiss()
        this.router.navigate(['../'])
      }).catch(e=>{
        let err='Credenciales no validas';
        this.loadingController.dismiss()
        this.presentAlert(err)
      });
     }
     else{
      let err='Ingrese datos';
      this.loadingController.dismiss()
      this.presentAlert(err)
     }
    
    
   }
      
  
  async logear(){
    let email= this.credenciales.username+'@duocuc.cl';
    //console.log(email)
   return this.firebaseauthService.login(email , this.credenciales.password);
   
  }

  logout(){
    this.firebaseauthService.logout();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      
      cssClass: 'my-custom-class',
      message: 'Espere..',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert(error) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: error,
      //subHeader: 'Subtitle',
      //message:error,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }




  async statusSalute(){
    await this.storage.set("saludo", 0)
  }



  async vaciarSaludo(){
    await this.storage.set('saludo',0)
  }



}
    
  

