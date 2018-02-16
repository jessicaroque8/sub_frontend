import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubRequest } from '../../../models/sub-request.model';
import { AuthProvider } from '../../../providers/auth/auth';
import { GroupsProvider } from '../../../providers/groups/groups';

@IonicPage()
@Component({
  selector: 'page-create-sub-request2',
  templateUrl: 'create-sub-request2.html',
})
export class CreateSubRequest2Page {

   newRequest: SubRequest = new SubRequest();

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public auth: AuthProvider,
     public groups: GroupsProvider
   ) {}

  ionViewWillLoad() {
     let foundClasses = this.navParams.get('foundClasses');
        console.log(foundClasses);

     let selectedClassPosition = this.navParams.get('selectedClassPosition');
        console.log(selectedClassPosition);

     this.newRequest = foundClasses[selectedClassPosition];
        console.log(this.newRequest);

     this.newRequest.user = this.auth.currentUser;
        console.log(this.newRequest.user);
   }

  ionViewDidLoad() {
      console.log('ionViewDidLoad CreateSubRequest2Page');
      this.groups.getUserGroups().subscribe(val => {
         console.log(val)
      }, err => {
         console.log(err)
      });
  }

  createRequest() {

 }

}
