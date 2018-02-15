import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateSubRequest1Page } from '../sub-request/create-sub-request1/create-sub-request1';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   pushPage = CreateSubRequest1Page;

  constructor(public navCtrl: NavController) {

  }

}
