import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
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

      signIn(email, password) {
         return Observable.create(observer => {
            this._tokenService.signIn({
               email:    email,
               password: password
            }).subscribe(
               res =>      {
                  let headers = res.headers.toJSON()
                  this.local.set('id_token', headers['access-token'].toString());
                  this.local.set('userData', JSON.parse(res['_body']));
                  observer.next('success')
               },
               err =>    {
                  console.log(email),
                  console.log(password),
                  console.log('auth error to log in:', err)
                  observer.next('fail')
               });
         })
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
