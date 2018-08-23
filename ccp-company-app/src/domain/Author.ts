/**
 * Created by Administrator on 2017/9/15.
 * 用户实体
 */
import {AuthorType, Honour} from "./enums";

export class Author {


    /**
     * 类型
     */
    authorType: AuthorType;

    /**
     * 帐户名
     */
    accountName: string;

    /**
     * 用户名
     */
    authorName: string;

    /**
     * 头像地址
     */
    portraitUrl: string;

    /**
     * 手机号
     */
    mobile: string;

    /**
     * 邮箱
     */
    email: string;

    /**
     * 密码
     */
    password: string;

    /**
     * 头衔
     */
    honour: Honour;

    //是否禁用
    enabled: boolean;


}
