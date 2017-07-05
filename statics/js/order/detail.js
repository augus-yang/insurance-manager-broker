var Detail = function () {
    var initDetail = function () {
        pageKit.init({
            liId: 'insuranceLi',
            del: '/supplement',
            table: {
                url: '/supplement',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "content"},
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<a href="/supplement/detail/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i>查看</a>'
                                + '<a class="btn btn-sm btn-outline grey-salsa" data-toggle="modal" data-target="#del" data-id="' + data + '"><i class="fa fa-trash"></i>删除</a>';
                        }
                    }
                ]
            }
        });
    }

    return {
        init: function () {
            initDetail();
        }
    }
}();

jQuery(document).ready(function () {
    Detail.init();
});