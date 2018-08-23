import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGroupPage } from './add-group';
import {PipesModule} from "../../pipes/pipes.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AddGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGroupPage),TranslateModule.forChild(),PipesModule,
  ],
})
export class AddGroupPageModule {}
