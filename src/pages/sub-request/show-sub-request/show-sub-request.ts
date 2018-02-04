import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../../models/sub-request.model'


@IonicPage()
@Component({
  selector: 'page-show-sub-request',
  templateUrl: 'show-sub-request.html',
})
export class ShowSubRequestPage {

   request: SubRequest;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowSubRequestPage');
    this.sr.loadRequest(this.navParams.get('id')).subscribe(
      res => {
         this.request = res as SubRequest,
         console.log(this.request)
      }, err => {
         console.log('Error loading request.')
      }
   );
  }

}
