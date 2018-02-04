import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
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
            console.log(this.currentUser);
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
               console.log('Token store as auth property.', this.token);

               let currentUser = this._tokenService.currentUserData;
               this.local.set('currentUser', currentUser).then((val) => {
                  console.log('currentUser set in local storage.');
               });

               // console.log(response['_body']);
               // console.log(JSON.parse(response['_body']))
               // this.local.set('currentUser', JSON.parse(response['_body']) );
               return true;
            } else {
               return false;
            }
         });
      }

      logOut() {
         this._tokenService.signOut().subscribe(
            res => {
               console.log('auth response to log out: ', res),
               this.local.remove('token').then((val) => {
                  console.log('token: ', val)
               }),
               this.local.remove('currentUser').then((val) => {
                  console.log('currentUser: ', val)
               })
            }, err => {
               console.log('auth response to log out: ', err)
            }
         );
      }

}
