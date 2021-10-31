import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Asignatura } from '../../interfaces/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


 
  asignaturas:Asignatura[]=[];

 
  asistenciasPath='';


  constructor( private menuCtrl:MenuController, public firebaseauthService:FirebaseauthService, public firestoreService:FirestoreService) {}
  ionViewWillEnter(){
   this.menuCtrl.enable(true)
  }


  ngOnInit() {
    
  }






  











}
