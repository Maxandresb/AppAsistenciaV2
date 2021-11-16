import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Asistencia, Asignatura, Usuario } from '../../interfaces/models';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  userid='no';
  asigid='';

  qrtext='';
  qrSplitted:any;
  asignaturas: Asignatura[] = [];
  usuario: Usuario;

  mensaje:string;
  constructor( private qr: QRScanner, 
     public firebaseauthService: FirebaseauthService,
     public firestoreService: FirestoreService,
     private alertController:AlertController,
     private toastController:ToastController,
     private router:Router,
     private storage: Storage,
     private socialSharing:SocialSharing) { }

  async ngOnInit() {
    // this.scan();
    
    await this.getUserid();
    this.getUser(this.userid)
    this.getAsignaturas(this.userid)
   
  }

  async ionViewDidEnter(){
    await this.getUserid();
    this.getUser(this.userid)
    this.getAsignaturas(this.userid)
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

   async guardarAsistencia(){
    let path='usuarios/'+this.userid+'/asignaturas/'+this.qrSplitted[0]+'/asistencias';
    this.mensaje= this.usuario.nombre+' registra asistencia para '+this.qrSplitted[0]+' con fecha '+this.qrSplitted[1]+' '+this.qrSplitted[2]
    let idasistencia=this.qrtext
    const asistencia:Asistencia={
      id:idasistencia,
      fechaHora: new Date(this.qrSplitted[1]+' '+this.qrSplitted[2]),
    }
    this.firestoreService.crearDoc<Asistencia>(asistencia,path,idasistencia).then(()=>{
      this.compartir(this.qrSplitted[0])
    })
    
  }

  async getAsignaturas(uid: string) {
   
    let asignaturasPath = 'usuarios/' + uid + '/asignaturas';
    this.firestoreService.getCollectionChanges<Asignatura>(asignaturasPath).subscribe(res => {
      
      this.asignaturas = res;
      this.storage.set('Asignaturas',res)
    })


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
          handler: async () => {
            
            this.mensaje= this.usuario.nombre+' registra asistencia para '+this.qrSplitted[0]+' con fecha '+this.qrSplitted[1]+' '+this.qrSplitted[2]
            await this.guardarAsistencia()
            // await this.compartir(this.qrSplitted[0])
            this.presentToast()
          }
        }
      ]
    });

    await alert.present();
  }
  
  compartir(cod){
      
      for (var item of this.asignaturas){
        if(item.codigo==cod){
          
          
          this.mail(item.email)
        }
      }
  }


  getUser(id:string){
    this.storage.get(id).then(res=>{
      this.usuario=res
    })
  }

  crearMensaje(){
    this.mensaje= this.usuario.nombre+' registra asistencia para '+this.qrSplitted[0]+' con fecha '+this.qrSplitted[1]+' '+this.qrSplitted[2]
  }
  mail(emailA:string){
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      this.socialSharing.shareViaEmail(this.mensaje,'Registro Asistencia',[emailA],)
    }).catch(() => {
      // Sharing via email is not possible
    });
    
  }
}
