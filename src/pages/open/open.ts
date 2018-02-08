import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../models/sub-request.model';
import { UsersProvider } from '../../providers/users/users';
import { ShowSubRequestPage } from '../sub-request/show-sub-request/show-sub-request';
import { User } from '../../models/user.model';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-open',
  templateUrl: 'open.html',
})
export class OpenPage {

   loaded: boolean;
   view: string;
   requests: any;
   sent: Array<SubRequest> = [];
   incoming: Array<SubRequest> = [];

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider,
     public users: UsersProvider,
     public loadingCtrl: LoadingController
   ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenPage');
    this.loaded = false;
    let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        showBackdrop: true
    });
    loader.present();
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
         }, () => {
            this.loaded = true;
            loader.dismiss();
         }
      );
   }

   ionViewWillEnter() {
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
               let sender = res as User;
               view[i].sender_img = sender.image
            }, err => {
               console.log(err)
            }
         )
      };
   }

   showRequest(id) {
      this.navCtrl.push(ShowSubRequestPage, {
         id: id,
         view: this.view
      })
   }


}
