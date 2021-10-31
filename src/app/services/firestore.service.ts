import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor( public Firestore:AngularFirestore) { 
   
  }

  crearDoc<type>(data:type , path:string){
    const itemsCollection: AngularFirestoreCollection<type>=
          this.Firestore.collection<type>(path);
    return itemsCollection.add(data);

  }


  getCollectionChanges<type>(path:string):Observable<type[]>{
    const itemDoc= 
          this.Firestore.collection<type>(path);
    return itemDoc.valueChanges();
  }


  getDoc(path:string, id:string){
    const collection =this.Firestore.collection(path);
    return collection.doc(id).valueChanges()
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
