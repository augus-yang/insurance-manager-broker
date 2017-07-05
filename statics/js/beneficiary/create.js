var Create = function () {

    var initValidation = function() {
        formKit.init({
            liId: 'insuranceLi',
            valid: {
                url: '/beneficiary/create/' + $('#form input[name="insuranceOrderId"]').val(),
                names: ['name', 'scale'],
                success: function () {
                    window.location.href = '/insuranceOrder/update/' + $('#form input[name="insuranceOrderId"]').val()
                },
                rules: {
                    name: {
                        required: true
                    },
                    scale: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: '请输入受益人'
                    },
                    scale: {
                        required: '请输入受益比例'
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