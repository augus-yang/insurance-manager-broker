/**
 * 常量Kit
 */

// 申请人类型
const applicantTypes = ['男', '女']
// 证件类型
const documentTypes = ['身份证']
// 审核状态
const statusType = ['审核中', '审核通过', '审核未通过']
// 托管有效期
const validityType = 10
// 性别
const sexType = ['男', '女']
// 产品类别
const productType = ['大病医疗', '教育金投资', '养老金投资', '高端医疗']
// 预算范围
const budgetType = ['2000美金', '3000美金', '4000美金', '5000美金', '6000美金以上', '7000美金', '9000美金以上', '10000美金',
    '15000美金', '20000美金以上']
// 国籍
const nationalityType = ['中国大陆', '中国香港', '中国台湾', '中国澳门', '其他']
// 受保人关系
const relationType = ['祖父母', '父母', '配偶', '子女', '本人']
// 开户类型
const openAccountType = ['外资开户', '中资开户']
// 订单状态
const orderStatusType = ['待确认', '获取方案', '客服沟通', '产品建议书确认', '保险下单', '提交赴港预约单', '香港接待确认', '完成赴港签约', '保险公司审核通过',
    '保单寄出', '保单拍照上传', '客服确认', '犹豫期完成', '获得全民经纪奖金']

// 奖励类型
const rewardType = ['保单奖励', '推广奖励']

module.exports = this

/**
 * 获取所有常量
 * @returns {{applicantTypes: [string,string,string], documentTypes: [string,string,string], statusType: [string,string,string], sexType: [string,string], productType: [string,string,string,string], budgetType: [string,string,string,string,string,string,string,string,string,string], nationalityType: [string,string,string,string,string], relationType: [string,string,string,string,string], openAccountType: [string,string], orderStatusType: [string,string,string,string,string,string,string,string,string,string,string,string]}}
 */
this.getAll = () => {
    return {
        applicantTypes: applicantTypes,
        documentTypes: documentTypes,
        statusType: statusType,
        sexType: sexType,
        productType: productType,
        budgetType: budgetType,
        nationalityType: nationalityType,
        relationType: relationType,
        openAccountType: openAccountType,
        orderStatusType: orderStatusType,
        rewardType: rewardType
    }
}

/**
 * 获取申请人类型
 * @returns {[string,string,string]}
 */
this.getApplicantTypes = () => {
    return applicantTypes
}

/**
 * 获取证件类型
 * @returns {[string,string,string]}
 */
this.getDocumentTypes = () => {
    return documentTypes
}

/**
 * 获取审核状态
 * @returns {[string,string,string]}
 */
this.getStatusType = () => {
    return statusType
}

/**
 * 获取托管有效期
 * @returns {number}
 */
this.getValidityType = () => {
    return validityType
}

/**
 * 获取性别
 * @returns {[string,string]}
 */
this.getSexType = () => {
    return sexType
}

/**
 * 获取国籍
 * @returns {[string,string,string,string,string]}
 */
this.getNationalityType = () => {
    return nationalityType
}

/**
 * 获取产品类别
 * @returns {[string,string,string,string]}
 */
this.getProductType = () => {
    return productType
}

/**
 * 获取预算范围
 * @returns {[string,string,string,string,string,string,string,string,string,string]}
 */
this.getBudgetType = () => {
    return budgetType
}

/**
 * 获取受保人关系
 * @returns {[string,string,string,string,string]}
 */
this.getRelationType = () => {
    return relationType
}

/**
 * 获取开户类型
 * @returns {[string,string]}
 */
this.getOpenAccountType = () => {
    return openAccountType
}

/**
 * 获取订单状态
 * @returns {[string,string,string,string,string,string,string,string,string,string,string,string]}
 */
this.getOrderStatusType = () => {
    return orderStatusType
}

/**
 * 获取奖励类型
 * @returns {[string,string]}
 */
this.getRewardType = () => {
    return rewardType
}