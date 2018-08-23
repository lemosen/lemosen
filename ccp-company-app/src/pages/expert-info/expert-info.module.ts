import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ExpertInfoPage} from './expert-info';
import {PipesModule} from "../../pipes/pipes.module";
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ExpertInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertInfoPage),PipesModule,TranslateModule.forChild(),ComponentsModule
  ],
})
export class ExpertInfoPageModule {}
