import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, LoadingController, ToastController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-passrecover',
  templateUrl: './passrecover.page.html',
  styleUrls: ['./passrecover.page.scss'],
})
export class PassrecoverPage implements OnInit {
  usuario = {
    username: '',
  }
  constructor( private router:Router,
     private alertController: AlertController,
     private menuCtrl:MenuController,
     public firebaseauthService: FirebaseauthService,
     public  loadingController: LoadingController,
     public toastController:ToastController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
   this.menuCtrl.enable(false)
  }

  userrec: String;

  async onSubmit(form) {
    if(this.usuario.username!=''){
      
        let email=this.usuario.username+'@duocuc.cl';
      await this.firebaseauthService.resetPassword(email).then((): void=>{
       this.presentToast(email)   }).catch(err=>{
        
        this.presentAlert(err.mesage)
        console.log(err.message)
      })
      this.router.navigate(['/login'])
     
    }
    else{
      const alert= await this.alertController.create({
        header: 'Ingrese Usuario',
        
        buttons: ['OK']
      });

      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
    



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




  async presentToast(email:string) {
    const toast = await this.toastController.create({

      message: 'Enviado correo de recuperacion a  ' +email,
      duration: 4000,
      position:'top',
      color:'secondary'
    });
    toast.present();
  }




}
