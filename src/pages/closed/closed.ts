import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequestsProvider } from '../../providers/sub-requests/sub-requests';
import { SubRequest } from '../../models/sub-request.model';
import { LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-closed',
  templateUrl: 'closed.html',
})
export class ClosedPage {

   view: string;
   sent: Array<SubRequest> = [];
   incoming: Array<SubRequest> = [];
   loaded: boolean = false;
   errorLoadingSent: boolean = false;
   errorLoadingIncoming: boolean = false;
   currentUser: any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public sr: SubRequestsProvider,
     public loadingCtrl: LoadingController,
     public auth: AuthProvider
 ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClosedPage');
    this.view = 'sent';
  }

  ionViewWillEnter() {
     this.loaded = false;
     let loader = this.loadingCtrl.create({
         spinner: 'dots',
         showBackdrop: false,
         enableBackdropDismiss: true
     });
     loader.present();

     this.currentUser = this.auth.getCurrentUser();

     Promise.all([this.getSent(), this.getIncoming()])
        .then( res => {
           console.log('Both sent and incoming are done.'),
           this.loaded = true;
           loader.dismiss();
        }).catch( err => {
           console.log('There was an error loading either sent or incoming requests.'),
           this.loaded = true;
           loader.dismiss();
        })
  }

  ionViewWillLeave() {
     this.loaded = false;
     this.errorLoadingSent = false;
     this.errorLoadingIncoming = false;
  }

  getSent() {
     return new Promise( (resolve, reject) => {
        this.sr.loadRequests('resolved_sent').toPromise()
        .then( requests => {
           this.sent = requests as Array<SubRequest>;
           console.log('this.sent: ', this.sent),
           resolve(this.sent);
        }).catch( err => {
              this.errorLoadingSent = true;
              reject(console.log(err));
           });
     });
  }

  getIncoming() {
     return new Promise( (resolve, reject) => {
        this.sr.loadRequests('resolved_incoming').toPromise()
        .then( requests => {
           this.incoming = requests as Array<SubRequest>;
           console.log('this.incoming: ', this.incoming);
           resolve(this.incoming);
        }).catch( err => {
           this.errorLoadingIncoming = true;
           reject(console.log(err));
        });
     });
  }

}
