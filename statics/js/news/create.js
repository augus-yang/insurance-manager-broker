var Create = function () {
    var initValidation = function () {
        formKit.init({
            liId: 'insuranceLi',
            valid: {
                url: '/news',
                names: ['total', 'content', 'mobile', 'enclosure'],
                success: function () {
                    window.location.href = '/news/page'
                },
                rules: {
                    total: {
                        required: true
                    },
                    content: {
                        required: true
                    },
                    mobile: {
                        required: true
                    }
                },
                messages: {
                    total: {
                        required: '请输入标题'
                    },
                    content: {
                        required: '请输入内容'
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