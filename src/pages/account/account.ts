import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UsersProvider } from '../../providers/users/users';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

   currentUser: any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public users: UsersProvider
  ) {

  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad AccountPage');
      this.users.getUser(this.auth.userData.data.id).subscribe(
         res => {
            this.currentUser = res,
            console.log(this.currentUser);
         }, err => {
            console.log(err)
         }
      );
  }

}
