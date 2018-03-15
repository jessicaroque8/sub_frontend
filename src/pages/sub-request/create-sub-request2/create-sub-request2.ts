import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequest } from '../../../models/sub-request.model';
import { AuthProvider } from '../../../providers/auth/auth';
import { PopoverController } from 'ionic-angular';
import { SubRequestsProvider } from '../../../providers/sub-requests/sub-requests';
import { ShowSubRequestPage } from '../show-sub-request/show-sub-request';
import { ToastController } from 'ionic-angular';
import { UsersProvider } from '../../../providers/users/users';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-create-sub-request2',
  templateUrl: 'create-sub-request2.html',
})
export class CreateSubRequest2Page {

   currentUser: User;
   newRequest: SubRequest = new SubRequest();
   paramsToCreate: {
      user_id: number,
      group_id: number,
      class_id_mb: number,
      start_date_time: string,
      end_date_time: string,
      class_name: string,
      note: string
   }

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public sr: SubRequestsProvider,
     public toastCtrl: ToastController,
     public users: UsersProvider,
     public loadingCtrl: LoadingController
   ) {}

  ionViewWillLoad() {
     let loader = this.loadingCtrl.create({
        spinner: 'dots',
        showBackdrop: false
     });
     loader.present();

     this.currentUser = this.auth.getCurrentUser();

     let foundClasses = this.navParams.get('foundClasses');
        console.log(foundClasses);

     let selectedClassPosition = this.navParams.get('selectedClassPosition');
        console.log(selectedClassPosition);

     this.newRequest = foundClasses[selectedClassPosition];
        console.log(this.newRequest);

     this.users.getUser(this.currentUser.id).subscribe( res => {
        this.newRequest.user = res as User;
        console.log(this.newRequest.user);
        loader.dismiss();
     });
   }

  ionViewDidLoad() {
      console.log('ionViewDidLoad CreateSubRequest2Page');
  }

  ionViewWillLeave() {
     this.newRequest = null;
     this.paramsToCreate = null;
   }

  createRequest() {
     console.log('newRequest: ', this.newRequest);
     this.paramsToCreate = {
        user_id: this.newRequest.user.id,
        group_id: this.newRequest.group.id,
        class_id_mb: this.newRequest.class_id_mb,
        start_date_time: this.newRequest.start_date_time,
        end_date_time: this.newRequest.end_date_time,
        class_name: this.newRequest.class_name,
        note: this.newRequest.note
     }
     console.log('this.paramsToCreate: ', this.paramsToCreate);

     this.sr.createRequest(this.paramsToCreate).subscribe( response => {
        console.log('Request created: ', response);

        let toast = this.toastCtrl.create({
           message: 'Request sent.',
           duration: 3000,
           position: 'bottom'
        });

        toast.onDidDismiss(() => {
           console.log('Dismissed toast');
        });

        this.navCtrl.push(ShowSubRequestPage, {
           view: 'sent',
           id: response['id'],
           disableBack: true
        });

        toast.present();
     });
  }

}
