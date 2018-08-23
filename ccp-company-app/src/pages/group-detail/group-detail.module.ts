import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupDetailPage } from './group-detail';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    GroupDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupDetailPage),PipesModule,
  ],
})
export class GroupDetailPageModule {}
