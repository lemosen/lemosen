import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ListSkillRecordPage} from './list-skill-record';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ListSkillRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(ListSkillRecordPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class ListSkillRecordPageModule {}
