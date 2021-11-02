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

  constructor(public firebaseauthService: FirebaseauthService, public firestoreService: FirestoreService, private activatedroute:ActivatedRoute, db :AngularFirestore) { 
    this.activatedroute.params.subscribe(params =>{
      let id= params['id']
      let nom= params['nom']
      this.ida=id
      this.asignatura=nom
    })

    this.firebaseauthService.getUid().then(res => {
      this.uid = res
      this.getAsistencias(this.uid,this.ida)
      this.getAsignatura(this.uid,this.ida)
      
    })
    let path='usuarios/'+this.uid+'/asignaturas' ;
   

    console.log(this.asignatura)
  }

  async ngOnInit() {
    await this.firebaseauthService.getUid().then(res => {
      this.uid = res
      this.getAsistencias(this.uid,this.ida)
      
      this.getAsignatura(this.uid,this.ida)
      console.log(this.asignatura)
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
    
    let asignaturasPath = 'usuarios/' + uid + '/asignaturas/'+id+'/asistencias';
    console.log(asignaturasPath)
        this.firestoreService.getCollectionChanges<Asistencia>(asignaturasPath).subscribe(res => {
          this.asistencias = res;
         
        })
}
}