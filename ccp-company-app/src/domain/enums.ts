/**
 * Created by Administrator on 2017/9/9.
 * 账户类型
 */
export enum AccountType {
    COMPANY_ACCOUNT,//发包企业
    DESIGNER_ACCOUNT,//设计师
    EXPERT_ACCOUNT,//专家
}

/**
 * Created by link on 2017/9/21.
 * 申诉状态
 */
export enum AppealState {

    APPEAL_NO,//未处理
    APPEAL_ING,//处理中
    APPEALED,//已处理
}

/**
 * Created by microlink on 2017/9/5.
 * 审核状态
 */
export enum Audited {

    UNAUDITED,      //待审核
    AUDITED,        //审核通过
    AUDITED_FAILED, //审核不通过

}

/**
 * Created by Administrator on 2017/9/5.
 * 认证状态
 */
export enum Authed {
    UNAUTHED,      //待认证
    AUTHED,        //认证通过
    AUTHED_FAILED, //认证不通过
}

/**
 * Created by Administrator on 2017/9/15.
 * 作者类型
 */
export enum AuthorType {

    COMPANY,//发包企业
    CUSTOMER,//设计师
    EXPERT,//专家
    PLATFORM,//平台

}

/**
 * 频道位置
 */
export enum ChannelPosition {

    HEARDER,//头部
    BANNER,//横福
    FOOTER,//脚部
    BZZX,//帮助中心
    GYWM,//关于我们
    WDZH,//我的账户
}

/**
 * Created by gonglei on 16/2/4.
 * 频道风格
 */
export enum ChannelStyle {

    DETAIL,
    CATEGORY,
    BANNER,
    LIST,
    SIMPLE,

}

/**
 * Created by Administrator on 2017/8/31.
 * 企业经营范围
 */
export enum CompanyScope {


    MANUFACTURINGOFRAILWAYEQUIPMENT,
    RESEARCHOFURBANRAILEQUIPMENT,
    DESIGNOFRAILWAYBUSEQUIPMENT,
    URBANRAILVEHICLEANDACCESSORIES,


}

/**
 * Created by IntelliJ IDEA.
 * User: link
 * Date: 2017/10/10
 * Time: 20:16
 * To change this template use File | Settings | File Templates.
 * 设计师针对合同的确认
 */
export enum ConfirmType {
    CONFIRM_NO,//未确认
    CONFIRMED,//确认
    CONFIRM_FAILED,//拒绝

}

/**
 * Created by gonglei on 2017/9/18.
 * 合同类型
 */
export enum ContractType {

    FORMAL,//正式合同
    SUPPLEMENT,//补充合同

}

/**
 * Created by IntelliJ IDEA.
 * User: link
 * Date: 2018/1/5
 * Time: 18:21
 * To change this template use File | Settings | File Templates.
 */
export enum DemandFileType {
    REVIEW,//评审文件
    SOURCES,//源文件
    PROCESS,//过程文件
    RESULTS,//交付文件

}

/**
 * Created by Administrator on 2017/8/31.
 * 任务状态
 */
export enum DemandState {

    DRAFT,//编辑任务需求 (发布的任务)
    PLATFORM_AUDIT,//平台审核 (发布的任务)

    BIDDING,//招标中 (正在招标)  不能邀请专家
    BIDDED,//中标 (正在招标)     可邀请专家
    EDIT_CONTRACT,//编写合同 (正在招标) 可邀请专家
    //之前只显示预算价格
    REVIEW_CONTRACT,//设计师审阅合同 (正在招标)可邀请专家
    CONFIRM_CONTRACT,//合同确认 (正在招标)  可邀请专家

    EXECUTING,//执行中   （正在进行）         可邀请专家
    EXPERT_REVIEW,//专家评审会签 （正在进行）不能邀请专家
    CONFIRM_COMPLETE,//确认完成 （正在进行） 不能邀请专家

    SUSPEND,//中止  （已完成）
    FINISH,//任务完成确认 （已完成）

}

/**
 * Created by Administrator on 2017/9/15.
 * 学历
 */
export enum Education {
    DIPLOMA, BACHELOR, GRADUATE, DOCTOR
}

/**
 * Created by IntelliJ IDEA.
 * User: link
 * Date: 2017/11/16
 * Time: 17:49
 * To change this template use File | Settings | File Templates.
 * Email 操作类别
 */
export enum EmailType {
    VERIFY_EMAIL,   //("验证邮箱"),
    UPDATE_EMAIL,  //("修改邮箱")
}

/**
 * Created by Administrator on 2017/9/21.
 * 文件类型
 */
export enum FileType {

    PDF_FILE,//pdf
    VIDEO_FILE,//视频

}

/**
 * Created by road on 17/12/18.
 */
export enum Honour {

    GOLD_DESIGNER,//金牌设计师
    SILVER_DESIGNER,//银牌设计师
    BRONZE_DESIGNER,//铜牌设计师

    GOLD_COMPANY,//金牌企业
    SILVER_COMPANY,//银牌企业
    BRONZE_COMPANY,//铜牌企业


}

/**
 * Created by yuexihai on 17/7/13.
 * 图片类型
 */
export enum ImageType {

    BUSINESS_LICENSE,
    IDENTITY,
    PROFILE,
    DETAIL,
    OTHER,
    QRCODE,
    WECHAT,
    CHECK,
    REFORM,


}

/**
 * Created by gonglei on 2017/9/22.
 * 邀请状态
 */
export enum InviteState {

    INVITING,//邀请中
    JOIN,//加入
    REFUSE,//拒绝
}

/**
 * @author keymean
 * 操作类型
 */
export enum OperateType {

    ADD,
    UPDATE,
    REMOVE,
    AUDIT,
    LOGIN,
    LOGOUT,

}

/**
 * Created by gonglei on 2017/9/4.
 * 支付方式
 */
export enum PayedMethod {

    WECHAT, ALIPAY, UNIONPAY,
}

/**
 * @author gonglei
 * 配置项名称
 */
export enum ProfileName {


    TASK_MIN_MONEY,//发包企业发布任务基本充值额
    EXPERT_AUDIT_PASS,//专家会签通过百分比
    DESIGNER_MONTH_WITHDRAW,//设计师每月提现限制额度
    exportITY_MAX_TIME,//中标公示持续时长
    TASK_EXECUTING_TIME,//任务执行逾期时间挂起
    TASK_EXECUTING_REMIND_TIME,//任务执行逾期提前通知天数
    PLAT_KICKBACK_PERCENT,//企业发包平台抽成比例
    PERSON_RATE,//专家、设计师、企业、任务显示比例
    BID_exportITY,//中标通知
    REGISTER_exportITY_CUSTOMER,//设计师欢迎信
    REGISTER_exportITY_COMPANY,//企业欢迎信
    USER_PORT_URL,//头像上传路径
    COMPANY_AUTH_URL,//企业认证上传路径
    COURSE_DATA_URL,//课程上传路径
    EXPERT_INVITE_DAYMAX,//专家邀请数目上限
    SUBTASK_MAX_AMOUNT,//子任务时间节点数上限
    INTEGRAL_TO_MONEY,//专家积分与报酬兑换比例关系
    DESIGNER_TIME_MONEY,//招标额度设计师投标时间和金额浮动比例
    EXPERT_PARALLEL_TASK,//专家当前并行项目个数
    DESIGNER_PARALLEL_TASK,//设计师当前并行项目个数
//    DEMAND_AUDIT_BALANCE,//专家审核任务积分
//    SKILL_AUDIT_BALANCE,//专家审核技能积分
//    BALANCE_MONEY_RATE,//专家任务积分兑现比例
    EXP_LEVEL_COST,//每一等级升级所需基本经验
    CONTRACT_CONFIRM_TIME,//合同确认双方逾期时间
    INDEX_DEMAND_NUM,//首页任务显示数量

}

/**
 * 接受者类型
 */
export enum ReceiverType {
    COMPANY,
    CUSTOMER,
    EXPERT,
    ALL,
    PLAT
}

/**
 * Created by road on 17/11/7.
 * 经验规则名
 */
export enum RuleType {

    //公共
    LOGIN_PER_DAY,//登录  每天第一次登录
    DEMAND_COMMENT,//评价 任务评价
    RECEIVE_COMMENT,//评价 收到好评(3分及以上)
    REWARD_SCORE,//奖励积分

    //发包企业
    FIRST_COMPLETE_INFORMATION,//补充完整资料 第一次补充
    FIRST_DEPOSIT_FUND,//托管资金  第一次充值
    PUBLISH_DEMAND,//需求发布 发布一条有效需求（被通过）
    PUBLISH_DEMAND_INVITE,//需求发布 单个需求成功邀请超过6人
    CHOOSE_PARTNER,//选合作对象 选合作对象
    SUBMIT_COOPERATIVE_SCHEME,//提交合作方案(合同) 选合作对象
    FIRST_RESOLVE_DEMAND,//分解子任务 单个任务第一次分解任务
//    CHECK_DEMAND_RESULT,//查看任务交付物（有子任务的任务）通过PC或APP查看即生效
    DEMAND_PAYMENT,//任务结款
    FIRST_DEMAND_COMPLETE,//任务完成 第一次任务完成
    DEMAND_COMPLETE,//任务完成 非第一次任务完成

    //设计师
    FIRST_SUPPLEMENT_INFORMATION,//补充完整资料 第一次补充
    PASS_SKILL_AUDIT,//通过技能审核 审核通过
    BID_DAY,//投标 每天投标一次(>=3次,一天最多经验多+10)
    CONFIRM_COOPERATIVE_SCHEME,//确定合作方案 确定合作方案
    SUBMIT_SUB_TASK,//提交子任务 单个任务提交子任务
    FIRST_COMPLETE_TASK,//需求完成 第一次任务完成
    COMPLETE_TASK,//需求完成 非第一次任务完成

    //专家
    FIRST_REPLENISH_INFORMATION,//补充完整资料 第一次补充
//    FIRST_INVITE_DAY,//被邀请 每天第一次被邀请
    AUDIT_TASK,//审核任务 审核任务（1天内，经验多+10，6次封顶)
}

/**
 * 积分规则类
 * Created by Administrator on 2017/12/18.
 */
export enum ScoreRuleType {
    //公共
    INVITE_EXPERT,// 邀请专家 企业
    DEMAND_BID,// 投标 设计师
    TASK_COMPLETE,//任务完成 设计师
    DEMAND_PUBLISH,//成功发布任务 企业
    SKILL_AUDIT,//技能审核 专家
    INVITE_DESIGNER,//邀请设计师 企业
    EVALUATE_LOW,//获得低星评价
    SKILL_AUDIT_DESIGNER,//申请技能鉴定
    WITHDRAW_AUDIT,//申请提现
    DEMAND_AUDIT,//任务审核 专家
//    INVITE_EXPERT_BACK,// 删除邀请专家返还 企业

}

/**
 * 发送者类型
 */
export enum SenderType {
    COMPANY,
    CUSTOMER,
    EXPERT,
    PLAT
}

/**
 * Created by gonglei on 2017/10/9.
 * 网站内容类型
 */
export enum SentenceType {

    SEO,//搜索引擎优化
    INDEX,//首页内容维护
    FOOTER,//页脚内容维护
    HEADER,//页头内容维护
    PAGE,//子页面
}

/**
 * Created by gonglei on 2017/9/25.
 * 技能等级状态
 */
export enum SkillLevelState {

    APPLY,//申请中
    TOBE_CERTIFIED,//待认证
    CERTIFICATION,//通过认证
    CERTIFICATION_FAILURE,//认证失败
    BEYOND,//已认证
}

/**
 * Created by IntelliJ IDEA.
 * User: link
 * Date: 2017/11/21
 * Time: 14:25
 * 短信错误类型.
 */
export enum SmsError {
    OUT_OF_SERVICE,//业务停机
    PRODUCT_UNSUBSCRIBE,//产品为开通
    ACCOUNT_NOT_EXISTS,//账户不存在
    ACCOUNT_ABNORMAL,//账户异常
    INVALID_JSON_PARAM,//JSON数据不合法
    AMOUNT_NOT_ENOUGH,//账户余额不足
    SMS_SIGNATURE_ILLEGAL,//短信签名不合法
    SMS_TEMPLATE_ILLEGAL,//短信模板不合法
    BUSINESS_LIMIT_CONTROL,//业务限流
    PARAM_NOT_SUPPORT_URL,//不支持URL
    PARAM_LENGTH_LIMIT,//参数超出长度限制
    BLACK_KEY_CONTROL_LIMIT,//黑名单管控
    TEMPLATE_MISSING_PARAMETERS,//模板缺少变量
    MOBILE_COUNT_OVER_LIMIT,//手机号码数量超过限制
    SYSTEM_ERROR,//系统错误
    INVALID_PARAMETERS,//参数异常
    RAM_PERMISSION_DENY,//RAM权限DENY
    PRODUCT_UN_SUBSCRIPT,//未开通云通信产品的阿里云客户
    MOBILE_NUMBER_ILLEGAL,//非法手机号
}

/**
 * Created by IntelliJ IDEA.
 * User: link
 * Date: 2017/11/3
 * Time: 16:21
 * 短信类型.
 */
export enum SmsType {
//    UPDATE_MOBILE("修改手机号码"), REGISTER("注册用户"), FIND_PASSWORD("找回密码"), RESET_PASSWORD("重置密码"),
//    INVITE_CODE("专家邀请码"), DEMANDSTATE_CHANGE("任务审核状态更新"), BID_EVALUATION("邀请专家评标"), SUBMIT_BID("邀请设计师投标"),
//     DRAW_CASH("提现"), CHANGE_WECHAT("更换微信"),

    NEWBIE_DEMAND,//新手任务
    UPDATE_MOBILE,//修改手机号
    REGISTER,//注册
    FIND_PASSWORD,//忘记密码
    RESET_PASSWORD,//重置密码
    INVITE_CODE,//邀请码
    DEMANDSTATE_CHANGE,//任务有变动
    PLATFORM_AUDIT_USER_SUCCESS,//设计师专家平台审核通过
    PLATFORM_AUDIT_USER_FAILUE,//设计师专家平台审核通过
    BID_EVALUATION,//评标邀请
    SUBMIT_BID,//投标邀请
    PLATFORM_AUDIT_SUCCESS,//平台审核通过
    PLATFORM_AUDIT_FAILUE,//平台审核未通过
    CENCEL_BIDER,//取消中标人即重新招标
    BIDDED,//中标通知
    CONSULTING_CONTRACT,//通知设计师查阅合同
    CONFIRM_CONTRACT,//通知设计师合同已经确认
    REJECT_CONTRACT,//通知企业，设计师拒绝此合同
    AGREE_CONTRACT,//通知企业，设计师同意合同
    REJECT_COMPLETE,//通知设计师，企业拒绝完成任务
    INVITE_EXPERT_REVIEW,//邀请专家评审会签
    EXPERT_REVIEW_SUCCESS,//通知设计师专家评审会签通过
    EXPERT_REVIEW_COMPANY_SUCCESS,//通知企业专家评审会签通过
    EXPERT_REVIEW_FAILUE,//通知设计师专家评审会签未通过
    CONFIRM_COMPLETE,//通知设计师确认完成任务
    SUBDEMAND_DURING,//设计师子任务即将到截止日期
    SUBDEMAND_DELAY,//设计师子任务延期
    DEMAND_DURING,//设计师任务即将到截止日期
    DEMAND_DELAY,//设计师任务延期
    ABORT_DELAY,//招标过了截止日期
    SKILL_IDENTIFY_SUCCESS,//技能鉴定成功
    SKILL_IDENTIFY_FAILUE,//技能鉴定失败
    CHANGE_WECHAT//更改微信
    ,

}

/**
 * 子任务状态
 *
 * @author qiuyj
 * @since 2017/9/8
 */
export enum SubtaskState {
    UNCOMPLETE,//未完成
    COMMIT_COMPLETE,//提交完成
    CONFIRM_FAIL,//确认失败
    FINISH,//完成


}

/**
 * Created by road on 18/1/5.
 */
export enum TaskType {
    NEWBIE_TASK,//新手任务类型

    SKILL_TASK,//技能任务

}

/**
 * Created by Administrator on 2017/9/6.
 * 模板类型
 */
export enum TempletType {

    CONTRACT_TEMPLATE,//合同模板
    IMPORT_DEMAND_TEMPLATE,//任务导入模板
    DEMAND_TEMPLATE,//任务模板
    NEED_TEMPLATE,//需求模板
    APPEAL_TEMPLATE,//申诉模板
}

/**
 * Created by gonglei on 2017/9/4.
 * 交易类型
 */
export enum TransactionType {

    RECHARGE,//充值
    WITHDRAWAL//提现

}

/**
 * Created by IntelliJ IDEA.
 * User: link
 * Date: 2017/11/16
 * Time: 20:04
 * 发送类型.
 */
export enum TransmitType {
    EMAIL,//邮箱发送
    MOBILE,//手机发送
}

/**
 * Created by Administrator on 2017/9/5.
 * 提现状态
 */
export enum WithdrawalState {

    PENDING_AUDIT,   //待审核
    WITHDRAWAL_PASS, //审核通过
    WITHDRAWAL_FAIL, //审核不通过
    PAYOFF,//已支付
}

/**
 * Created by gonglei on 2017/9/4.
 * 交易类型
 */
export enum DebtPayType {

    DESIGN_DEMAND,//任务设计
    EXPERT_REVIEW,//评审任务
    SKILL_IDENTIFY,//技能鉴定
    PLATFORM_COMMISSION,//平台佣金
}
