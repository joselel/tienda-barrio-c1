import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData!:Observable<firebase.User| null | undefined>
  public user: User = new User();

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore) {

    this.userData = auth.authState;
    this.auth.authState.subscribe(User =>{
      if (User) {
        this.user.name = User.displayName;
        this.user.email = User.email;
        this.user.photo = User.photoURL;
        this.user.uid = User.uid;
      };
       });

   }

  async login() {
   const login =  await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if(login){
      window.location.reload();
    }
  }
  logout() {
    this.auth.signOut();
    window.location.reload();
  }


}
