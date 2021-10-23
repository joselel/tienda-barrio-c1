import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  getProducts(): Observable<any> {
    return this.firestore.collection('products', ref => ref.orderBy('admission_date', 'asc')).snapshotChanges();
  }

  getProduct(id: string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }
}
