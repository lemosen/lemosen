import {FormBuilder, FormGroup} from "@angular/forms";

export class FormPage {

    submitted: boolean = false;

    formGroup: FormGroup;

    phoneReg=/^0?1[3|4|5|8][0-9]\d{8}$/;



    initFormData(data) {
        for (let key in this.formGroup.value) {
            let val = data[key];
            this.formGroup.controls[key].setValue(val);
        }
    }

    /**
     * 构建表单数组
     * @param {FormGroup} control   控件 tips：需要转换为FormGroup
     * @param {string} controlName  控件名称
     * @param setArray              放入数据
     */
    patchFormArrayControl(control: FormGroup, controlName: string, setArray: any, fb: FormBuilder) {
        const commonFormArray = fb.array(setArray.map(single => fb.group(single)));
        control.setControl(controlName, commonFormArray);
    }

    /**
     * 时间大于当前时间
     * example [min]="minDate" [max]="maxDate" use ion-datetime
     * @returns {string}
     */
    get minDate(): string {
        return new Date(new Date().getTime() + 24*60*60*1000).toISOString().substr(0, 10);
    }

    /**
     * 最大时间为当前年后一年
     * example [min]="minDate" [max]="maxDate" use ion-datetime
     * @returns {string}
     */
    get maxDate(): string {
        return new Date().getFullYear() + 1 + "";
    }

    /**
     * 输入大于0的正整数
     * example (input)="positiveInteger('[formControlName]',$event)" use ion-input
     * @param {string}
     * @param domElement
     */
    positiveInteger(formControlName: string, event) {
        let value: string = event.target.value;
        if (value.indexOf(".") != -1) {
            event.target.value = value.slice(0, value.indexOf("."))
        }
        if (value.indexOf("-") != -1) {
            event.target.value = value.slice(value.indexOf("-") + 1, value.length)
        }
        this.formGroup.get(formControlName).setValue(event.target.value)
        console.log(this.formGroup.get(formControlName));
    }

    /**
     * 根据Id排序
     * @param objects
     * @param {string} objectKey
     * @param {boolean} order
     * @returns {any}
     */
    sortByObjId(objects: any, objectKey:string , order:boolean = false): any {
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
