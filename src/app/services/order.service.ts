import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

   db = firebase.firestore();
   orders: any = [];
   id_user:any;


  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    ) { }

  postOrder(order:any): Promise<any> {
    return this.firestore.collection('orders').add(order);
  }

  getUserData(){
    return this.auth.authState;
  }
   getOrdersUser(id:string){
          return this.db
          .collection("orders")
          .where("userId", "==", id)
          .orderBy('FechaInicio','desc')
          .get()
  }

  getOrders(): Observable<any>{
    return this.firestore.collection('orders', ref => ref.orderBy('FechaInicio', 'asc')).snapshotChanges();
  }
}
