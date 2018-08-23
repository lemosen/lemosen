import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InviteDemandsPage} from './invite-demands';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    InviteDemandsPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteDemandsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class InviteDemandsPageModule {}
