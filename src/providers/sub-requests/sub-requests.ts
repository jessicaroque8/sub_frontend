import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SubRequest } from '../../models/sub-request.model';
import { Sendee } from '../../models/sendee.model';
import { Reply } from '../../models/reply.model';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class SubRequestsProvider {

  constructor(
     public _tokenService: Angular2TokenService
  ) {
      console.log('Hello SubRequestsProvider');
    }

loadRequests(view: string): Observable<any> {
   let params = { params: {
      view: view
   }}
   return this._tokenService.get('sub_requests', params).map(res => res.json());
}

// Returns an Observable. Includes User, Group, Sendee, Sendee Reply, Sendee first_name, Sendee last_name, Sendee image.
   loadRequest(id: number): Observable<any> {
      return this._tokenService.get('sub_requests/' + id )
               .map(res => res.json());
   }

   createRequest(params): Observable<any> {
      return this._tokenService.post('sub_requests/', params);
   }

   editRequest(id, params): Observable<any> {
      return this._tokenService.put('sub_requests/' + id, params);
   }

   editRequest(id, params): Observable<any> {
      return this.http.put('http://10.0.0.103:8100/proxy/sub_requests/' + id, params );
   }

   deleteRequest(id: number): Observable<any> {
      return this._tokenService.delete('sub_requests/' + id);
   }

}
