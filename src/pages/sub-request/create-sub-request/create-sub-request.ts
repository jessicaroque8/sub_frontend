import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { SubRequest } from '../../../models/sub-request.model';
import { MindBodyProvider } from '../../../providers/mind-body/mind-body';
import { AuthProvider } from '../../../providers/auth/auth';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { FormControl, FormGroup } from '@angular/forms';

/**
 * Generated class for the CreateSubRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-sub-request',
  templateUrl: 'create-sub-request.html',
})
export class CreateSubRequestPage {

   searchClassData = { filters: {
      staff_id_mb: '',
      start_date_time: null,
      end_date_time: null
   }};

   showPartOne: boolean = true;
   showPartTwo: boolean = false;
   disableSearchButton: boolean = true;
   showNextButton: boolean = false;

   foundClasses = [];
   selectedClassPosition: number;

   newRequest: SubRequest = new SubRequest();

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
    console.log('ionViewDidLoad CreateSubRequestPage');
    this.searchClassData.filters.staff_id_mb = this.auth.currentUser.staff_id_mb;
    console.log(this.searchClassData.filters.start_date_time);
  }

  ionViewDidLeave() {
     this.searchClassData = { filters: {
        staff_id_mb: '',
        start_date_time: null,
        end_date_time: null
     }};
     this.foundClasses = [];
     this.newRequest = new SubRequest();
     this.showPartOne = true;
     showPartTwo = false;
     disableSearchButton = true;
     showNextButton =  false;
     foundClasses = [];
     selectedClassPosition: null;
     newRequest = new SubRequest();

     console.log('CreateSubRequest view left, reset properties.')
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
      this.mb.searchClasses(this.searchClassData)
      .subscribe( foundClasses => {
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
               this.showNextButton = true;
            } else {
               loader.dismiss();
               let alert = this.alertCtrl.create({
                  title: 'We couldn\'t find your class with that date and time. Please try again.',
                  buttons: ['OK']
               });
               alert.present();
            }
         }, err => {
            console.log(err);
         });

   }

   startPartTwo() {
      this.showPartOne = false;
      this.showPartTwo = true;

      let selectedClass = this.foundClasses[this.selectedClassPosition];

      this.newRequest['class_id_mb'] = selectedClass['class_id_mb'];
      this.newRequest['class_name'] = selectedClass['class_name'];
      this.newRequest['start_date_time'] = selectedClass['start_date_time'];
      this.newRequest['end_date_time'] = selectedClass['end_date_time'];
      this.newRequest['end_date_time'] = selectedClass['end_date_time'];
   }

}
