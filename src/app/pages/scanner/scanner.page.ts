import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Asistencia } from '../../interfaces/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  userid='no';
  asigid='';

  qrtext='';
  qrSplitted:any
  constructor( private qr: QRScanner, 
     public firebaseauthService: FirebaseauthService,
     public firestoreService: FirestoreService,
     private alertController:AlertController,
     private toastController:ToastController,
     private router:Router) { }

  ngOnInit() {
    // this.scan();
    this.startScan2();
   
  }

  ionViewDidEnter(){
    this.getUserid();
    console.log(this.userid)
    this.startScan2();
  }
  
  ionViewDidLeave(){
   this.stopScan()
  }
   startScan2(){
    this.qr.prepare().then((status:QRScannerStatus)=>{
      if(status.authorized){
        this.qr.show();
        
        document.getElementsByTagName("body")[0].style.background="transparent";
        //this.getQrtext();

        let scanSub = this.qr.scan().subscribe((val: string) => {
          this.qrtext=val
          this.qrSplitted=this.qrtext.split('|')
          console.log(this.qrSplitted)
         //  alert('asignatura :'+this.qrSplitted[0]+ '| fecha: '+this.qrSplitted[1] +' user '+)
         
         this.presentAlertConfirm()
 
          this.qr.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });


      }
      else if(status.denied){

      }
      else{

      }
      
    })
  }

  async getQrtext(){
    await this.qr.scan().subscribe((val)=>{
       this.qrtext=val
       this.qrSplitted=this.qrtext.split('|')
       console.log(this.qrSplitted)
      //  alert('asignatura :'+this.qrSplitted[0]+ '| fecha: '+this.qrSplitted[1] +' user '+)
      confirm('Guardar asistencia para ' +this.qrSplitted[0] +'?')
      if (confirm){
        this.guardarAsistencia()
        this.presentToast()
        
      }
       
    })
  }

  async getUserid(){
    await this.firebaseauthService.getUid().then(res => {
      this.userid = res
    })
   
  }

  stopScan(){
    this.qr.hide();
    this.qr.destroy();
    
  }

  guardarAsistencia(){
    let path='usuarios/'+this.userid+'/asignaturas/'+this.qrSplitted[0]+'/asistencias'  ;
    let idasistencia=this.qrtext
    const asistencia:Asistencia={
      id:idasistencia,
      fechaHora: new Date(this.qrSplitted[1]+' '+this.qrSplitted[2]),
    }
    this.firestoreService.crearDoc<Asistencia>(asistencia,path,idasistencia)

  }


  async presentToast() {
    const toast = await this.toastController.create({

      message: 'Asistencia registrada para  ' +this.qrSplitted[0],
      duration: 5000,
      position:'top',
      color:'secondary'
    });
    toast.present();
  }





  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registrar Asistencia',
     message: 'Guardar asistencia para ' +this.qrSplitted[0] +'?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(['../'])
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.guardarAsistencia()
            this.presentToast()
          }
        }
      ]
    });

    await alert.present();
  }
 
}
