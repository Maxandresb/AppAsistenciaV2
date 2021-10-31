import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  
  constructor( private qr: QRScanner,  public firebaseauthService: FirebaseauthService, public firestoreService: FirestoreService) { }

  ngOnInit() {
     this.scan();
    //this.startScan();
  }

  ionViewDidLeave(){
   this.stopScan()
  }
  scan(){
    this.qr.prepare().then((status:QRScannerStatus)=>{
      if(status.authorized){
        this.qr.show();
        document.getElementsByTagName("body")[0].style.background="transparent";
        this.qr.scan().subscribe((val)=>{
          alert(val)
        })
      }
      else if(status.denied){

      }
      else{

      }
      
    })
  }
  getPath(){
    this.firebaseauthService.getUid()
  }

  stopScan(){
    this.qr.hide();
    this.qr.destroy();
    
  }



  // startScan(){
  //   this.qr.prepare()
  // .then((status: QRScannerStatus) => {
  //    if (status.authorized) {
  //      // camera permission was granted


  //      // start scanning
  //      let scanSub = this.qr.scan().subscribe((text: string) => {
  //        console.log('Scanned something', text);

  //        this.qr.hide(); // hide camera preview
  //        scanSub.unsubscribe(); // stop scanning
  //      });

  //    } else if (status.denied) {
  //      // camera permission was permanently denied
  //      // you must use QRScanner.openSettings() method to guide the user to the settings page
  //      // then they can grant the permission from there
  //    } else {
  //      // permission was denied, but not permanently. You can ask for permission again at a later time.
  //    }
  // })
  // .catch((e: any) => console.log('Error is', e));
  // }



 
}
