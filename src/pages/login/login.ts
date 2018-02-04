import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';

import { TabsPage } from '../tabs/tabs'

import { AuthProvider } from '../../providers/auth/auth'

import { LoadingController } from 'ionic-angular';

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
   pushPage: any;
   loggedIn: boolean;
   loading: boolean;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public _tokenService: Angular2TokenService,
     public loadingCtrl: LoadingController
   ) {
      this.pushPage = TabsPage;
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
      if (this._tokenService.userSignedIn()) {
         this.navCtrl.push(TabsPage);
      }
   }

  signIn(email, password) {
     this.loading = true;
     this.auth.signIn(email, password).toPromise().then( (result) => {
        console.log(result);
        if (result === true) {
           console.log('Sign in success.'),
           this.presentLoading();
           setTimeout( () => {
             this.navCtrl.push(TabsPage)
            }, 2000);
        } else {
           console.log('Sign in fail.'),
           this.output = 'Invalid credentials. Please try again.';
           this.loading = false
        }
     });
   }

   presentLoading() {
      let loader = this.loadingCtrl.create({
          duration: 2000,
          spinner: 'bubbles',
          showBackdrop: true
      });
      loader.present();
   }

}
