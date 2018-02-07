import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../../models/sub-request.model';
import { Sendee } from '../../../models/sendee.model';
import { UsersProvider } from '../../../providers/users/users';
import { Observable } from 'rxjs';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-show-sub-request',
  templateUrl: 'show-sub-request.html',
})
export class ShowSubRequestPage {

   view: string;
   request_id: number;
   request = new SubRequest();
   sendeesAgree: Array<Sendee> = [];
   sendeesMaybe: Array<Sendee> = [];
   sendeesDecline: Array<Sendee> = [];
   sendeesNoReply: Array<Sendee> = [];
   showAll: boolean = true;
   showAgree: boolean = false;
   showMaybe: boolean = false;
   showDecline: boolean = false;
   showNoReply: boolean = false;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider,
     public users: UsersProvider,
     public actionSheetCtrl: ActionSheetController,
     public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
      console.log('ionViewDidLoad ShowSubRequestPage');
      this.view = this.navParams.get('view');
      this.request_id = this.navParams.get('id');
      this.sr.loadRequest(this.request_id).subscribe( request => {
         this.request = request;
         console.log(this.request);
         this.sortSendeesByReplyValue();
      });
   }

   sortSendeesByReplyValue() {
      for (let s in this.request.sendees) {
         if (this.request.sendees[s].reply.value == 'agree') {
            this.sendeesAgree.push(this.request.sendees[s])

         } else if(this.request.sendees[s].reply.value == 'maybe') {
            this.sendeesMaybe.push(this.request.sendees[s])

         } else if(this.request.sendees[s].reply.value == 'decline') {
            this.sendeesDecline.push(this.request.sendees[s])

         } else {
            this.sendeesNoReply.push(this.request.sendees[s])
         }

      }
      console.log(this.sendeesAgree);
      console.log(this.sendeesMaybe);
      console.log(this.sendeesDecline);
      console.log(this.sendeesNoReply);
   }

   expandSendeeReplies(reply_value) {
      if (reply_value == 'agree') {
         this.showAgree = !this.showAgree;
         this.showAll = !this.showAll;

      } else if (reply_value == 'maybe') {
         this.showMaybe = !this.showMaybe;
         this.showAll = !this.showAll;

      } else if (reply_value == 'decline') {
         this.showDecline = !this.showDecline;
         this.showAll = !this.showAll;

      } else if (reply_value == 'no_reply') {
         this.showNoReply = !this.showNoReply;
         this.showAll = !this.showAll;

      }
   }

   presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
         buttons: [
            {
              text: 'Delete',
              role: 'destructive',
              handler: () => {
                console.log('Destructive clicked');
                this.showConfirmDelete();
              }
            },
            {
              text: 'Edit',
              handler: () => {
                console.log('Edit clicked');
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
         ]
      });
      actionSheet.present();
   }

   showConfirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to delete this request?',
      message: 'All replies will be lost.',
      buttons: [
        {
          text: 'Nevermind',
          handler: () => {
            console.log('Nevermind clicked');
          }
        },
        {
          text: 'I\'m sure',
          handler: () => {
            console.log('I\'m sure clicked');
            this.sr.deleteRequest(this.request_id).subscribe( val => {
               console.log(val);
            });
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
   }

}
