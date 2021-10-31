import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth:AngularFireAuth) {
    this.getUid();
   }


  login(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  recover(){
    this.auth.sendPasswordResetEmail
  }

  logout(){
    return this.auth.signOut();
  }

  async getUid(){
   const user= await this.auth.currentUser;
   if (user === null){
     return null;
   }
   else{
     return user.uid;
   }
  }


  stateAuth(){
   return  this.auth.authState
  }
}
