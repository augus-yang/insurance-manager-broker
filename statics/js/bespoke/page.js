var Page = function () {
    var initData = function () {
        pageKit.init({
            liId: 'policyLi',
            create: '/bespoke/create',
            del: '/bespoke',
            table: {
                url: '/bespoke',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "user.mobile"},
                    {
                        "data": "content",
                        "render": function (data) {
                            return data.substring(0,20);
                        }
                    },
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<a href="/bespoke/update/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-edit"></i>更新</a>'
                                + '<a class="btn btn-sm btn-outline grey-salsa" data-toggle="modal" data-target="#del" data-id="' + data + '"><i class="fa fa-trash"></i>删除</a>';
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