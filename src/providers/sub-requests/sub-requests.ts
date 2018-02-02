import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SubRequestsProvider {

   data: any;

  constructor(
     public http: HttpClient,
     public local: Storage
  ) {
      console.log('Hello SubRequestsProvider');
   }

  loadAll(scope) {
     if (this.data) {
        return Promise.resolve(this.data)
     }

     return new Promise(resolve => {
        this.http.get('http://localhost:3000/sub_requests', {params: {scope: scope, user_id: '2'} }).subscribe(data => {
           this.data = data;
           console.log(this.data);
           resolve(this.data);
        });
     });
   }

}
