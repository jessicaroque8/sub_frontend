import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateSubRequestPage } from '../sub-request/create-sub-request/create-sub-request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   pushPage = CreateSubRequestPage;

  constructor(public navCtrl: NavController) {

  }

}
