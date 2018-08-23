/**
 * 聊天室vo
 */
import {ChatItem} from "./ChatItem";
import {Author} from "./Author";

export class ChatRoomVo {

    groupId: string;
    number: number;
    avatarImg: string;

    demandId:number;

    /**
     * 聊天室查询名字
     */
    roomName: string;
    /**
     * 聊天室描述
     */
    description: string;
    /**
     * 聊天室显示名
     */
    naturalName: string;

    /**
     * 群主（只有一个）
     */
    creator: string;

    /**
     * 成员
     */
    chatItems: Array<ChatItem>;

    /**
     * 管理员
     */
    adminItems: Array<ChatItem>;

    manager: boolean;

    /**
     * 成员
     */
    authors: Author[];

}
