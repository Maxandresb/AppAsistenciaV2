import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Asistencia } from '../../interfaces/models';
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
     private toastController:ToastController,) { }

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
         confirm('Guardar asistencia para ' +this.qrSplitted[0] +'?')
         if (confirm){
           this.guardarAsistencia()
           this.presentToast()
         }
 
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

  startScan(){
    this.qr.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qr.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qr.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
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
 
}
