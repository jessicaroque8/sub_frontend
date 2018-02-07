import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SubRequest } from '../../models/sub-request.model';
import { Sendee } from '../../models/sendee.model';
import { Reply } from '../../models/reply.model';
import { UsersProvider } from '../users/users';

@Injectable()
export class SubRequestsProvider {

  constructor(
     public http: HttpClient,
     public auth: AuthProvider,
     public users: UsersProvider
  ) {
      console.log('Hello SubRequestsProvider');
    }

// For index views. Returns an Observable.
  loadRequests(scope: string) {
      return this.http.get('http://localhost:3000/sub_requests/', {params: {scope: scope, user_id: this.auth.currentUser.id} });
   }

// Returns an Observable. Includes User, Group, Sendee, Sendee Reply, Sendee first_name, Sendee last_name, Sendee image.
   loadRequest(id: number): Observable<any> {
      return this.http.get('http://localhost:3000/sub_requests/' + id )
               .map( request => {
                        return request as SubRequest;
                  });
   }

   // loadSendees(request_id: number): Observable<any> {
   //    return this.http.get('http://localhost:3000/sub_requests/' + request_id + '/sendees')
   //             .map( sendees => {
   //                   let updated_sendees = [];
   //                   for (let s in sendees) {
   //                      let sendee = sendees[s] as Sendee;
   //                      this.getSendeeDetails(sendee);
   //                      this.loadReply(request_id, sendee.id).subscribe(
   //                         reply => {
   //                            sendee.reply = reply;
   //                         }, err => {
   //                            // Error loading Reply.
   //                            console.log(err)
   //                         }
   //                      );
   //
   //                      updated_sendees.push(sendee);
   //                   }
   //                   console.log(updated_sendees);
   //                   return updated_sendees;
   //             });
   // }
   //
   //
   // getSendeeDetails(sendee){
   //    this.users.getUser(sendee.user_id).subscribe(
   //       res => {
   //          sendee.img = res['image'];
   //          sendee.first_name = res['first_name'];
   //          sendee.last_name = res['last_name'];
   //       }, err => {
   //          console.log(err);
   //       }
   //    );
   // }
   //
   // loadReply(request_id, sendee_id) {
   //    return this.http.get('http://localhost:3000/sub_requests/' + request_id + '/sendees/' + sendee_id + '/reply')
   //             .map( reply => {
   //                return reply as Reply;
   //             });
   // }
}
