import {Component, Input} from '@angular/core';

/**
 * Generated class for the NoDataShowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'no-data-show',
  templateUrl: 'no-data-show.html'
})
export class NoDataShowComponent {

  @Input()
  text: string;

  @Input()
  objs:any;

  constructor() {
    console.log('Hello NoDataShowComponent Component');
    this.text = 'Hello World';
  }

}
