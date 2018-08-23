/**
 * 聊天
 */

import {ChatLogVo} from "../vo/ChatLogVo";
import {ChatRoomVo} from "./ChatRoomVo";

export class ChatItem {

    id:string;

    /**
     * 是否群组
     */
    group: boolean;

    /**
     * 最后时间
     */
    lastTime: Date;

    /**
     * 最后消息
     */
    lastMessage: string;

    /**
     * 好友显示名字
     */
    friendName: string;

    /**
     * 好友of账号
     */
    friendOfAccount: string;

    /**
     * 头像
     */
    avatarImage: string;

    chatRoom:ChatRoomVo;



    chatLogList: Array<ChatLogVo> = [];

    /**
     * 未读消息
     */
    unreadNumber: number = 0;

    chatLog:ChatLogVo[]=[];
}
