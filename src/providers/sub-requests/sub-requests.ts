import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class SubRequestsProvider {

  constructor(
     public http: HttpClient,
     public local: Storage
  ) {
      console.log('Hello SubRequestsProvider');
    }

// Returns an Observable
  loadRequests(scope: string) {
      return this.http.get('http://localhost:3000/sub_requests', {params: {scope: scope, user_id: '2'} });
   }
}
