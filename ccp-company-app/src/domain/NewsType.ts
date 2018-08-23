/**
 * *
 * 新闻类型实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {News} from "./News";

export class NewsType {

    //columns START
    /**
     *ID
     */
    typeId: number;
    /**
     * 类型名称
     */
    typeName: String;

    /**
     * 启停用
     */
    enabled: boolean;

    /**
     * 排序
     */
    sortOrder: number;
    /**
     * 备注
     */
    remark: String;
    //columns END
    newses: News[];

}