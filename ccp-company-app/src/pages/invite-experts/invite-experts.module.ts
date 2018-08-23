import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InviteExpertsPage} from './invite-experts';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    InviteExpertsPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteExpertsPage),ComponentsModule
  ],
})
export class InviteExpertsPageModule {}
