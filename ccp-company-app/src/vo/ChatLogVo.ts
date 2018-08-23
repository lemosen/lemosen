/**
 * Created by Administrator on 2017/9/23.
 */

export class ChatLogVo {


    id:string;
    //内容
    content: any;
    //时间
    createDate: Date;
    //发送者
    sender: string;
    //接受者
    receiver: string;
    //类型
    type: string;

    constructor(id:string,sender: string, receiver: string, content: any, createDate: Date) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;
        this.createDate = createDate;
    }


}
