var formKit = function () {
    var liActive = function (liId) {
        $('#indexLi').removeClass('active open');

        var li = $('#' + liId);
        li.addClass('active open');
        li.find('a').append('<span class="selected"></span>');
    }

    var handleValidation = function (opts) {
        var submitForm = function () {
            var data = {}
            var names = opts.names
            names.forEach(function (name) {
                name = name.trim();
                data[name] = $('#form [name=' + name + ']').val()
            });

            $("#submit").attr('disabled', 'disabled');
            if (opts.method === 'put') {
                requestKit.put(opts.url, data, function() {
                    $("#submit").removeAttr('disabled');
                    opts.success();
                }, function(message) {
                    $("#submit").removeAttr('disabled');
                    toastrKit.error(message);
                });
            } else {
                requestKit.post(opts.url, data, function() {
                    $("#submit").removeAttr('disabled');
                    opts.success();
                }, function(message) {
                    $("#submit").removeAttr('disabled');
                    toastrKit.error(message);
                });
            }
        }

        var form = $('#form');
        var error = $('.alert-danger', form);
        var success = $('.alert-success', form);

        form.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            rules: opts.rules,
            messages: opts.messages,
            invalidHandler: function (event, validator) {
                success.hide();
                error.show();
                App.scrollTo(error, -200);
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
            },
            submitHandler: function (form) {
                success.show();
                error.hide();
                submitForm();
            }
        });

        $('input', form).keypress(function (e) {
            if (e.which == 13) {
                if (form.validate().form()) {
                    submitForm();
                }
                return false;
            }
        });
    }

    return {
        init: function (opts) {
            liActive(opts.liId);
            handleValidation(opts.valid);
        }
    };
}();
