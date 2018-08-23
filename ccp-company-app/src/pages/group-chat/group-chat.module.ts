import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupChatPage } from './group-chat';
import {PipesModule} from "../../pipes/pipes.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GroupChatPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupChatPage),TranslateModule.forChild(),PipesModule,
  ],
})
export class GroupChatPageModule {}
