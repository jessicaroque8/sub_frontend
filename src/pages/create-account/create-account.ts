import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

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
      siteids: "",
      image: ""
   }

   user = {
      "email": "",
      "password": "",
      "password_confirmation": "",
      "provider": "email",
      "first_name": "",
      "last_name": "",
      "staff_id_mb": "",
      "image": ""
   }

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public users: UsersProvider,
     private alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     public auth: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
    this.params.staff_id_mb = this.navParams.get('staff_id_mb');
    this.params.first_name = this.navParams.get('first_name');
    this.params.last_name = this.navParams.get('last_name');
    this.params.email = this.navParams.get('email');
    this.params.siteids = this.navParams.get('siteids');
    this.params.image = this.navParams.get('image');
    console.log(this.params);
  }

  createAccount() {
     this.user.first_name = this.params.first_name;
     this.user.last_name = this.params.last_name;
     this.user.staff_id_mb = this.params.staff_id_mb;
     this.user.image = this.params.image;
     let loader = this.loadingCtrl.create({
         content: 'Creating your account...',
         spinner: 'dots',
         showBackdrop: false
     });
     loader.present();
     this.auth.registerAccount(this.user).subscribe(
        res => {
           console.log(res);
           loader.dismiss().then(res => {
               this.auth.signIn(this.user.email, this.user.password).subscribe( res => {
                  this.navCtrl.push(TabsPage)
               });
            });
         }, err => {
            console.log(err);
            loader.dismiss();
            let errorBody = JSON.parse(err._body);
            console.log(errorBody.errors.full_messages[0]);

            let alert = this.alertCtrl.create({
              title: errorBody.errors.full_messages[0],
              buttons: [{
                text: 'Ok',
                handler: () => {

                   alert.dismiss().then(res => {
                      this.navCtrl.popToRoot();
                   });

                  return false

                }
              }]
            });
            alert.present();
         }
      );
   }

}
