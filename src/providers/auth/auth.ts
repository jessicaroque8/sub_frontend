import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

   id_token: any;
   userData: any;
   authStatus: Observable<any>

  constructor(
     public http: HttpClient,
     public _tokenService: Angular2TokenService,
     public local: Storage
  )   {
         console.log('Hello AuthProvider Provider');

         this.local.get('id_token').then(val => {
            this.id_token = val
          });

         this.local.get('userData').then(val => {
            this.userData = val
         });

         this.authStatus = Observable.create(observer => {
            let authenticated = false;
            this._tokenService.validateToken().subscribe(
               res =>      {
                     console.log('Authenticate success.'),
                     authenticated = true,
                     console.log(authenticated)
               }, err =>    {
                      console.log('Authenticate fail.'),
                      console.log(authenticated)
               }
            );
            observer.next(authenticated)
         });

      }

      getUserData() {
         this.local.get('userData').then( (val) => console.log(val) );
      }

      signIn(email, password) {
         return this._tokenService.signIn({
            email:    email,
            password: password
         }).map( (response) => {

            let id_token = response.headers.toJSON() && response.headers.toJSON()['access-token']

            if (id_token) {
               this.id_token = id_token[0];
               console.log(this.id_token);

               this.local.set('userData', JSON.parse(response['_body']) );
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
               this.local.remove('id_token').then((val) => {
                  console.log('id_token: ', val)
               }),
               this.local.remove('userData').then((val) => {
                  console.log('userData: ', val)
               })
            }, err => {
               console.log('auth response to log out: ', err)
            }
         );
      }

}
