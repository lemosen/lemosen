import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TopicReplyPage} from './topic-reply';

@NgModule({
  declarations: [
    TopicReplyPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicReplyPage),
  ],
})
export class TopicReplyPageModule {}
