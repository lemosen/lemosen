import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EvaluatesPage} from './evaluates';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    EvaluatesPage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluatesPage),ComponentsModule
  ],
})
export class EvaluatesPageModule {}
