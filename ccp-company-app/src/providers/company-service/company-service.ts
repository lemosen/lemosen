import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertController} from "ionic-angular";
import {HttpService} from "../HttpService";
import {Company} from "../../domain/Company";
import {RegisterForm} from "../../form/RegisterForm";
import {Storage} from "@ionic/storage";
import {SecurityForm} from "../../form/SecurityForm";
import {CompanyAuthForm} from "../../form/CompanyAuthForm";
import {ForgetForm} from "../../form/ForgetForm";
import {PageQuery} from "../../common/PageQuery";

/*
 Generated class for the CompanyServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class CompanyServiceProvider extends HttpService {

    static LOGIN_CUSTOMER = "LOGIN_CUSTOMER";

    private static loginCompany: Company;

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }

    static isLogin(): boolean {
        return CompanyServiceProvider.loginCompany != null;
    }

    loginOut() {
        // this.events.publish("Staff:changed", null);
        CompanyServiceProvider.loginCompany = null;
        return this.storage.remove(CompanyServiceProvider.LOGIN_CUSTOMER);
    }

    /**
     * 更新登录信息
     */
    setLoginCompany(loginCompany) {
        CompanyServiceProvider.loginCompany = loginCompany;
        return this.storage.set(CompanyServiceProvider.LOGIN_CUSTOMER, loginCompany);
    }

    initLoginSession() {
        this.storage.get(CompanyServiceProvider.LOGIN_CUSTOMER).then(customer => {
            if (customer != null) {
                CompanyServiceProvider.loginCompany = customer;
            }
        });
    }

    static getLoginCompany(): Company {
        return CompanyServiceProvider.loginCompany;
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
        return this.postForm('/company/login.do', params.toString());
    }

    // getFamilyMembersByCompanyId(customerId): Promise<FamilyMember[]> {
    //     const params = new HttpParams().set('customerId', customerId);
    //     return this.get('/customer/getFamilyMembersByCompanyId', params);
    // }
    //
    // createFamilyMember(familyMember): Promise<FamilyMember> {
    //     return this.post('/customer/createFamilyMember', JSON.stringify(familyMember));
    // }

    removeFamilyMemberById(memberId): Promise<any> {
        const params = new HttpParams().set('memberId', memberId);
        return this.get('/customer/removeFamilyMemberById', params);
    }

    updateCompanyName(customerId, customerName): Promise<string> {
        const params = new HttpParams().set('customerId', customerId).set('customerName', customerName);
        return this.postForm('/customer/updateCompanyName', params.toString());
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

    updateCompanyPassword(customerId, oldPassword, password): Promise<boolean> {
        const params = new HttpParams().set('customerId', customerId).set('oldPassword', oldPassword).set('password', password);
        return this.postForm('/customer/updateCompanyPassword', params.toString());
    }

    updateCompanyNewPassword(customerId, password): Promise<boolean> {
        const params = new HttpParams().set('customerId', customerId).set('password', password);
        return this.postForm('/customer/updateCompanyNewPassword', params.toString());
    }

    /**
     * 获取工作页待办任务数据
     * @param companyId
     * @returns {Promise<any>}
     */
    getWorkCounts(companyId): Promise<any> {
        const params = new HttpParams().set('companyId', companyId);
        return this.get('/company/getWorkCounts.do', params);
    }

    /**
     * 获得待办事项
     */
    getWorks(query: PageQuery): Promise<any> {
        return this.post('/company/getWorks.do', query.toJsonString());
    }

    /**
     * 企业我的页面数据
     * @param customerId
     * @returns {Promise<any>}
     */
    center(companyId): Promise<any> {
        const params = new HttpParams().set('companyId', companyId);
        return this.get('/company/center.do', params);
    }

    /**
     * 企业详细信息
     * @param companyId
     * @returns {Promise<any>}
     */
    viewCompany(companyId): Promise<any> {
        const params = new HttpParams().set('companyId', companyId);
        return this.get('/company/viewCompany.do', params);
    }

    /**
     * 编辑企业基本信息
     * @param company
     * @returns {Promise<any>}
     */
    editCompany(company: Company): Promise<any> {
        return this.post('/company/editCompany.do', company);
    }


    /**
     * 保存企业认证信息
     */
    examine(nameAuthForm: CompanyAuthForm): Promise<any> {
        return this.post("/company/examine.do", nameAuthForm);
    }


    /**
     * 获取企业认证信息
     * @param customerId
     * @return
     */
    toExamine(companyId): Promise<any> {
        const params = new HttpParams().set('companyId', companyId);
        return this.get('/company/toExamine.do', params);
    }

    /**
     * 修改密码
     * @param securityForm
     * @returns {Promise<any>}
     */
    editPassWord(securityForm: SecurityForm): Promise<any> {
        return this.post('/company/editPassword.do', securityForm);
    }

    /**
     * 修改手机号
     * @param securityForm
     * @returns {Promise<any>}
     */
    editMobile(securityForm: SecurityForm): Promise<any> {
        return this.post('/company/editMobile.do', securityForm);
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
        return this.post("/company/mobileChecks.do", forgetForm);
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
        return this.post("/company/accountChecks.do", forgetForm);
    }

    /**
     * 更改密码
     *
     * @return
     */
    resetPassword(forgetForm: ForgetForm): Promise<any> {
        return this.post("/company/resetPassword.do", forgetForm);
    }

    /**
     * 获取动态
     */
    getSmsByAccountName(query: PageQuery): Promise<any> {
        return this.post("/sms/getDynamicByAccountName.do", query.toJsonString())
    }

    /**
     * 我的钱包
     * @param companyId
     * @returns {Promise<any>}
     */
    myWallet(companyId): Promise<any> {
        const params = new HttpParams().set("companyId", companyId);
        return this.get('/company/myWallet.do', params);
    }
    /**
     * 设计师对我(企业)的评价
     * @param companyId
     * @returns {Promise<any>}
     */
    comment(query: PageQuery): Promise<any> {
        return this.post('/company/comment.do', query.toJsonString());
    }

    /**
     * 企业注册
     * @param registerForm
     * @returns {Promise<any>}
     */
    registerCompany(registerForm:RegisterForm):Promise<any>{
        return this.post("/company/registerCompany.do",registerForm);
    }



}
