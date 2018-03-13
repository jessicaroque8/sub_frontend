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

    let request = this._tokenService.init({
      apiBase: 'http://10.0.1.65:8100/proxy',
    });
  }


}
