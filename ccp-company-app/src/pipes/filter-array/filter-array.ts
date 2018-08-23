import {Pipe, PipeTransform} from '@angular/core';

/**
 * 数组对象过滤  筛选filterName等于filterValue的 返回新数组
 * 用于HTML 需筛选字段又懒得new 新变量处理
 * lemosen
 */
@Pipe({
    name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {

    /**
     *
     * @param array 过滤数组
     * @param {string} filterName 过滤字段名
     * @param filterValue 过滤值
     * @param operate 操作类型  eq neq  用到再补全方法哈
     * @returns {Array}
     */
    transform(array: any, filterName: string, filterValue: any,operate:string='eq') {
        let newArray = [];
        switch (operate){
            case 'eq':{
                array.forEach(value => {
                    if (value[filterName] == filterValue) {
                        newArray.push(value)
                    }
                });
                break;
            }
            case 'neq':{
                array.forEach(value => {
                    if (value[filterName] != filterValue) {
                        newArray.push(value)
                    }
                });
                break;
            }
        }

        return newArray;
    }
}

