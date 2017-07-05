var Update = function () {
    var initDatePicker = function() {
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true
        });
    }

    var initValidation = function () {
        formKit.init({
            liId: 'insuranceLi',
            valid: {
                method: 'put',
                url: '/programme/' + $('#form input[name="id"]').val(),
                names: ['insurant', 'sex', 'birthday', 'smoke', 'product', 'budget'],
                success: function () {
                    window.location.href = '/order/detail/' + $('#form input[name="orderId"]').val()
                },
                rules: {
                    insurant: {
                        required: true
                    },
                    sex: {
                        required: true
                    },
                    birthday: {
                        required: true
                    },
                    smoke: {
                        required: true
                    },
                    product: {
                        required: true
                    },
                    budget: {
                        required: true
                    }
                },
                messages: {
                    insurant: {
                        required: '请输入受保人'
                    },
                    sex: {
                        required: '请输入性别'
                    },
                    birthday: {
                        required: '请输入出生年月'
                    },
                    smoke: {
                        required: '请输入是否吸烟'
                    },
                    product: {
                        required: '请输入产品类别'
                    },
                    budget: {
                        required: '请输入预算范围'
                    }
                }
            }
        });
    }

    return {
        init: function () {
            initDatePicker();
            initValidation();
        }
    };
}();

jQuery(document).ready(function () {
    Update.init();
});