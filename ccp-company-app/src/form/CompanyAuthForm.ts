/**
 * Created by Administrator on 2017/9/11.
 *  企业认证表单
 */

import {CompanyScope} from "../domain/enums";

export class CompanyAuthForm {

    companyId: number;

    companyName: string;
    /**
     * 负责人
     */
    masterName: string;

    /**
     * 法人身份证
     */
    legalImg:string;
    /**
     * 营业执照注册码
     */
    licenseCode:string;

    /**
     * 营业执照所在地
     */
    licenseAddress:string;

    /**
     * 企业经营范围
     */
    companyScope:CompanyScope;
    /**
     * 企业常用地址
     */
    companyAddress:string;

}
