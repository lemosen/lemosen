import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {WorkDemandsPage} from './work-demands';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    WorkDemandsPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkDemandsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class WorkDemandsPageModule {}
