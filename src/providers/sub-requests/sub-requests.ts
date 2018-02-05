import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class SubRequestsProvider {

  constructor(
     public http: HttpClient,
     public auth: AuthProvider
  ) {
      console.log('Hello SubRequestsProvider');
    }

// For index views. Returns an Observable.
  loadRequests(scope: string) {
      return this.http.get('http://localhost:3000/sub_requests/', {params: {scope: scope, user_id: this.auth.currentUser.id} });
   }

// For show view. Returns an Observable.
   loadRequest(id) {
      return this.http.get('http://localhost:3000/sub_requests/' + id );
   }

   loadSendees(request_id) {
      return this.http.get('http://localhost:3000/sub_requests/' + request_id + '/sendees');
   }

   loadReply(request_id, sendee_id) {
      return this.http.get('http://localhost:3000/sub_requests/' + request_id + '/sendees/' + sendee_id + '/reply');
   }
}
