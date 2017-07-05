var Page = function () {
    var initSelect = function () {
        $('select').select2();
    }

    var initData = function () {
        pageKit.init({
            liId: 'privilegeLi',
            create: '/user/create',
            del: '/user',
            table: {
                url: '/user',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "name"},
                    {"data": "mobile"},
                    {"data": "role.describe"},
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<a href="/user/update/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-edit"></i>更新</a>'
                                + '<a class="btn btn-sm btn-outline grey-salsa" data-toggle="modal" data-target="#del" data-id="' + data + '"><i class="fa fa-trash"></i>删除</a>'
                                + '<a href="/user/detail/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i>查看</a>';
                        }
                    }
                ]
            }
        });
    }

    return {
        init: function () {
            initSelect();
            initData();
        }
    }
}();

jQuery(document).ready(function () {
    Page.init();
});