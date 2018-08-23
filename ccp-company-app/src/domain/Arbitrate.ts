/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */

import {Appeal} from "./Appeal";

/**仲裁实体类
 * @author gonglei
 * @version 1.0
 * @since 1.0
 *
 */
export class Arbitrate {

    //columns START
    /**
     * ID
     */
    arbitrateId: number;

    /**
     * 内容
     */
    content: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 备注
     */
    remark: string;

    /**
     * 仲裁名称
     */
    arbitrateName: string;
    /**
     * 附件
     */
    attachmentUrl: string;
    //columns END

    /**
     * 所属申诉
     */
    appeal: Appeal;


}