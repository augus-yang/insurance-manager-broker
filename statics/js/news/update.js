var Update = function () {
    var initSelect = function () {
        $('select').select2();
    }

    var initValidation = function () {
        formKit.init({
            liId: 'insuranceLi',
            valid: {
                method: 'put',
                url: '/news/' + $('#form input[name="id"]').val(),
                names: ['total', 'content', 'mobile'],
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
            initSelect();
            initValidation();
        }
    };

}();

jQuery(document).ready(function () {
    Update.init();
});