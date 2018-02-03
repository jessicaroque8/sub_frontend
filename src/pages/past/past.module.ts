import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastPage } from './past';

@NgModule({
  declarations: [
    PastPage,
  ],
  imports: [
    IonicPageModule.forChild(PastPage),
  ],
})
export class PastPageModule {}
