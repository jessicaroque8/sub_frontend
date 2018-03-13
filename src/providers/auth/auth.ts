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
      }

      signIn(email, password): Observable<any> {
         return this._tokenService.signIn({
            email:    email,
            password: password
         }).map( (response) => {
            console.log('Sign in response: ', response);
            if (response.status == 200) {
               return true;
            } else {
               return response;
            }
         });
      }

      logOut(): Promise<boolean> {
         return new Promise( (resolve, reject) => {
            this._tokenService.signOut().toPromise()
               .then(
                  res => {
                     console.log('Logged out.');
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

      getCurrentUser() {
         return this._tokenService.currentUserData;
      }

}
