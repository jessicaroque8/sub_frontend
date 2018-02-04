import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UsersProvider } from '../../providers/users/users';
import { User } from '../../models/user.model';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

   currentUser = new User();
   pushLogin = LoginPage;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public users: UsersProvider,
  ) {
     this.users.getUser(this.auth.currentUser.id).subscribe( (res) => {
        this.currentUser = res as User;
        console.log(this.currentUser);
     });
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad AccountPage');
  }

}
