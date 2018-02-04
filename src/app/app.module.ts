import { NgModule, ErrorHandler, Injectable, Injector  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Pro } from '@ionic/pro';
// HttpModule is deprecated by Ionic and Angular but required for Angular2TokenService to work.
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OpenPage } from '../pages/open/open';
import { ClosedPage } from '../pages/closed/closed';
import { PastPage } from '../pages/past/past';
import { AccountPage } from '../pages/account/account';
import { ShowSubRequestPage } from '../pages/sub-request/show-sub-request/show-sub-request';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { SubRequestsProvider } from '../providers/sub-requests/sub-requests';
import { UsersProvider } from '../providers/users/users';

const IonicPro = Pro.init('6200de52', {
  appVersion: "0.0.1"
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    TabsPage,
    OpenPage,
    ClosedPage,
    PastPage,
    AccountPage,
    ShowSubRequestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    RouterModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    TabsPage,
    OpenPage,
    ClosedPage,
    PastPage,
    AccountPage,
    ShowSubRequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicErrorHandler,
    [{provide: ErrorHandler, useClass: IonicErrorHandler}],
    AuthProvider,
    Angular2TokenService,
    SubRequestsProvider,
    UsersProvider
  ]
})

export class AppModule {}
