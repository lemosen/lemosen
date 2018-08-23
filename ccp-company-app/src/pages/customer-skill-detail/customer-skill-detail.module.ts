import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CustomerSkillDetailPage} from './customer-skill-detail';

@NgModule({
  declarations: [
    CustomerSkillDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerSkillDetailPage),
  ],
})
export class CustomerSkillDetailPageModule {}
