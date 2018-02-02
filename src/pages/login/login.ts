import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';

import { TabsPage } from '../tabs/tabs'

import { AuthProvider } from '../../providers/auth/auth'

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

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public _tokenService: Angular2TokenService
   ) {
      this.pushPage = TabsPage;
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
      this.authRedirect();
   }

// Push to TabsPage not working.
   authRedirect() {
      this.auth.authStatus.subscribe(authenticated => {
         console.log(authenticated == true);
         if (authenticated == true) {
            this.navCtrl.push(TabsPage)
         }
      });
   }

  signIn(email, password) {
     this.auth.signIn(email, password).subscribe(value => {
        console.log(value)
        if (value == 'success') {
           console.log(this.auth.id_token),
           console.log(this.auth.userData),
           this.navCtrl.push(TabsPage)
        } else {
           this.output = 'Invalid login credentials. Please try again.'
        }
     });
   }

}
