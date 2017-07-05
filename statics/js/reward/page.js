var Page = function () {
    var initData = function () {
        pageKit.init({
            liId: 'insuranceLi',
            table: {
                url: '/reward',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "orderId"},
                    {"data": "user.mobile"},
                    {"data": "money"},
                    {"data": "rewardType"},
                    {"data": "user.name"},
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "orderId",
                        "render": function (data) {
                            return '<a href="/order/detail/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i>订单</a>';
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