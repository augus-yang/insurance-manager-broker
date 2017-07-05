var Create = function () {
    var initValidation = function () {
        formKit.init({
            liId: 'privilegeLi',
            valid: {
                url: '/role',
                names: ['name', 'describe'],
                success: function () {
                    window.location.href = '/role/page'
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
    Create.init();
});