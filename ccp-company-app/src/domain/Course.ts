/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */

import {CourseSubcategory} from "./CourseSubcategory";
import {FileType} from "./enums";

/**
 * *
 * 课程实体
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class Course {

    //columns START
    /**
     *
     */
    courseId: number;
    /**
     *
     */
    courseSubcategory: CourseSubcategory;
    /**
     * 课程名称
     */
    courseName: string;
    /**
     * 创建时间
     */
    createTime: Date;
    //columns END
    /**
     * 课程简介
     */
    /*@Length(max = 255)
     private String summary;*/


    /**
     * 课程内容
     */
    detailInfo: string;
    /**
     * 课程关键字
     */
    keyWord: string;

    /**
     * 浏览数
     */
    viewNum: number;


    /**
     * 备注
     */
    remark: string;
    /**
     * 状态
     */
    courseState: boolean;

    hot: boolean;

    courseUrl: string;

    fileType: FileType;

    /**
     * 预览图地址
     */
    thumbnailsUrl: string;

    enabled: boolean;
    //columns END


}