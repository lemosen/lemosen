/**
 * *
 * 角色资源实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */
import {Role} from "./Role";

export class RoleResc {

    //columns START
    /**
     *ID
     */
    rescId: number;
    /**
     * 角色
     */
    role: Role;
    /**
     * 资源编码
     */
    rescCode: string;
    //columns END


}