import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the RepliesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RepliesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RepliesProvider Provider');
  }

  editReply(sub_request_id, sendee_id, reply_id, reply_params): Observable<any> {
     return this.http.put('http://10.0.0.103:8100/proxy/sub_requests/' + sub_request_id + '/sendees/' + sendee_id + '/reply/' + reply_id, reply_params);
  }

}
