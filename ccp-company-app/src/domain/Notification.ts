/**
 * *
 * 系统通知实体
 *
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {ReadUser} from "./ReadUser";

export class Notification {

    //columns START
    /**
     * ID
     */
    notificationId: number;
    /**
     * 通知标题
     */
    notificationTitle: string;
    /**
     * 通知内容
     */
    content: string;

    /**
     * 创建时间
     */

    createTime: Date;
    /**
     * 定时推送
     */
    pushTime: Date;
    /**
     * 备注
     */
    remark: string;
    //columns END

    readState: boolean;

    /**
     * 记录已读的用户
     */
    readUsers: ReadUser[];

}
