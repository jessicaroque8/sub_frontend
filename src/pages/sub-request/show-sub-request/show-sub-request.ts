import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../../models/sub-request.model';
import { UsersProvider } from '../../../providers/users/users';
import { User } from '../../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-show-sub-request',
  templateUrl: 'show-sub-request.html',
})
export class ShowSubRequestPage {

   request_id: number;
   request = new SubRequest();
   awaitingConfirm: boolean;
   confirmed: boolean;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider,
     public users: UsersProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowSubRequestPage');
    this.request_id = this.navParams.get('id');
    this.sr.loadRequest(this.request_id).subscribe(
      res => {
         this.request = res as SubRequest;
         this.getSenderPic(this.request);
      }, err => {
         console.log('Error loading request.')
      }
   );
   this.sr.loadSendees(this.request_id).subscribe(
      res => {
         this.request.sendees = res;
         console.log(this.request.sendees);

// Get each sendee's image and reply.
         let sendees = this.request.sendees
         for (let s in sendees) {
            this.users.getUser(sendees[s]['user_id']).subscribe(
               res => {
                  sendees[s].img = res['image'];
                  sendees[s].first_name = res['first_name'];
                  sendees[s].last_name = res['last_name'];
               }, err => {
                  console.log(err);
               }
            );

            this.sr.loadReply(this.request_id, sendees[s]['id']).subscribe(
               res => {
                  sendees[s].reply = res;
                  console.log(sendees[s].reply);
               }, err => {
                  console.log(err)
               }
            );
         }
      }, err => {
         console.log(err)
      }
   );
  }

  getSenderPic(req) {
     this.users.getUser(req.user_id).subscribe(
       res => {
          let sender = res as User;
          req.sender_img = sender.image
       }, err => {
          console.log(err)
       }
     )
   }
}
