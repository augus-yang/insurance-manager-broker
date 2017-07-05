var Update = function () {
    var initValidation = function () {
        formKit.init({
            liId: 'insuranceLi',
            valid: {
                method: 'put',
                url: '/appointment/' + $('#form input[name="id"]').val(),
                names: ['flightNumber', 'peoples', 'flightDate', 'whetherOpenAccount', 'openAccountType', 'openAccountBank'],
                success: function () {
                    window.location.href = '/appointment/page'
                },
                rules: {
                    flightNumber: {
                        required: true
                    },
                    peoples: {
                        required: true
                    },
                    flightDate: {
                        required: true
                    },
                    whetherOpenAccount: {
                        required: true
                    },
                    openAccountType: {
                        required: true
                    },
                    openAccountBank: {
                        required: true
                    }
                },
                messages: {
                    flightNumber: {
                        required: '请输入航班号'
                    }
                    ,
                    peoples: {
                        required: '请输入随行人员数'
                    },
                    flightDate: {
                        required: '请输入航班日期'
                    },
                    whetherOpenAccount: {
                        required: '请输入是否开户'
                    },
                    openAccountType: {
                        required: '请输入开户类型'
                    },
                    openAccountBank: {
                        required: '请输入开户银行'
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