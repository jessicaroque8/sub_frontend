import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { CreateAccountPage } from '../create-account/create-account';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the LinkMindBodyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link-mind-body',
  templateUrl: 'link-mind-body.html',
})
export class LinkMindBodyPage {

   input = { mbData: {} };

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public users: UsersProvider,
     private alertCtrl: AlertController,
     public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkMindBodyPage');
    this.input = {
      mbData: {
         'email': '',
         'password': '',
         'siteids': '',
         'first_name': '',
         'last_name': ''
      }
    }
  }

  linkToMindBodySaveData() {
     let loader = this.loadingCtrl.create({
       spinner: 'dots',
       showBackdrop: false
     });
     loader.present();
     this.users.linkToMindBody(this.input).subscribe(response => {
        if (response['id']) {
           loader.dismiss().then( result => {
             this.navCtrl.push(CreateAccountPage, {
               staff_id_mb: response['id'],
               first_name: response['first_name'],
               last_name: response['last_name'],
               email: this.input.mbData['email'],
               siteids: this.input.mbData['siteids']
             });
          });
        } else {
           loader.dismiss().then( result => {
             let alert = this.alertCtrl.create({
               title: 'Invalid MINDBODY credentials. Please try again.',
               buttons: [{
                 text: 'Ok',
                 handler: () => {
                   // user has clicked the alert button
                   // begin the alert's dismiss transition

                   this.clearInput().then(res => {
                      alert.dismiss();
                   });
                   return false;
                 }
               }]
             });
             alert.present();
          });
        }
     });
   }

   clearInput() {
      return new Promise ( (res, rej) => {
         this.input.mbData['email'] = '';
         this.input.mbData['password'] = '';
         this.input.mbData['siteids'] = '';
         this.input.mbData['first_name'] = '';
         this.input.mbData['last_name'] = '';
         res(true);
      });
   }

}
