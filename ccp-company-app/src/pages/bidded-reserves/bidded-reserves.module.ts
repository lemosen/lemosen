import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BiddedReservesPage} from './bidded-reserves';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    BiddedReservesPage,
  ],
  imports: [
    IonicPageModule.forChild(BiddedReservesPage),ComponentsModule
  ],
})
export class BiddedReservesPageModule {}
