import {Customer} from "./Customer";
import {TransactionRecord} from "./TransactionRecord";

/**
 * Created by gonglei on 2017/9/4.
 * 设计师交易记录实体
 */

export class CustomerTransaction extends TransactionRecord {

    /**
     * 设计师
     */
    customer: Customer;

}
