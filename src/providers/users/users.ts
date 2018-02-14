import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  //   'Access-Control-Request-Headers': 'Content-Type'
  //  }
  //
  //  const requestOptions = {
  //     headers: new HttpHeaders(
  //       this.headers
  //      )
  //  }

   getUser(id) {
      return this.http.get('http://localhost:3000/users/' + id);
   }

   linkToMindBody(mbData) {
      return this.http.post('http://localhost:3000/link_to_mb', mbData);
   }

   // createAccount(userData) {
   //    return this.http.post('http://localhost:3000/auth/', JSON.stringify(userData), this.requestOptions);
   // }

}
