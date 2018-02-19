import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user.model';
import { UsersProvider } from '../users/users';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

   token: any;
   currentUser: any;

  constructor(
     public http: HttpClient,
     public _tokenService: Angular2TokenService,
     public local: Storage,
     public users: UsersProvider
  )   {
         console.log('Hello AuthProvider Provider');

         this.local.get('accessToken').then(val => {
            this.accessToken = val;
            console.log(this.accessToken);
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
            let headers = response.headers.toJSON()

            if (headers['access-token']) {

               this.local.set('accessToken', headers['access-token']).then(val => {
                  console.log('Token stored in local storage. ', val)
               });

               this.local.set('expiry', headers['expiry']).then(val => {
                  console.log('Expiry stored in local storage. ', val)
               })

               this.local.set('token-type', headers['token-type']).then(val => {
                  console.log('Token-type stored in local storage. ', val)
               })

               this.local.set('client', headers['client']).then(val => {
                  console.log('Client stored in local storage. ', val)
               });

               this.local.set('uid', headers['uid']).then(val => {
                  console.log('Uid stored in local storage. ', val)
               });

               let currentUser = this._tokenService.currentUserData;
               this.currentUser = currentUser;
               console.log('currentUser stored as auth property from _tokenService. ', this.currentUser);

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
               this.local.remove('accessToken').then((val) => {
                  console.log('local accessToken: ', val)
               });
               this.local.remove('expiry').then((val) => {
                  console.log('local expiry: ', val)
               });
               this.local.remove('client').then((val) => {
                  console.log('local client: ', val)
               });
               this.local.remove('uid').then((val) => {
                  console.log('local uid: ', val)
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
