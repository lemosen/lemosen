import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BiddedReserveDetailPage} from './bidded-reserve-detail';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    BiddedReserveDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BiddedReserveDetailPage),TranslateModule.forChild(),
  ],
})
export class BiddedReserveDetailPageModule {}
