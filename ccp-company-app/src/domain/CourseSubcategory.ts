/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {CourseCategory} from "./CourseCategory";
import {Course} from "./Course";

/**
 * *
 * 课程子类实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class CourseSubcategory {


    //columns START
    /**
     * ID
     */
    subcategoryId: number;
    /**
     * 课程类别
     */
    courseCategory: CourseCategory;
    /**
     * 课程分类
     */
    subcategoryName: string;
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

    courses: Course[];
    //columns END

}