import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class UsersProvider {

   headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
   }

   requestOptions = {
      headers: new HttpHeaders(this.headers)
   }

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

   getUser(id) {
      return this.http.get('http://10.0.0.103:8100/proxy/users/' + id);
   }

}
