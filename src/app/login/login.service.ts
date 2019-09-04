import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { LoginCredential} from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  login(lc: LoginCredential): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(lc.email, lc.password);
  }
}
