var Page = function () {
    var initData = function () {
        pageKit.init({
            liId: 'insuranceLi',
            create: '/news/create',
            del: '/news',
            table: {
                url: '/news',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "total"},
                    {"data": "user.mobile"},
                    {
                        "data": "status",
                        "render": function (data) {
                            if(data == false){
                                data = '未读';
                            } else {
                                data = '已读';
                            }
                            return data;
                        }
                    },
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<a href="/news/detail/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i>查看</a>'
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