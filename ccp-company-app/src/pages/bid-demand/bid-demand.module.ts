import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BidDemandPage} from './bid-demand';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    BidDemandPage,
  ],
  imports: [
    IonicPageModule.forChild(BidDemandPage),PipesModule,
  ],
})
export class BidDemandPageModule {}
