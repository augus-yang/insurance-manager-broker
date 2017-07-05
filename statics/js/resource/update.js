var Update = function () {
    var initValidation = function () {
        formKit.init({
            liId: 'privilegeLi',
            valid: {
                method: 'put',
                url: '/resource/' + $('#form input[name="id"]').val(),
                names: ['name', 'describe'],
                success: function () {
                    window.location.href = '/resource/page'
                },
                rules: {
                    name: {
                        required: true
                    },
                    describe: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: '请输入名称'
                    },
                    describe: {
                        required: '请输入描述'
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