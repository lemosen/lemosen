import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DemandSearchPage} from './demand-search';

@NgModule({
  declarations: [
    DemandSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DemandSearchPage),
  ],
})
export class DemandSearchPageModule {}
