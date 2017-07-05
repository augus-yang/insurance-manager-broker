var Page = function () {
    var initData = function () {
        pageKit.init({
            liId: 'insuranceLi',
            table: {
                url: '/withdrawals',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "account.user.mobile"},
                    {"data": "policyMoney"},
                    {"data": "extendMoney"},
                    {"data": "bank.openAccountBank"},
                    {"data": "status"},
                    {
                        "data": "refundStatus",
                        "render": function (data) {
                            if(data === false){
                                data = '未退款'
                            }else {
                                data = '已退款'
                            }
                            return data;
                        }
                    },
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<a href="/withdrawals/detail/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i>审核</a>';
                        }
                    }
                ]
            }
        });
    }

    return {
        init: function () {
            initData();
        }
    }
}();

jQuery(document).ready(function () {
    Page.init();
});