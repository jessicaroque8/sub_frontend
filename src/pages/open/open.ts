import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../models/sub-request.model';
import { UsersProvider } from '../../providers/users/users';
import { ShowSubRequestPage } from '../sub-request/show-sub-request/show-sub-request';
import { User } from '../../models/user.model';
import { LoadingController } from 'ionic-angular';
import { RepliesProvider } from '../../providers/replies/replies';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
   loaded: boolean = false;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider,
     public users: UsersProvider,
     public loadingCtrl: LoadingController,
     public replies: RepliesProvider,
     public auth: AuthProvider,
     public toastCtrl: ToastController,
     public alertCtrl: AlertController
   ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenPage');
    this.view = 'sent';
   }

   ionViewDidEnter() {
      this.loaded = false;
      let loader = this.loadingCtrl.create({
          spinner: 'dots',
          showBackdrop: false
      });
      loader.present();

      this.sr.loadRequests().subscribe( requests => {
         console.log(requests);
         loader.dismiss();
      }, err => {
         console.log(err);
         loader.dismiss();
      });

      // this.sr.loadRequests('incomplete')
      //   .subscribe(
      //      requests => {
      //         this.requests = requests;
      //         this.sent = this.requests.sent;
      //         this.incoming = this.requests.incoming;
      //         console.log('sent: ', this.sent),
      //         console.log('incoming: ', this.incoming);
      //
      //         // Get the sender images and assign to each SubRequest.
      //         this.getSenderPics(this.sent);
      //         this.getSenderPics(this.incoming);
      //         loader.dismiss().then(res => {
      //            this.loaded = true
      //         });
      //      }, err => {
      //         console.log(err)
      //      }
      //   );
   }
   //
   // getSenderPics(view) {
   //    for(let i in view) {
   //       this.users.getUser(view[i].user_id).subscribe(
   //          res => {
   //             let sender = res as User;
   //             view[i].sender_img = sender.image
   //          }, err => {
   //             console.log(err)
   //          }
   //       );
   //    }
   // }
   //
   // showRequest(id) {
   //    this.navCtrl.push(ShowSubRequestPage, {
   //       id: id,
   //       view: this.view
   //    });
   // }

   // reply(request, reply_value, reply_note) {
   //    let reply_params = {
   //       value: reply_value
   //    }
   //
   //    this.promptReplyNote().then( result => {
   //       if (result != 'Note skipped') {
   //          reply_params.note = result[0]
   //       }
   //
   //       let currentUserSendee = request.currentUserSendee();
   //       console.log(currentUserSendee);

         // this.getCurrentUserSendeeAndReply(request).then( result => {
         //    console.log(reply_params);
         //    // Below is not running
         //    this.replies.editReply(request.id, result.sendee.id, result.reply.id, reply_params).subscribe( res => {
         //       console.log(res);
         //       let toast = this.toastCtrl.create({
         //          message: 'Sent reply: ' + reply_value + '.',
         //          duration: 3000
         //       });
         //       toast.present();
         //    });
         // });

   //    });
   //
   //
   // }

   // getCurrentUserSendeeAndReply(request) {
   //    return new Promise( (resolve, reject) => {
   //       this.sr.loadRequest(request.id).subscribe(
   //          request => {
   //             for (let s of request.sendees) {
   //                if (s.user.id == this.auth.currentUser.id) {
   //                   let sendee_reply = {};
   //                   sendee_reply.sendee = s;
   //                   sendee_reply.reply = s.reply;
   //                   resolve(sendee_reply);
   //                };
   //             }
   //          },
   //          err => {
   //             reject(console.log(err))
   //          }
   //       );
   //    });
   // }

   // promptReplyNote() {
   //    return new Promise ( (resolve) => {
   //       let prompt = this.alertCtrl.create({
   //          message: "Add a note to your reply.",
   //          inputs: [
   //             {},
   //          ],
   //          buttons: [
   //             {
   //                text: 'Skip',
   //                handler: data => {
   //                   console.log('Skip clicked');
   //                   resolve('Note skipped');
   //                }
   //             },
   //             {
   //                text: 'Save',
   //                handler: note => {
   //                   console.log('Save clicked');
   //                   resolve(note);
   //                }
   //             }
   //          ]
   //       });
   //
   //       prompt.present();
   //    });
   // }

}
