import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../providers/sub-requests/sub-requests';
/**
 * Generated class for the OpenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-open',
  templateUrl: 'open.html',
})
export class OpenPage {

   openRequests: any;
   sent: any;
   incoming: any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenPage');
    this.loadSave();
  }

  loadSave() {
     this.sr.loadAll('incomplete').then(data => {
        this.openRequests = data,
        this.sent = this.openRequests.sent,
        console.log(this.sent)
     })
  }

}
