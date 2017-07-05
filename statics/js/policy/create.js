var Create = function () {
    var initValidation = function () {
        formKit.init({
            liId: 'policyLi',
            valid: {
                url: '/policy',
                names: ['policyNumber', 'applicant', 'insurant', 'mobile', 'insuranceCompany', 'productName'],
                success: function () {
                    window.location.href = '/policy/page'
                },
                rules: {
                    policyNumber: {
                        required: true
                    },
                    applicant: {
                        required: true
                    },
                    insurant: {
                        required: true
                    },
                    mobile: {
                        required: true
                    },
                    insuranceCompany: {
                        required: true
                    },
                    productName: {
                        required: true
                    }
                },
                messages: {
                    policyNumber: {
                        required: '请输入保单号'
                    },
                    applicant: {
                        required: '请输入投保人'
                    },
                    insurant: {
                        required: '请输入受保人'
                    },
                    mobile: {
                        required: '请输入手机号'
                    },
                    insuranceCompany: {
                        required: '请输入保险公司'
                    },
                    productName: {
                        required: '请输入产品名称'
                    }
                }
            }
        });
    }

    return {
        init: function () {
            initValidation();
        }
    };
}();

jQuery(document).ready(function () {
    Create.init();
});