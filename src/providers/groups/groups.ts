import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class GroupsProvider {

   headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
   }

   requestOptions = {
      headers: new HttpHeaders(this.headers)
   }

  constructor(
     public http: HttpClient,
     public auth: AuthProvider
  ) {
    console.log('Hello GroupsProvider Provider');
  }

  showGroup(groupId) {
     return this.http.get('http://10.0.0.103:8100/proxy/groups/' + groupId );
  }

}
