import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UsersProvider } from '../../providers/users/users';
import { User } from '../../models/user.model';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

   loaded: boolean = false;
   currentUser = new User();
   pushLogin = LoginPage;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public users: UsersProvider,
     public loadingCtrl: LoadingController,
     public local: Storage
  ) {}

  ionViewDidLoad() {
      console.log('ionViewDidLoad AccountPage');
      let loader = this.loadingCtrl.create({
         spinner: 'dots',
         showBackdrop: false
      });
      loader.present();

      if (this.auth.currentUser) {
         this.users.getUser(this.auth.currentUser.id).subscribe( (res) => {
            console.log(res);
            this.currentUser = res as User;
            console.log(this.currentUser);
            loader.dismiss().then(res => {
               this.loaded = true
            });
         });
      } else {
         this.local.get('currentUser').then(currentUser => {
            this.users.getUser(currentUser.id).subscribe( (res) => {
               this.currentUser = res as User;
               console.log(this.currentUser);
               loader.dismiss().then(res => {
                  this.loaded = true
               });
            });
         });
      }
   }

  logOut() {
     let loader = this.loadingCtrl.create({
        spinner: 'dots',
        showBackdrop: false
     });
     loader.present();
     this.auth.logOut();
     loader.dismiss();
     this.navCtrl.setRoot(LoginPage);
  }

}
