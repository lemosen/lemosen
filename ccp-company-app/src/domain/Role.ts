/**
 * *
 *角色实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {RoleResc} from "./RoleResc";
import {User} from "./User";

export class Role {

    //columns START
    /**
     * ID
     */
    roleId: number;
    /**
     * 角色名称
     */
    roleName: string;
    /**
     * 角色编码
     */
    roleCode: string;
    /**
     * 创建时间
     */
    createTime: Date;

    /**
     * 角色包含资源
     */
    roleRescs: RoleResc[];

    users: User[];

    rescCodes: string[];

    remark: string;

    //columns END

}