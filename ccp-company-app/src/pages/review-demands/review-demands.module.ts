import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ReviewDemandsPage} from './review-demands';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ReviewDemandsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewDemandsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class ReviewDemandsPageModule {}
