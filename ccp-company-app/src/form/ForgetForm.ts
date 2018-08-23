import {AuthorType, TransmitType} from "../domain/enums";

/**
 * Created by microlink on 2017/10/25.
 * 忘记密码表单
 */
export class ForgetForm {

    accountName: string;

    newPassword: string;

    type: string;

    email: string;

    rePassword: string;

    mobile: string;

    smsCode: string;

    /**
     * 通用的输入信息 邮箱、手机、账号
     */
    commonInput: string;


    figureCode: string;

    emailFigureCode: string;

    authorType: AuthorType;

    sendSmsLongTime: number;

    transmitType: TransmitType;


}
