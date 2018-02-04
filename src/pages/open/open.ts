import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../models/sub-request.model';
import { UsersProvider } from '../../providers/users/users';


@IonicPage()
@Component({
  selector: 'page-open',
  templateUrl: 'open.html',
})
export class OpenPage {

   view: string;
   requests: any;
   sent: Array<SubRequest> = [];
   incoming: Array<SubRequest> = [];

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider,
     public users: UsersProvider
   ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenPage');
    this.view = 'sent';
    this.sr.loadRequests('incomplete')
      .subscribe(
         requests => {
            this.requests = requests,
            this.sent = this.requests.sent;
            this.incoming = this.requests.incoming,
            console.log('sent: ', this.sent),
            console.log('incoming: ', this.incoming);

            // Get the sender images and assign to each SubRequest.
            this.getSenderPics(this.sent);
            this.getSenderPics(this.incoming);
         }, err => {
            console.log(err)
         }
      );
   }

   getSenderPics(view) {
      for(let i in view) {
         this.users.getUser(view[i].user_id).subscribe(
            res => {
               view[i].sender_img = res.image
            }, err => {
               console.log(err)
            }
         )
      };
   }
}
