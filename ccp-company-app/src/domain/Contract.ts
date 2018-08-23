/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Demand} from "./Demand";
import {ContractType} from "./enums";
import {Templet} from "./Templet";

/**
 * *
 * 合同实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class Contract {


    //columns START
    /**
     *
     */
    contractId: number;
    /**
     *
     */
    demand: Demand;
    /**
     * 合同名称
     */
    contractName: string;
    /**
     * 合同类型
     */
    contractType: ContractType;
    /**
     * 模板
     */
    templet: Templet;

    /**
     * 创建时间
     */
    createTime: Date;

    /**
     * 备注
     */
    remark: string;

    versionNo: number;

    contractUrl: string;
    //columns END

}