var Create = function () {
    var initValidation = function () {
        formKit.init({
            liId: 'policyLi',
            valid: {
                url: '/bespoke',
                names: ['content', 'mobile'],
                success: function () {
                    window.location.href = '/bespoke/page'
                },
                rules: {
                    content: {
                        required: true
                    },
                    mobile: {
                        required: true
                    }
                },
                messages: {
                    content: {
                        required: '请输入预约内容'
                    },
                    mobile: {
                        required: '请输入手机号'
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