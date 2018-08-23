import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AppealDetailPage} from './appeal-detail';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AppealDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AppealDetailPage),ComponentsModule,TranslateModule.forChild()
  ],
})
export class AppealDetailPageModule {}
