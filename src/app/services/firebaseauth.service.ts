import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../interfaces/models';
import { FirestoreService } from './firestore.service';



@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {
  nombre:string='';
  usuario: Usuario={
    uid:'',
    email:'',
    nombre:'',
    asignaturas:[],
  } ;


  constructor(public auth:AngularFireAuth,
              public firestoreService:FirestoreService) {
    this.getUid();
    this.getUser(this.getUid());
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


  async resetPassword(email:string){
    try {
      return this.auth.sendPasswordResetEmail(email)
    } catch (error) {
      console.log(error)
    }
  }













  async getUser(uid) {
    const path = 'usuarios';
    
     await this.firestoreService.getDoc<Usuario>(path, uid).subscribe( res=>{
       this.usuario= res
     })
    
  }
}
