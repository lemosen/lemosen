import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AppealsPage} from './appeals';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AppealsPage,
  ],
  imports: [
    IonicPageModule.forChild(AppealsPage),TranslateModule.forChild(),ComponentsModule,
  ],
})
export class AppealsPageModule {}
