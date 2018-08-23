/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {ReceiverType, SenderType} from "./enums";

/**
 * *
 * 站内信实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class Mail {


    //columns START
    /**
     *ID
     */
    mailId: number;
    /**
     * 标题
     */
    mailName: string;
    /**
     * 内容
     */
    mailText: string;
    /**
     * 类型
     */
    mailType: number;
    /**
     * 创建时间
     */
    creatTime: Date;
    /**
     * 阅读状态
     */
    mailState: boolean;
    /**
     * 发送者ID
     */
    senderId: number;
    /**
     * 发送者类型
     */
    senderType: SenderType;
    /**
     * 发送者名称
     */
    senderName: string;
    /**
     * 接收者ID
     */
    receiverId: number;
    /**
     * 接收者类型
     */
    receiverType: ReceiverType;
    /**
     * 接收者名称
     */
    receiverName: string;
//    columns END;


}