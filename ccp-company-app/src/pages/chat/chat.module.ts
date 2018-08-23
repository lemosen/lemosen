import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BiddingDemandDetailPage} from './bidding-demand-detail';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";
import {ChatPage} from "./chat";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),ComponentsModule,TranslateModule.forChild(),PipesModule
  ],
})
export class ChatPageModule {}
