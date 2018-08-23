/**
 * Created by Administrator on 2017/11/6.
 * 设计师工具实体
 */

export class DesignerPlugin {


    toolId: number;

    /**
     * 工具名称
     */
    toolName: string;

    /**
     * 版本号
     */
    version: number;

    /**
     * 存储地址
     */
    toolUrl: string;

    /**
     * 启停用
     */
    enabled: boolean;

    /**
     * 备注
     */
    remark: string;

    /**
     * 创建时间
     */
    createTime: Date;


}
