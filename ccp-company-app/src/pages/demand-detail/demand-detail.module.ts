import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DemandDetailPage} from './demand-detail';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    DemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandDetailPage),ComponentsModule,
  ],
})
export class DemandDetailPageModule {}
