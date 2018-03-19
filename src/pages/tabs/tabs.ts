import { Component } from '@angular/core';

// import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { OpenPage } from '../open/open';
import { ClosedPage } from '../closed/closed';
// import { PastPage } from '../past/past';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // tab1Root = HomePage;
  tab1Root = OpenPage;
  tab2Root = ClosedPage;
  // tab4Root = PastPage;
  tab3Root = AccountPage;

  constructor() {
     console.log('On TabsPage!!')
  }
}
