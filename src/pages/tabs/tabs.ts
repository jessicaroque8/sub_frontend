import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { OpenPage } from '../open/open';
import { ClosedPage } from '../closed/closed';
import { PastPage } from '../past/past';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LoginPage;
  tab3Root = OpenPage;
  tab4Root = ClosedPage;
  tab5Root = PastPage;
  tab6Root = AccountPage;

  constructor() {
     console.log('On TabsPage!!')
  }
}
