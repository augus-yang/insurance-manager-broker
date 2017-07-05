var Create = function () {
    var initSelect = function () {
        $(".multi-select").multiSelect();
    }

    var initValidation = function () {
        formKit.init({
            liId: 'privilegeLi',
            valid: {
                url: '/roleResource',
                names: ['roleId', 'resourceIds'],
                success: function () {
                    window.location.href = '/role/detail/' + $('#form [name="roleId"]').val()
                },
                rules: {
                    resourceIds: {
                        required: true
                    }
                },
                messages: {
                    resourceIds: {
                        required: '请选择可选资源'
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
    Create.init();
});