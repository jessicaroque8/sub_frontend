import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

   token: any;
   currentUser: any;

  constructor(
     public http: HttpClient,
     public _tokenService: Angular2TokenService,
     public local: Storage
  )   {
         console.log('Hello AuthProvider Provider');

         this.local.get('token').then(val => {
            this.token = val;
            console.log(this.token);
         });

         this.local.get('currentUser').then(val => {
            this.currentUser = val;
            console.log(this.currentUser);
         });

      }

      signIn(email, password) {
         return this._tokenService.signIn({
            email:    email,
            password: password
         }).map( (response) => {

            let token = response.headers.toJSON() && response.headers.toJSON()['access-token']

            if (token) {
               this.token = token[0];
               console.log('Token stored as auth property.', this.token);

               let currentUser = this._tokenService.currentUserData;
               this.currentUser = currentUser;
               console.log(this.currentUser.id);

               this.local.set('currentUser', currentUser).then((val) => {
                  console.log('currentUser set in local storage.');
               });
               return true;
            } else {
               return false;
            }
         });
      }

      logOut() {
         console.log('in log out')
         this._tokenService.signOut().toPromise().then( result => {
               console.log('auth response to log out: ', result),
               this.local.remove('token').then((val) => {
                  console.log('local token: ', val),
                  this.token = null;
                  console.log('property token: ', this.token)
               });
               this.local.remove('currentUser').then((val) => {
                  console.log('local currentUser: ', val),
                  this.currentUser = null;
                  console.log('property currentUser: ', this.currentUser)
               });
            }
         ).catch( err => {
            console.log(err)
         });
      }

      registerAccount(userData) {
         return this._tokenService.registerAccount(userData);
      }

}
