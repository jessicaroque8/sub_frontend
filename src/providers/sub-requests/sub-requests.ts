import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SubRequest } from '../../models/sub-request.model';
import { Sendee } from '../../models/sendee.model';
import { Reply } from '../../models/reply.model';
import { UsersProvider } from '../users/users';
import { Storage } from '@ionic/storage';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class SubRequestsProvider {

   currentUser = null;

   headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
   }

   requestOptions = {
      headers: new HttpHeaders(this.headers)
   }

  constructor(
     public http: HttpClient,
     public auth: AuthProvider,
     public users: UsersProvider,
     public local: Storage
  ) {
      console.log('Hello SubRequestsProvider');
      if (this.auth.currentUser) {
         this.currentUser = this.auth.currentUser
      } else {
         this.local.get('currentUser').then(currentUser => {
            this.currentUser = currentUser
         });
      }

      this.local.get('accessToken').then(accessToken => {
         console.log('accessToken SR ', accessToken)
         this.headers['access-token'] = accessToken
      });

      this.local.get('expiry').then(expiry => {
         console.log('expiry SR ', expiry)
         this.headers['expiry'] = expiry
      });

      this.local.get('token-type').then(type => {
         console.log('token-type ', type)
         this.headers['token-type'] = type
      });

      this.local.get('client').then(client => {
         console.log('client SR ', client)
         this.headers['client'] = client
      });

      this.local.get('uid').then(uid => {
         console.log('uid SR ', uid)
         this.headers['uid'] = uid
      });


    }

// For index views. Returns an Observable.

loadRequests() {
    return this.http.get('http://10.0.0.103:8100/proxy/sub_requests/', this.requestOptions)
                 .map( requestsArray => {
                    console.log(requestsArray);
                    let requests = {
                       sent: requestsArray.sent as Array<SubRequest>,
                       incoming: requestsArray.incoming as Array<SubRequest>
                    }
                    return requests;
                 });
 }

  // loadRequests(scope: string) {
  //     return this.http.get('http://10.0.0.103:8100/proxy/sub_requests/', {params: {scope: scope, user_id: this.currentUser.id} })
  //              .map( requestsArray => {
  //                 console.log(requestsArray);
  //                 let requests = {
  //                    sent: requestsArray.sent as Array<SubRequest>,
  //                    incoming: requestsArray.incoming as Array<SubRequest>
  //                 }
  //                 return requests;
  //              });
  //  }

// Returns an Observable. Includes User, Group, Sendee, Sendee Reply, Sendee first_name, Sendee last_name, Sendee image.
   loadRequest(id: number): Observable<any> {
      return this.http.get('http://10.0.0.103:8100/proxy/sub_requests/' + id )
               .map( request => {
                        return request as SubRequest;
                  });
   }

   createRequest(params): Observable<any> {
      return this.http.post('http://10.0.0.103:8100/proxy/sub_requests/', params );
   }

   editRequest(id, params): Observable<any> {
      return this.http.put('http://10.0.0.103:8100/proxy/sub_requests/' + id, params );
   }

   deleteRequest(id: number): Observable<any> {
      return this.http.delete('http://10.0.0.103:8100/proxy/sub_requests/' + id );
   }

}
