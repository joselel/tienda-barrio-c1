import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData!:Observable<firebase.User| null | undefined>
  public usuario: User = new User();

  constructor(public auth: AngularFireAuth) {
    
    this.userData = auth.authState;
    this.auth.authState.subscribe(user =>{
      if (user) {
        this.usuario.name = user.displayName;
        this.usuario.email = user.email;
        this.usuario.photo = user.photoURL;
        this.usuario.uid = user.uid;

        console.log("si escribe usuario logeado")
      }else{
        console.log("no hay usuario logeado")
      }
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
