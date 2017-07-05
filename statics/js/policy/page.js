var Page = function () {
    var initData = function () {
        pageKit.init({
            liId: 'policyLi',
            table: {
                url: '/policy',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {
                        "data": "user.id",
                        "render": function (data, type, row, meta) {
                            data = row.user.name + '(' + row.user.mobile + ')'
                            return data;
                        }
                    },
                    {"data": "policyNumber"},
                    {"data": "applicant"},
                    {"data": "insurant"},
                    {"data": "mobile"},
                    {"data": "insuranceCompany"},
                    {"data": "productName"},
                    {"data": "status"},
                    {"data": "validity"},
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<a href="/policy/detail/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i>审核</a>';
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