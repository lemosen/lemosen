import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InviteDemandDetailPage} from './invite-demand-detail';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    InviteDemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteDemandDetailPage),ComponentsModule
  ],
})
export class InviteDemandDetailPageModule {}
