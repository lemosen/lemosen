import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PayModalPage} from './pay-modal';

@NgModule({
    declarations: [
        PayModalPage,
    ],
    imports: [
        IonicPageModule.forChild(PayModalPage),
    ],
})
export class PayModalPageModule {
}
