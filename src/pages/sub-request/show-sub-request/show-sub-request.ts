import { Component, Output } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../../models/sub-request.model';
import { Sendee } from '../../../models/sendee.model';
import { UsersProvider } from '../../../providers/users/users';
import { Observable } from 'rxjs';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { OpenPage } from '../../open/open';
import { EditSubRequestPage } from '../edit-sub-request/edit-sub-request';
import { ReplyItemComponent } from '../../../components/reply-item/reply-item';
import { SelectedSubsProvider } from '../../../providers/selected-subs/selected-subs';

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
   // repliesToShow: all, agree, maybe, decline, no_reply
   repliesToShow: string;
   loaded: boolean;
   disableBack: boolean = false;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider,
     public users: UsersProvider,
     public actionSheetCtrl: ActionSheetController,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     public toastCtrl: ToastController,
     public subs: SelectedSubsProvider,
  ) {}

  ionViewDidLoad() {
      console.log('ionViewDidLoad ShowSubRequestPage');
   }

   ionViewWillLoad() {
      this.disableBack = this.navParams.get('disableBack');
      console.log(this.disableBack);
      this.view = this.navParams.get('view');
      this.request_id = this.navParams.get('id');
      this.repliesToShow = 'all';
      this.loaded = false;
      this.loadRequest();
   }

   sortSendeesByReplyValue() {
      console.log(this.request.sendees);
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
                this.navCtrl.push(EditSubRequestPage, {
                   request: this.request
                });
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
            this.navCtrl.setRoot(OpenPage);
            this.presentToast();
          }
        }
      ]
    });
    confirm.present();
   }

   presentToast() {
      let toast = this.toastCtrl.create({
         message: 'Request deleted.',
         duration: 3000,
         position: 'bottom'
      });

      toast.onDidDismiss(() => {
         console.log('Dismissed toast');
      });

      toast.present();
   }

   setSub(event, sendee) {
      let params = {
         selected_sub: {
            sub_request_id: this.request.id,
            sendee_id: sendee.id,
            confirmed: false
         }
      }

      this.subs.createSelectedSub(this.request_id, params).subscribe( res => {
         console.log('Sub created on backend: ', res);

         // Reload request to show updated attributes (awaiting_confirm or closed) after Sendee updates.
         this.loadRequest();
      });

   }

   loadRequest() {
      this.loaded = false;
      let loader = this.loadingCtrl.create({
         spinner: 'dots',
         showBackdrop: false
      });
      loader.present();

      this.sr.loadRequest(this.request_id).subscribe( response => {
         console.log(response);
         this.request = response as SubRequest;
         console.log('Loaded request:', this.request);
         this.sortSendeesByReplyValue();
         loader.dismiss().then( result => {
            this.loaded = true;
         });
      });
   }
}
