import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubRequestsProvider {

  constructor(
     public http: HttpClient,
  ) {
      console.log('Hello SubRequestsProvider');
    }

// Returns an Observable
  loadRequests(scope: string) {
      return this.http.get('http://localhost:3000/sub_requests', {params: {scope: scope, user_id: '2'} });
   }
}
