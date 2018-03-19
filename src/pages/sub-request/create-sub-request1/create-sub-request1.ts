import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { SubRequest } from '../../../models/sub-request.model';
import { MindBodyProvider } from '../../../providers/mind-body/mind-body';
import { AuthProvider } from '../../../providers/auth/auth';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CreateSubRequest2Page } from '../create-sub-request2/create-sub-request2';
import { User } from '../../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-create-sub-request1',
  templateUrl: 'create-sub-request1.html',
})
export class CreateSubRequest1Page {

   searchClassData = { filters: {
      staff_id_mb: null,
      start_date_time: null,
      end_date_time: null
   }};

   disableSearchButton: boolean = true;
   showNextButton: boolean = false;
   disableNextButton: boolean = true;
   outlineSearch: boolean = false;

   foundClasses: Array<any> = [];
   selectedClassPosition: number;

   currentUser: any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private datePicker: DatePicker,
     private mb: MindBodyProvider,
     public auth: AuthProvider,
     public loadingCtrl: LoadingController,
     public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSubRequest1Page');
    this.currentUser = this.auth.getCurrentUser();

    this.searchClassData.filters.staff_id_mb = this.currentUser.staff_id_mb;
    console.log(this.searchClassData.filters.start_date_time);

    // Remove when stable. Used to debug in browser.
    this.searchClassData.filters.start_date_time = new Date('March 27, 2018 09:00:00');
    this.searchClassData.filters.end_date_time = this.searchClassData.filters.start_date_time;

    this.disableSearchButton = false;
    this.showNextButton = true;
  }

  ionViewDidLeave() {
     this.searchClassData = { filters: {
        staff_id_mb: '',
        start_date_time: null,
        end_date_time: null
     }};
     this.foundClasses = [];
     this.disableSearchButton = true;
     this.showNextButton =  false;
     this.foundClasses = [];
     this.selectedClassPosition = null;

     console.log('CreateSubRequest1 view left, reset properties.')
   }

  showDatePicker() {
     this.datePicker.show({
       date: new Date(),
       mode: 'datetime',
      }).then(
          date => {
             if (date) {
                console.log('date in current time zone: ', date.toString()),

                this.searchClassData.filters.start_date_time = date;
                this.searchClassData.filters.end_date_time = date;
                console.log('Got date: ', this.searchClassData.filters.start_date_time);
                this.disableSearchButton = false;
             }
          }, err => {
             console.log('Error occurred while getting date: ', err)
          }
      );
   }

   searchForClass(){
      let loader = this.loadingCtrl.create({
         spinner: 'dots',
         showBackdrop: false
      });
      loader.present();
      this.foundClasses = [];
      this.mb.searchClasses(this.searchClassData).toPromise()
         .then( foundClasses => {
            console.log('Found classes: ', foundClasses);
               if (foundClasses.length > 0) {
                  for (let c in foundClasses) {
                     this.foundClasses[c] = new SubRequest();
                        this.foundClasses[c]['class_id_mb'] = foundClasses[c]['class_id_mb'];
                        this.foundClasses[c]['class_name'] = foundClasses[c]['class_name'];
                        this.foundClasses[c]['end_date_time'] = foundClasses[c]['end_date_time'];
                        this.foundClasses[c]['staff_id_mb'] = foundClasses[c]['staff_id'];
                        this.foundClasses[c]['start_date_time'] = foundClasses[c]['start_date_time']
                  }
                  loader.dismiss();
                  console.log('this.foundClasses: ', this.foundClasses),
                  console.log(this.foundClasses[0]['class_id_mb'])
                  this.outlineSearch = true;
                  this.showNextButton = true;
               } else {
                  console.log('No classes found: ', foundClasses);
                  loader.dismiss();
                  let alert = this.alertCtrl.create({
                     title: 'We couldn\'t find your class with that date and time. Please try again.',
                     buttons: ['OK']
                  });
                  alert.present();
               }
         }).catch( err => {
            console.log(err);
         });

   }

   goToPartTwo() {
      this.navCtrl.push(CreateSubRequest2Page, {
         foundClasses: this.foundClasses,
         selectedClassPosition: this.selectedClassPosition
      });
   }

}
