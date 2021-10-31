import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-passrecover',
  templateUrl: './passrecover.page.html',
  styleUrls: ['./passrecover.page.scss'],
})
export class PassrecoverPage implements OnInit {
  usuario = {
    username: '',
  }
  constructor( private router:Router, private alertController: AlertController, private menuCtrl:MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.menuCtrl.enable(false)
  }

  userrec: String;

  async onSubmit(form) {
    if(this.usuario.username!=''){
      let navextra: NavigationExtras = {
        state: {
          usuariolog: this.usuario
        }
      }
      this.router.navigate(['/login', navextra])
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
}
