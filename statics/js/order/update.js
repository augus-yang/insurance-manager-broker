var Update = function () {

    var decideIsHide = function (divId) {
        var type = $('#statusType').val();
        if(type == '获得全民经纪奖金'){
            $("input[name='policyMoney']").rules("add",{
                required:true,
                messages:{
                    required:"请填写保单奖励"
                }
            });
            $('#' + divId).show();
        } else {
            $('#' + divId).hide();
        }
    }

    var mayHide = function(divId) {
        $('#statusType').change(function(){
            decideIsHide(divId);
        })
    }

    var initSelect = function () {
        $('select').select2();
    }


    var initValidation = function () {
        formKit.init({
            liId: 'insuranceLi',
            valid: {
                method: 'put',
                url: '/order/' + $('#form input[name="id"]').val(),
                names: ['status', 'policyMoney', 'extendMoney'],
                success: function () {
                    window.location.href = '/order/page'
                },
                rules: {
                    status: {
                        required: true
                    }
                },
                messages: {
                    status: {
                        required: '请选择状态'
                    }
                }
            }
        });
    }

    return {
        init: function () {
            decideIsHide('mayHide');
            mayHide('mayHide');
            initSelect();
            initValidation();
        }
    };

}();

jQuery(document).ready(function () {
    Update.init();
});