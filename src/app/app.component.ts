import { Component } from '@angular/core';
import { Opcionesmenu } from './interfaces/opcionesmenu';
import {Storage} from '@ionic/storage-angular'
import { FirebaseauthService } from './services/firebaseauth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



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

 
  constructor( 
    private storage:Storage,
    private firebaseauthService: FirebaseauthService,
    private router:Router,
    public alertController: AlertController,
    ) {
      this.storage.create()
  }

   ngOnInit() {
    this.storage.create()
   
  }
  logout(){
   this.presentAlertConfirm()
    // if( confirm('¿Desea cerrar session?')){
    //   this.firebaseauthService.logout().then(()=>{
    //     this.vaciarSaludo
    //     this.router.navigate(['login'])
    //   });
    // }
    
  }

  async vaciarSaludo(){
    await this.storage.set('saludo',0)
  }








  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea cerrar sesion?',
     // message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Cerrar Sesion',
          handler: () => {
              this.firebaseauthService.logout().then(()=>{
              this.vaciarSaludo
              this.router.navigate(['login'])
            });
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
