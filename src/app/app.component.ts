import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Angular2TokenService } from 'angular2-token';
import { Storage } from '@ionic/storage';
// import { HttpHeaders } from '@angular/common/http';

import { AuthProvider } from '../providers/auth/auth';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any=LoginPage;

  headers = {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
     'Access-Control-Allow-Origin': '*'
  }

  requestOptions = {
     headers: this.headers
  }

  constructor(
     public platform: Platform,
     public statusBar: StatusBar,
     public splashScreen: SplashScreen,
     private auth: AuthProvider,
     private _tokenService: Angular2TokenService,
     public local: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.local.get('accessToken').then(accessToken => {
      console.log('accessToken SR ', accessToken)
      this.headers['access-token'] = accessToken
    });

    this.local.get('expiry').then(expiry => {
      console.log('expiry SR ', expiry)
      this.headers['expiry'] = expiry
    });

    this.local.get('token-type').then(type => {
      console.log('token-type ', type)
      this.headers['token-type'] = type
    });

    this.local.get('client').then(client => {
      console.log('client SR ', client)
      this.headers['client'] = client
    });

    this.local.get('uid').then(uid => {
      console.log('uid SR ', uid)
      this.headers['uid'] = uid
    });

    this._tokenService.init({
      apiBase: 'http://10.0.0.103:8100/proxy',
      globalOptions: this.requestOptions
    });

  }


}
