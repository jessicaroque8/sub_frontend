import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequest } from '../../../models/sub-request.model';
import { SubRequestsProvider } from '../../../providers/sub-requests/sub-requests';
import { ToastController } from 'ionic-angular';
import { ShowSubRequestPage } from '../show-sub-request/show-sub-request';


@IonicPage()
@Component({
  selector: 'page-edit-sub-request',
  templateUrl: 'edit-sub-request.html',
})
export class EditSubRequestPage {

   request: SubRequest = new SubRequest();

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider,
     public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubRequestPage');
    this.request = this.navParams.get('request');
    console.log('EditRequest this.request: ', this.request);
  }

  editRequest() {
     console.log('editRequest()');
     this.sr.editRequest(this.request.id, this.request).subscribe( val => {
        console.log(val);

        let toast = this.toastCtrl.create({
           message: 'Request saved.',
           duration: 3000,
           position: 'bottom'
        });

        toast.onDidDismiss(() => {
           console.log('Dismissed toast');
        });


        this.navCtrl.push(ShowSubRequestPage, {
           view: 'sent',
           id: this.request.id,
           disableBack: true
        });

        toast.present();
      });

  }

}
