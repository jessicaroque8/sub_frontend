import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Sendee } from '../../models/sendee.model';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'reply-item',
  templateUrl: 'reply-item.html'
})
export class ReplyItemComponent {

  @Input() sendee: Sendee;
  @Output() onSubSelected = new EventEmitter<boolean>();
  subSelected = false;

  constructor(
     public actionSheetCtrl: ActionSheetController
  ) {
    console.log('Hello ReplyItemComponent Component');
    }

  presentReplyActionSheet() {
     let actionSheet = this.actionSheetCtrl.create({
        title: this.sendee.first_name + ' ' + this.sendee.last_name[0],
        buttons: [
           {
              text: 'Set as Sub',
              handler: () => {
                 console.log('Set as Sub chosen from presentReplyActionSheet().');
                 this.setSub();
              }
           },
           {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                 console.log('Cancel clicked');
              }
           }
        ]
     });

     actionSheet.present();
  }

  setSub() {
     this.onSubSelected.emit(true);
     this.subSelected = true;
     console.log('setSub()');
  }

}
