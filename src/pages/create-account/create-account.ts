import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

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

   params = {
      staff_id_mb: "",
      first_name: "",
      last_name: "",
      email: "",
      siteids: ""
   }

   user = {
      "email": "",
      "password": "",
      "password_confirmation": "",
      "provider": "email",
      "first_name": "",
      "last_name": "",
      "staff_id_mb": ""
   }

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public users: UsersProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
    this.params.staff_id_mb = this.navParams.get('staff_id_mb');
    this.params.first_name = this.navParams.get('first_name');
    this.params.last_name = this.navParams.get('last_name');
    this.params.email = this.navParams.get('email');
    this.params.siteids = this.navParams.get('siteids');
    console.log(this.params);
  }

  createAccount() {
     this.user.first_name = this.params.first_name;
     this.user.last_name = this.params.last_name;
     this.user.staff_id_mb = this.params.staff_id_mb;
     this.users.createAccount(this.user).subscribe(val => {
        console.log(val)
     });
   }

}
