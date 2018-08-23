/*
 * Powered By [microlink-framework]
 * Web Site:
 * Since 2015 - 2017
 */


import {Customer} from "./Customer";
import {Expert} from "./Expert";

/**
 * *
 * 设计师审核
 *
 * @author gonglei
 * @version 1.0
 * @since 1.0
 */

export class DesignReviewed {


    //columns START
    /**
     *ID
     */
    designerReviewedId: number;
    /**
     *设计师
     */
    customer: Customer;
    /**
     *专家
     */
    expert: Expert;
    //columns END


}