var Update = function () {
    var initSelect = function () {
        $('select').select2();
    }

    var initValidation = function () {
        formKit.init({
            liId: 'privilegeLi',
            valid: {
                method: 'put',
                url: '/user/' + $('#form input[name="id"]').val(),
                names: ['name', 'mobile', 'roleId'],
                success: function () {
                    window.location.href = '/user/page'
                },
                rules: {
                    name: {
                        required: true
                    },
                    mobile: {
                        required: true
                    },
                    roleId: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: '请输入名称'
                    },
                    mobile: {
                        required: '请输入手机号'
                    },
                    roleId: {
                        required: '请选择角色'
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