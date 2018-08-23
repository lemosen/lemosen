/**
 * Created by road on 17/11/9.
 * 用户接口
 */
import {AuthorType} from "./enums";

export interface Member {


    getAccountName(): string;


    getAuthorType(): AuthorType;


    getAuthorName(): string;


    getPortraitUrl(): string;


    getMobile(): string;


    getEmail(): string;


    getPassword(): string;

}
