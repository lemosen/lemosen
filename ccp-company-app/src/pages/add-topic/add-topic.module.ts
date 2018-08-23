import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddTopicPage} from './add-topic';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTopicPage),PipesModule,
  ],
})
export class AddTopicPageModule {}
