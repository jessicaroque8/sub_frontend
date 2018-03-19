import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import 'rxjs/add/operator/map';

@Injectable()
export class SelectedSubsProvider {

   constructor(
      public _tokenService: Angular2TokenService
   ) {
    console.log('Hello SelectedSubsProvider Provider');
  }

  createSelectedSub(sub_request_id: number, params: any): Observable<any> {
     return this._tokenService.post('sub_requests/' + sub_request_id + '/selected_sub/', params)
               .map( res => {
                  return res.json();
               });
  }

  editSelectedSub(sub_request_id: number, selected_sub_id: number, params: any): Observable<any> {
     return this._tokenService.put('sub_requests/' + sub_request_id + '/selected_sub/' + selected_sub_id, params)
               .map( res => {
                  return res.json();
               });
  }

}
