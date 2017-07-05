var ResetPwd = function () {
    var initCheck = function () {
        $('#form input[name="oldPwd"]').blur(function(){
            requestKit.get('/user/' + $('#form input[name="id"]').val() + '/pwd', {
                oldPwd: $('#form input[name="oldPwd"]').val()
            }, function(){
                toastrKit.success('原始密码正确');
            });
        });
    }

    var initValidation = function () {
        formKit.init({
            liId: 'privilegeLi',
            valid: {
                method: 'put',
                url: '/user/' + $('#form input[name="id"]').val() + '/pwd',
                names: ['oldPwd', 'newPwd'],
                success: function () {
                    window.location.href = '/user/page'
                },
                rules: {
                    oldPwd: {
                        required: true
                    },
                    newPwd: {
                        required: true
                    },
                    newPwd2: {
                        required: true,
                        equalTo: '#newPwd'
                    }
                },
                messages: {
                    oldPwd: {
                        required: '请输入原始密码'
                    },
                    newPwd: {
                        required: '请输入新密码'
                    },
                    newPwd2: {
                        required: '请输入确认密码',
                        equalTo: '两次输入的密码不一致'
                    }
                }
            }
        });
    }

    return {
        init: function () {
            initCheck();
            initValidation();
        }
    };

}();

jQuery(document).ready(function () {
    ResetPwd.init();
});