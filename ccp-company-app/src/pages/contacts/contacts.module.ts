import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ContactsPage} from './contacts';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsPage),ComponentsModule,TranslateModule.forChild(),PipesModule
  ],
})
export class ContactsPageModule {}
