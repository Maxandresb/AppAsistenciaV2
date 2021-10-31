import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { webuser } from '../interfaces/models';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  usersCollection:AngularFirestoreCollection<webuser>;
  users: Observable<webuser[]>;
  constructor( public Firestore:AngularFirestore) { 
    this.users= this.Firestore.collection('usuarios').valueChanges();
  }

  crearDoc<type>(data:type , path:string){
    const itemsCollection: AngularFirestoreCollection<type>=
          this.Firestore.collection<type>(path);
    return itemsCollection.add(data);

  }


  getCollectionChanges<type>(path:string):Observable<type>{
    const itemDoc: AngularFirestoreDocument<type>= 
          this.Firestore.doc<type>(path);
    return itemDoc.valueChanges();
  }

  getDoc<type>(path:string):Observable<type>{
    const itemDoc: AngularFirestoreDocument<type>= 
          this.Firestore.doc<type>(path);
    return itemDoc.valueChanges();
  }

  getUser(){
    
    return this.users;
      
  }
}
