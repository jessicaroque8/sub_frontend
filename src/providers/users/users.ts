import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class UsersProvider {

   constructor(
      public _tokenService: Angular2TokenService
   ) {
    console.log('Hello UsersProvider Provider');
   }

   getUser(id) {
      return this._tokenService.get('users/' + id).map(res => res.json());
   }

}
