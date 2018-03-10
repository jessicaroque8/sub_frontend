import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {

   currentUser: any;

  constructor(
     public http: HttpClient,
     public _tokenService: Angular2TokenService,
     public local: Storage
  )   {
         console.log('Hello AuthProvider Provider');

         this.local.get('currentUser').then(val => {
            this.currentUser = val;
            console.log('currentUser from local to auth property: ', this.currentUser);
         });
      }

      signIn(email, password): Observable<any> {
         return this._tokenService.signIn({
            email:    email,
            password: password
         }).map( response => {
            console.log('Sign in response: ', response);
            if (response.status == 200) {
               this.currentUser = response.json().data
               this.local.set('currentUser', response.json().data);
               console.log('currentUser as auth property: ', this.currentUser);
               return true;
            } else {
               return false;
            }
         });
      }

      logOut(): Promise<boolean> {
         return new Promise( (resolve, reject) => {
            this._tokenService.signOut().toPromise()
               .then(
                  res => {
                     console.log('Logging out.');
                     this.local.remove('currentUser').then( val => {
                        console.log('local currentUser: ', val),
                        this.currentUser = null;
                        console.log('auth property currentUser: ', this.currentUser)
                     });
                     return resolve(true);
                  }
               ).catch(
                  err => {
                     console.log('Log out rejected: ', err);
                     return reject(false);
                  }
               );
         });
      }

      registerAccount(userData): Observable<any> {
         return this._tokenService.registerAccount(userData);
      }

}
