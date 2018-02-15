import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSubRequestPage } from './create-sub-request';

@NgModule({
  declarations: [
    CreateSubRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSubRequestPage),
  ],
})
export class CreateSubRequestPageModule {}
