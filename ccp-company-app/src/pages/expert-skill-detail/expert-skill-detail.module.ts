import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ExpertSkillDetailPage} from './expert-skill-detail';

@NgModule({
  declarations: [
    ExpertSkillDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertSkillDetailPage),
  ],
})
export class ExpertSkillDetailPageModule {}
