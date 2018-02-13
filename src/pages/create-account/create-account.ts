import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

   newUserData = {
      staffIdMb: '',
      firstName: '',
      lastName: '',
      email: '',
      siteIds: ''
   }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
    this.newUserData.staffIdMb = this.navParams.get('staff_id_mb');
    this.newUserData.firstName = this.navParams.get('first_name');
    this.newUserData.lastName = this.navParams.get('last_name');
    this.newUserData.email = this.navParams.get('email');
    this.newUserData.siteIds = this.navParams.get('siteIds');
    console.log(this.newUserData);
  }

}
