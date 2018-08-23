import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TopicsPage} from './topics';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TopicsPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicsPage),ComponentsModule
  ],
})
export class TopicsPageModule {}
