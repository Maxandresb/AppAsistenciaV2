import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/models';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor( public Firestore:AngularFirestore) { 
   
  }


  crearDoc<type>(data:type , path:string,id:string){
    const itemsCollection: AngularFirestoreCollection<type>=
          this.Firestore.collection<type>(path);
    return itemsCollection.doc(id).set(data);

  }


  getCollectionChanges<type>(path:string):Observable<type[]>{
    const itemDoc= 
          this.Firestore.collection<type>(path);
    return itemDoc.valueChanges();
  }


  getDoc<type>(path:string, id:string){
    const collection =this.Firestore.collection<type>(path);
    return collection.doc(id).valueChanges()
  }


  crearid(){
    return this.Firestore.createId()
  }
  getUser(){

  }

  // getDoc<type>(path:string):Observable<type>{
  //   const itemDoc: AngularFirestoreDocument<type>= 
  //         this.Firestore.doc<type>(path);
  //   return itemDoc.valueChanges();
  // }

  // getCollectionChanges<type>(path:string):Observable<type>{
  //   const itemDoc: AngularFirestoreDocument<type>= 
  //         this.Firestore.doc<type>(path);
  //   return itemDoc.valueChanges();
  // }
}
