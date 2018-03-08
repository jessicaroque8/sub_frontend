import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';

/*
  Generated class for the RepliesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RepliesProvider {

  constructor(
     public _tokenService: Angular2TokenService
  ) {
    console.log('Hello RepliesProvider Provider');
  }

  editReply(sub_request_id, sendee_id, reply_id, reply_params): Observable<any> {
     return this._tokenService.put('sub_requests/' + sub_request_id + '/sendees/' + sendee_id + '/reply/' + reply_id, reply_params);
  }

}
