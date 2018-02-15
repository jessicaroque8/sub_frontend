import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MindBodyProvider {

   headers = {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
    }

   requestOptions = {
     headers: new HttpHeaders(this.headers)
    }

  constructor(
     public http: HttpClient,
  ) {
    console.log('Hello MindBodyProvider Provider');
  }



  searchClasses(searchClassData): Observable<any> {
     return this.http.post('http://10.0.0.103:8100/proxy/search_classes/', JSON.stringify(searchClassData), this.requestOptions);
  }

  linkToMindBody(mbData) {
     return this.http.post('http://10.0.0.103:8100/proxy/link_to_mb', mbData, this.requestOptions);
  }

}
