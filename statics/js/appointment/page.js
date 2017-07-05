var Page = function () {
    var initData = function () {
        pageKit.init({
            liId: 'insuranceLi',
            table: {
                url: '/appointment',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "user.mobile"},
                    {"data": "flightNumber"},
                    {"data": "peoples"},
                    {"data": "flightDate"},
                    {"data": "status"},
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<a href="/appointment/detail/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i>审核</a>';
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