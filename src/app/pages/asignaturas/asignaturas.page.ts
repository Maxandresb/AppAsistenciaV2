import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Asignatura, Usuario } from '../../interfaces/models';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  uid: string = '';
  usuario: Usuario
  asignaturas: Asignatura[] = [];


  asistenciasPath = '';
  constructor(private menuCtrl: MenuController, public firebaseauthService: FirebaseauthService, public firestoreService: FirestoreService) {
    this.firebaseauthService.stateAuth().subscribe(res => {
      if (res != null) {
        this.uid = res.uid
      }
    })
  }





  async ngOnInit() {
    await this.firebaseauthService.getUid().then(res => {
      this.uid = res
    })
    this.getAsignaturas(this.uid)
  }




  getUser(uid: string) {
    const path = 'usuarios';
    this.firestoreService.getDoc(path, uid)
  }

  async getAsignaturas(uid: string) {
    let asignaturasPath = 'usuarios/' + uid + '/asignaturas';
        this.firestoreService.getCollectionChanges<Asignatura>(asignaturasPath).subscribe(res => {
          this.asignaturas = res;
        })
   

  }







  // await this.firebaseauthService.stateAuth().subscribe(res => {
  //   if (res != null) {
  //     this.uid = res.uid
      
  //   } })



}
