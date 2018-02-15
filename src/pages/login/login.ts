import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { TabsPage } from '../tabs/tabs'
import { AuthProvider } from '../../providers/auth/auth'
import { LoadingController } from 'ionic-angular';
import { LinkMindBodyPage } from '../link-mind-body/link-mind-body';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ AuthProvider ]
})
export class LoginPage {

   loginData = {
        email: '',
        password: ''
     };
   pushPage = LinkMindBodyPage;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public _tokenService: Angular2TokenService,
     public loadingCtrl: LoadingController,
     private alertCtrl: AlertController
   ) {
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
      if (this._tokenService.userSignedIn()) {
         this.navCtrl.push(TabsPage);
      }
   }

  signIn(email, password) {
     let loader = this.loadingCtrl.create({
         spinner: 'dots',
         showBackdrop: false
     });
     loader.present();

     this.auth.signIn(email, password).toPromise().then( (result) => {
        console.log(result);
        if (result === true) {
           console.log('Sign in success.'),
           loader.dismiss().then(res => {
             this.navCtrl.push(TabsPage)
          });
        } else {
           console.log('Sign in fail.'),
           loader.dismiss().then( result => {
             let alert = this.alertCtrl.create({
               title: 'We couldn\'t find an account with that email/password combination. Please try again.',
               buttons: [{
                 text: 'Ok',
                 handler: () => {

                  this.clearInput();
                  alert.dismiss();

                  return false;
                 }
               }]
             });
             alert.present();
            });
         }
      }).catch( (err) => {
         console.log(JSON.stringify(err));
      });
   }

   clearInput() {
      this.loginData.email = '';
      this.loginData.password = '';
   }
}
