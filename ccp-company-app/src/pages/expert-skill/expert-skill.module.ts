import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ExpertSkillPage} from './expert-skill';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ExpertSkillPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertSkillPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class ExpertSkillPageModule {}
