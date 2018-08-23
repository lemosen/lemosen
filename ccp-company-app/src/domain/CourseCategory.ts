/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {CourseSubcategory} from "./CourseSubcategory";

/**
 * *
 * 课程类别实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class CourseCategory {

    //columns START
    /**
     * ID
     */
    categoryId: number;
    /**
     * 课程类别
     */
    categoryName: string;

    /**
     * 创建时间
     */
    createTime: Date;

    /**
     * 启停用
     */
    enabled: boolean;
    /**
     * 备注
     */
    remark: string;

    courseSubcategorys: CourseSubcategory[];
    //columns END


}