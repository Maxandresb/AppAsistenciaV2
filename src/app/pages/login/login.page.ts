import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario={
    username:'',
    password:'',
  }
  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
   this.menuCtrl.enable(false)
  }
  onSubmit(){}
}
