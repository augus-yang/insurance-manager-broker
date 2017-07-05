var Login = function () {
    var handleLogin = function () {
        var submitForm = function () {
            requestKit.post('/login', {
                name: $('.login-form input[name="username"]').val(),
                pwd: $('.login-form input[name="password"]').val()
            }, function () {
                window.location.href = '/index'
            });
        }

        $('.login-form').validate({
            errorElement: 'span',
            errorClass: 'help-block',
            focusInvalid: false,
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: "请输入用户名"
                },
                password: {
                    required: "请输入密码"
                }
            },
            invalidHandler: function (event, validator) {
                $('.alert-danger', $('.login-form')).show();
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },
            submitHandler: function (form) {
                submitForm();
            }
        });

        $('.login-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    submitForm();
                }
                return false;
            }
        });
    }

    var handleRegister = function () {
        $('.register-form').validate({
            errorElement: 'span',
            errorClass: 'help-block',
            focusInvalid: false,
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                }
            },
            messages: {
                username: {
                    required: "请输入用户名"
                },
                password: {
                    required: "请输入密码"
                },
                rpassword: {
                    equalTo: "两次输入的密码不一致"
                }
            },
            invalidHandler: function (event, validator) {

            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },
            submitHandler: function (form) {
                form.submit();
            }
        });

        $('.register-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function () {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }

    return {
        init: function () {
            handleLogin();
            handleRegister();

            $.backstretch([
                    "/metronic/pages/media/bg/1.jpg",
                    "/metronic/pages/media/bg/2.jpg",
                    "/metronic/pages/media/bg/3.jpg",
                    "/metronic/pages/media/bg/4.jpg"
                ], {
                    fade: 1000,
                    duration: 8000
                }
            );
        }
    };

}();

jQuery(document).ready(function () {
    Login.init();
});