import {Pipe, PipeTransform} from "@angular/core";


/**
 * Created by lemosen on 17/6/24.
 */
@Pipe({
    name: 'sortPipe'
})
export class SortPipe implements PipeTransform {


    constructor() {

    }

    transform(objects: any, objectKey:string , order:boolean = false): any {
      if (objects != null){
        objects.sort((a,b)=>{
          if (a[objectKey] < b[objectKey]){
            return order ? -1 : 1;
          }else {
            return order ? 1 : -1;
          }
        });
      }
      return objects;
    }
}
