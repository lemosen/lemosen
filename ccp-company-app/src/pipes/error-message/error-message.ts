import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

/**
 * Generated class for the ErrorMessagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(errors: ValidationErrors): string {
      for (const key in  errors) {
          return this.formatError(key);
      }
  }

    formatError(key) {
        switch (key) {
            case "required":
                return "必填项 不能为空";
            case "maxlength":
                return "字数过长";
            case "minlength":
                return "长度不够";
            case "pattern":
                return "不符合输入要求";
            default:
                return "";
        }
    }
}
