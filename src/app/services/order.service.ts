import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore) { }

  postOrder(order:any): Promise<any> {
    console.log(order)
    return this.firestore.collection('orders').add(order);
  }
}
