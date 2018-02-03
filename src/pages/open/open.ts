import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../models/sub-request.model';


@IonicPage()
@Component({
  selector: 'page-open',
  templateUrl: 'open.html',
})
export class OpenPage {

   viewRequests: string;
   requests: any;
   sent: Array<SubRequest> = [];
   incoming: Array<SubRequest> = [];

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider
  ) {
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenPage');
    this.viewRequests = 'sent';
    this.sr.loadRequests('incomplete')
      .subscribe(
         requests => {
            this.requests = requests
            this.sent = this.requests.sent,
            this.incoming = this.requests.incoming,
            console.log('sent: ', this.sent),
            console.log('incoming: ', this.incoming);

         }, err => console.log(err)
      );
  }

}
