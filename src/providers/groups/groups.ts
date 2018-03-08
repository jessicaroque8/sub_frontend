import { Angular2TokenService } from 'angular2-token';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupsProvider {

  constructor(
     public _tokenService: Angular2TokenService
  ) {
    console.log('Hello GroupsProvider Provider');
  }

  showGroup(groupId) {
     return this._tokenService.get('groups/' + groupId )
               .map(res => {
                  return res.json();
               });
  }

}
