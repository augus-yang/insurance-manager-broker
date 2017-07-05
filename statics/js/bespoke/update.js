var Update = function () {
    var initValidation = function () {
        formKit.init({
            liId: 'policyLi',
            valid: {
                method: 'put',
                url: '/bespoke/' + $('#form input[name="id"]').val(),
                names: ['content'],
                success: function () {
                    window.location.href = '/bespoke/page'
                },
                rules: {
                    content: {
                        required: true
                    }
                },
                messages: {
                    content: {
                        required: '请输入预约内容'
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
    Update.init();
});