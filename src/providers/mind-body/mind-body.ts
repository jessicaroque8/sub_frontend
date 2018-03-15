import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class MindBodyProvider {

    constructor(
       public _tokenService: Angular2TokenService
    ) {
    console.log('Hello MindBodyProvider Provider');
  }

  searchClasses(searchClassData): Observable<any> {
     return this._tokenService.post('search_classes/', JSON.stringify(searchClassData))
               .map( res => {
                  return res.json();
               });
  }

  linkToMindBody(mbData) {
     return this._tokenService.post('link_to_mb', mbData)
               .map( res=> {
                  return res.json();
               });
  }

  subClassTeacher(classId, subStaffId) {
     let params = {
        class_id: classId,
        sub_staff_id: subStaffId
     }

     return this._tokenService.post('sub_class_teacher', params)
      .map( res => {
         debugger
         return res.json();
      })
  }

}
