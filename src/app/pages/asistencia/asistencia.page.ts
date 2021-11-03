import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Asistencia, Asignatura } from '../../interfaces/models';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  uid: string = '';
  ida='';
  asistencias:Asistencia[]=[];
  asignatura:'';
  // PGY4121|2021-10-11|13:41 <= formato qr


  constructor(public firebaseauthService: FirebaseauthService,
     public firestoreService: FirestoreService,
      private activatedroute:ActivatedRoute,
      db :AngularFirestore,
      public  loadingController:LoadingController) { 
    this.activatedroute.params.subscribe(params =>{
      let id= params['id']
      let nom= params['nom']
      this.ida=id
      this.asignatura=nom
    })

    this.firebaseauthService.getUid().then(res => {
      this.uid = res
      //this.getAsistencias(this.uid,this.ida)
      //this.getAsignatura(this.uid,this.ida)
      
    })
    let path='usuarios/'+this.uid+'/asignaturas' ;
   

    
  }

  async ngOnInit() {
    await this.firebaseauthService.getUid().then(res => {
      this.uid = res
      this.getAsistencias(this.uid,this.ida)
      
      this.getAsignatura(this.uid,this.ida)
     
    })
    // await this.activatedroute.params.subscribe(params =>{
    //   let id= params['id']
    //   this.ida=id
    // })
    
    

  }

  async getAsignatura(uid:string, id:string){
    let asignaturaPath=  'usuarios/' + uid + '/asignaturas';
     this.firestoreService.getDoc<Asignatura>(asignaturaPath,id)
    
  }



  async getAsistencias(uid: string, id:string) {
    this.presentLoading()
    let asignaturasPath = 'usuarios/' + uid + '/asignaturas/'+id+'/asistencias';
    
        this.firestoreService.getCollectionChanges<Asistencia>(asignaturasPath).subscribe(res => {
          this.loadingController.dismiss();
          this.asistencias = res;
          
         
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







}