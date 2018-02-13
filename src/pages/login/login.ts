import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';

import { TabsPage } from '../tabs/tabs'

import { AuthProvider } from '../../providers/auth/auth'

import { LoadingController } from 'ionic-angular';

import { LinkMindBodyPage } from '../link-mind-body/link-mind-body';

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
   output: string;
   pushLinkMindBody = LinkMindBodyPage;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public _tokenService: Angular2TokenService,
     public loadingCtrl: LoadingController
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
           loader.dismiss();
            this.navCtrl.push(TabsPage)
        } else {
           console.log('Sign in fail.'),
           this.output = 'Invalid credentials. Please try again.';
        }
     });
   }


}
