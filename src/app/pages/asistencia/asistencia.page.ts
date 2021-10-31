import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Asistencia } from '../../interfaces/models';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  uid: string = '';
  ida='';
  asistencias:Asistencia[]=[];


  constructor(public firebaseauthService: FirebaseauthService, public firestoreService: FirestoreService, private activatedroute:ActivatedRoute) { 
    this.activatedroute.params.subscribe(params =>{
      let id= params['id']
      this.ida=id
    })

    this.firebaseauthService.getUid().then(res => {
      this.uid = res
      this.getAsistencias(this.uid,this.ida)
    })
  }

  async ngOnInit() {
    await this.firebaseauthService.getUid().then(res => {
      this.uid = res
      this.getAsistencias(this.uid,this.ida)
    })
    // await this.activatedroute.params.subscribe(params =>{
    //   let id= params['id']
    //   this.ida=id
    // })
    
    

  }




  async getAsistencias(uid: string, id:string) {
    
    let asignaturasPath = 'usuarios/' + uid + '/asignaturas/'+id+'/asistencias';
    console.log(asignaturasPath)
        this.firestoreService.getCollectionChanges<Asistencia>(asignaturasPath).subscribe(res => {
          this.asistencias = res;
         
        })
}
}