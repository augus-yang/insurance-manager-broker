var Detail = function () {
    var initData = function () {
        var pathname = window.location.pathname;
        var roleId = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);

        pageKit.init({
            liId: 'privilegeLi',
            create: '/roleResource/create/' + roleId,
            del: '/roleResource',
            delSuccess: function(){
                var oldLength = $("#resourceLength").html();
                var newLength = parseInt(oldLength) - 1;
                $("#resourceLength").html(newLength);
            },
            table: {
                url: '/roleResource/'+ roleId,
                columns: [
                    {
                        "data": "role_resource.id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "name"},
                    {"data": "describe"},
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "role_resource.id",
                        "render": function (data) {
                            return '<a class="btn btn-sm btn-outline grey-salsa" data-toggle="modal" data-target="#del" data-id="' + data + '"><i class="fa fa-trash"></i>删除</a>';
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
    Detail.init();
});