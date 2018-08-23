import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ReviewDemandDetailPage} from './review-demand-detail';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ReviewDemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewDemandDetailPage),ComponentsModule
  ],
})
export class ReviewDemandDetailPageModule {}
