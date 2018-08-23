import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {Customer} from "../../domain/Customer";
import {Storage} from "@ionic/storage";
import {NameAuthForm} from "../../form/NameAuthForm";
import {SecurityForm} from "../../form/SecurityForm";
import {PageQuery} from "../../common/PageQuery";
import {RegisterForm} from "../../form/RegisterForm";
import {ForgetForm} from "../../form/ForgetForm";
import {EvaluateForm} from "../../form/EvaluateForm";

/*
 Generated class for the CustomerServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class CustomerServiceProvider extends HttpService {
    static LOGIN_CUSTOMER = "LOGIN_CUSTOMER";

    private static loginCustomer: Customer;

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }

    isLogin(): boolean {
        return CustomerServiceProvider.loginCustomer != null;
    }

    loginOut() {
        // this.events.publish("Staff:changed", null);
        CustomerServiceProvider.loginCustomer = null;
        return this.storage.remove(CustomerServiceProvider.LOGIN_CUSTOMER);
    }

    /**
     * 更新登录信息
     */
    setLoginCustomer(loginCustomer) {
        CustomerServiceProvider.loginCustomer = loginCustomer;
        return this.storage.set(CustomerServiceProvider.LOGIN_CUSTOMER, loginCustomer);
    }

    initLoginSession() {
        this.storage.get(CustomerServiceProvider.LOGIN_CUSTOMER).then(customer => {
            if (customer != null) {
                CustomerServiceProvider.loginCustomer = customer;
            }
        });
    }

    static getLoginCustomer(): Customer {
        return CustomerServiceProvider.loginCustomer;
    }

    sendMobileValidCode(mobile): Promise<any> {
        return this.postForm('/customer/sendMobileValidCode', new HttpParams().set('mobile', mobile).toString());
    }

    sendForgetPasswordMobileCode(mobile): Promise<any> {
        return this.postForm('/customer/sendForgetPasswordMobileCode', new HttpParams().set('mobile', mobile).toString());
    }

    /**
     * 注册账号
     * @param customer
     * @returns {Promise<any>}
     */
    register(registerForm: RegisterForm): Promise<any> {
        return this.post('/customer/register.do', registerForm);
    }

    login(account, password, validCode): Promise<any> {
        const params = new HttpParams()
            .set('account', account)
            .set('password', password)
            .set('validCode', validCode);
        return this.postForm('/customer/login.do', params.toString());
    }

    // getFamilyMembersByCustomerId(customerId): Promise<FamilyMember[]> {
    //     const params = new HttpParams().set('customerId', customerId);
    //     return this.get('/customer/getFamilyMembersByCustomerId', params);
    // }
    //
    // createFamilyMember(familyMember): Promise<FamilyMember> {
    //     return this.post('/customer/createFamilyMember', JSON.stringify(familyMember));
    // }

    removeFamilyMemberById(memberId): Promise<any> {
        const params = new HttpParams().set('memberId', memberId);
        return this.get('/customer/removeFamilyMemberById', params);
    }

    updateCustomerName(customerId, customerName): Promise<string> {
        const params = new HttpParams().set('customerId', customerId).set('customerName', customerName);
        return this.postForm('/customer/updateCustomerName', params.toString());
    }

    updateBirthday(customerId, birthday): Promise<string> {
        const params = new HttpParams().set('customerId', customerId).set('birthday', birthday);
        return this.postForm('/customer/updateBirthday', params.toString());
    }

    updateGender(customerId, gender): Promise<boolean> {
        const params = new HttpParams().set('customerId', customerId).set('gender', gender);
        return this.postForm('/customer/updateGender', params.toString());
    }

    updateEmail(customerId, email): Promise<string> {
        const params = new HttpParams().set('customerId', customerId).set('email', email);
        return this.postForm('/customer/updateEmail', params.toString());
    }

    updateCustomerPassword(customerId, oldPassword, password): Promise<boolean> {
        const params = new HttpParams().set('customerId', customerId).set('oldPassword', oldPassword).set('password', password);
        return this.postForm('/customer/updateCustomerPassword', params.toString());
    }

    updateCustomerNewPassword(customerId, password): Promise<boolean> {
        const params = new HttpParams().set('customerId', customerId).set('password', password);
        return this.postForm('/customer/updateCustomerNewPassword', params.toString());
    }


    /**
     * 获取工作页待办任务数据
     * @param customerId
     * @returns {Promise<any>}
     */
    getWorkCounts(customerId): Promise<any> {
        const params = new HttpParams().set('customerId', customerId);
        return this.get('/customer/getWorkCounts.do', params);
    }


    /**
     * 获得待办事项
     */
    getWorks(query:PageQuery):Promise<any>{
        return this.post('/customer/getWorks.do',query.toJsonString());
    }

    /**
     * 我的页面数据
     * @param customerId
     * @returns {Promise<any>}
     */
    center(customerId): Promise<any> {
        const params = new HttpParams().set('customerId', customerId);
        return this.get('/customer/center.do', params);
    }

    /**
     * 设计师详细信息
     * @param customerId
     * @returns {Promise<any>}
     */
    viewCustomer(customerId): Promise<any> {
        const params = new HttpParams().set('customerId', customerId);
        return this.get('/customer/viewCustomer.do', params);
    }

    /**
     * 获取实名认证页面信息
     * @param customerId
     * @returns {Promise<any>}
     */
    toExamine(customerId): Promise<any> {
        const params = new HttpParams().set('customerId', customerId);
        return this.get('/customer/toExamine.do', params);
    }

    /**
     * 编辑个人信息
     * @param customer
     * @returns {Promise<any>}
     */
    editCustomer(customer: Customer): Promise<any> {
        return this.post('/customer/editCustomer.do', customer);
    }

    /**
     * 修改实名信息
     * @param nameAuthForm
     * @returns {Promise<any>}
     */
    examine(nameAuthForm: NameAuthForm): Promise<any> {
        return this.post('/customer/examine.do', nameAuthForm);
    }

    /**
     * 修改密码
     * @param securityForm
     * @returns {Promise<any>}
     */
    editPassWord(securityForm: SecurityForm): Promise<any> {
        return this.post('/customer/editPassword.do', securityForm);
    }

    /**
     * 修改手机号
     * @param securityForm
     * @returns {Promise<any>}
     */
    editMobile(securityForm: SecurityForm): Promise<any> {
        return this.post('/customer/editMobile.do', securityForm);
    }

    /**
     * 获取验证码
     * @param phone
     * @returns {Promise<any>}
     */
    getVerificationCode(phone, smsType): Promise<any> {
        const params = new HttpParams().set("phone", phone).set("smsType", smsType);
        return this.get('/sms/getVerificationCode.do', params);
    }

    getVerificationPasswordCode(phone, smsType): Promise<any> {
        const params = new HttpParams().set("phone", phone).set("smsType", smsType);
        return this.get('/sms/getVerificationPasswordCode.do', params);
    }
    /**
     * 我的钱包
     * @param customerId
     * @returns {Promise<any>}
     */
    myWallet(customerId): Promise<any> {
        const params = new HttpParams().set("customerId", customerId);
        return this.get('/customer/myWallet.do', params);
    }

    /**
     * 查询评价列表
     * @param query tips:customerId
     * @returns {Promise<any>}
     */
    comment(query: PageQuery): Promise<any> {
        return this.post('/customer/comment.do', query.toJsonString());
    }

    /**
     * 评价发包企业
     * @param companyEvaluate
     * @returns {Promise<any>}
     */
    addCompanyEvaluate(evaluateForm: EvaluateForm): Promise<any> {
        return this.post("/customer/saveCompanyEvaluate.do", evaluateForm);
    }

    /**
     * 手机找回密码检测账户合法性
     * @param forgetForm
     * @param result
     * @param modelMap
     * @param session
     * @param locale
     * @return
     */
    mobileChecks(forgetForm: ForgetForm): Promise<any> {
        return this.post("/customer/mobileChecks.do", forgetForm);
    }

    /**
     * 手机找回密码检测账户合法性
     * @param forgetForm
     * @param result
     * @param modelMap
     * @param session
     * @param locale
     * @return
     */
    accountChecks(forgetForm: ForgetForm): Promise<any> {
        return this.post("/customer/accountChecks.do", forgetForm);
    }


    /**
     * 更改密码
     *
     * @return
     */
    resetPassword(forgetForm: ForgetForm): Promise<any> {
        return this.post("/customer/resetPassword.do", forgetForm);
    }

    /**
     *绑定支付宝
     * @return
     */
    bingAlipayAccount(customerId,alipayAccount):Promise<any>{
        const params = new HttpParams().set("customerId",customerId).set("alipayAccount",alipayAccount);
        return this.get("/transaction/bingAlipayAccount.do",params);
    }
}
