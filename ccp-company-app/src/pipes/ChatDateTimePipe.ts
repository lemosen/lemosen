import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
    name: 'chatDateTimPipe'
})
export class ChatDateTimePipe implements PipeTransform {


    constructor() {

    }

    transform(value): string {
        if (!value) {
            return '';
        }
        let now = new Date();
        let chatDate = value instanceof Date ? value : new Date(value);
        let years = now.getFullYear() - chatDate.getFullYear();
        let months = now.getMonth() - chatDate.getMonth();
        let days = now.getDay() - chatDate.getDay();
        if (years != 0 || months != 0) {
            return chatDate.toLocaleDateString();
        } else {
            //对日期天数差的判断
            switch (days) {
                case 0:
                    return chatDate.getHours() + ":" + chatDate.getMinutes();
                case 1:
                    return "Yesterday";
                case 2:
                    return this.getWeek(chatDate, now);
                case 3:
                    return this.getWeek(chatDate, now);
                case 4:
                    return this.getWeek(chatDate, now);
                case 5:
                    return this.getWeek(chatDate, now);
                case 6:
                    return this.getWeek(chatDate, now);
                default:
                    return chatDate.toLocaleDateString();

            }

        }
    }

    pasreWeek(date: string): number {
        let week = date.substring(0, 3);
        switch (week) {
            case 'Mon':
                return 1;
            case 'Tus':
                return 2;
            case 'Wed':
                return 3;
            case 'Thu':
                return 4;
            case 'Fri':
                return 5;
            case 'Sat':
                return 6;
            case 'Sun':
                return 7;
        }
    }

    private getWeek(chatDate: Date, now: Date): string {
        let week = chatDate.toString().substring(0, 3);
        //如果当前时间的星期大于消息时间的星期
        if (this.pasreWeek(now.toString()) > this.pasreWeek(chatDate.toString())) {
            return week;
        } else {
            return chatDate.toLocaleDateString();
        }
    }
}
