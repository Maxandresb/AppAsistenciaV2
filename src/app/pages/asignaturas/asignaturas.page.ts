import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, AlertController, ToastController } from '@ionic/angular';
import { Asignatura, Usuario } from '../../interfaces/models';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import {doc} from "firebase/firestore"
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  uid: string = '';
  usuario: Usuario={
    uid:'',
    email:'',
    nombre:'',
    asignaturas:[],
  } ;
  asignaturas: Asignatura[] = [];

  saludo:any;

  asistenciasPath = '';
  constructor(private menuCtrl: MenuController,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private toastController:ToastController,
    public auth:AngularFireAuth,
    private storage: Storage , 

  ) {
    this.firebaseauthService.stateAuth().subscribe(res => {
      if (res != null) {
        this.uid = res.uid;
        this.getUser(this.uid);
        console.log(this.uid)
        console.log(this.usuario.nombre)
        
        this.storage.get('saludo').then(res=> this.saludo=res)
        if(this.saludo==0){
          this.presentToast(this.usuario.nombre)
          this.storage.set("saludo", 1)
        }
      }
    })
  }

  
  


  async ngOnInit() {
    
   
    await this.firebaseauthService.getUid().then(res => {
      this.uid = res
      this.getUser(this.uid);
    })
    
    
     
    
    await this.getUser(this.uid)
   
    
    this.getAsignaturas(this.uid).then(()=>{
     
      this.loadingController.dismiss();
    }).catch(()=>{
      let err='Compruebe su conexion a internet'
      this.presentAlert(err);
    })
    console.log(this.usuario)
    this.storage.get('saludo').then(res=> this.saludo=res)
        if(this.saludo==0){
          this.presentToast(this.usuario.nombre)
          this.storage.set("saludo", 1)
        }
  }




  async getUser(uid: string) {
    const path = 'usuarios';
     await this.firestoreService.getDoc<Usuario>(path, uid).subscribe( res=>{
       this.usuario= res
     })
    
  }

  async getAsignaturas(uid: string) {
    this.presentLoading()
    let asignaturasPath = 'usuarios/' + uid + '/asignaturas';
    this.firestoreService.getCollectionChanges<Asignatura>(asignaturasPath).subscribe(res => {
      this.loadingController.dismiss()
      this.asignaturas = res;
    })


  }

  


  async presentLoading() {
    const loading = await this.loadingController.create({

      cssClass: 'my-custom-class',
      message: 'Cargando..',
      duration: 5000
    });
     loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert(error) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      //subHeader: 'Subtitle',
      message:error,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  async presentToast(nombre:string) {
    const toast = await this.toastController.create({

      message: 'Bienvenido ' +nombre,
      duration: 4000,
      position:'top',
      color:'secondary'
    });
    toast.present();
  }




  async getUid(){
    const user= await this.auth.currentUser;
    if (user === null){
      return null;
    }
    else{
      return user.uid;
    }
   }

  // await this.firebaseauthService.stateAuth().subscribe(res => {
  //   if (res != null) {
  //     this.uid = res.uid

  //   } })



}
