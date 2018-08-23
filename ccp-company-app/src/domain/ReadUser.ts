/**
 * Created by Administrator on 2017/12/25.
 * 已读用户
 */
import {Author} from "./Author";
import {ReaderId} from "./ReaderId";

export class ReadUser {

    id: ReaderId;

    readState: boolean;

    notification: Notification;

    author: Author;

}
