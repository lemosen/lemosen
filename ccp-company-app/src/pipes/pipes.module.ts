import {NgModule} from '@angular/core';
import {ErrorMessagePipe} from './error-message/error-message';
import {ChatDateTimePipe} from "./ChatDateTimePipe";
import {SortPipe} from "./SortPipe";
import { FilterArrayPipe } from './filter-array/filter-array';

@NgModule({
	declarations: [ErrorMessagePipe,ChatDateTimePipe,SortPipe,
    FilterArrayPipe,],
	imports: [],
	exports: [ErrorMessagePipe,ChatDateTimePipe,SortPipe,
    FilterArrayPipe,]
})
export class PipesModule {}
