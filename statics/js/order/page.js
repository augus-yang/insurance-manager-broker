var Page = function () {
    var initData = function () {
        pageKit.init({
            liId: 'insuranceLi',
            table: {
                url: '/order',
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "id"},
                    {"data": "user.mobile"},
                    {"data": "status"},
                    {
                        "data": "supplementStatus",
                        "render": function (data) {
                            if(data === true){
                                data = '开启'
                            }else {
                                data = '关闭'
                            }
                            return data;
                        }
                    },
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data, type, row, meta) {
                            var ht;

                            ht = '<a href="/order/detail/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-search"></i>查看</a>'
                                + '<button class="btn btn-sm btn-outline grey-salsa uppercase" data-toggle="confirmation" data-id="'+ data +'" data-popout="true">补充资料</button>';
                            if(row.status != '获得全民经纪奖金'){
                                ht = ht + '<a href="/order/update/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-edit"></i>更新</a>';
                            }
                            return ht;
                        }
                    }
                ],
                drawCallback: function () {
                    $('[data-toggle=confirmation]').confirmation({ btnOkClass: 'btn btn-sm btn-success', btnCancelClass: 'btn btn-sm btn-danger'});
                    $('[data-toggle=confirmation]').on('confirmed.bs.confirmation', function () {
                        var orderId = $(this).attr('data-id')

                        $.ajax({
                            url: "/api/inner/order/update/" + orderId, // ajax URL
                            type: "PUT", // request type
                            data: {supplementStatus: true},
                            success: function(data) { // add request parameters before submit
                                toastrKit.success('开启补充材料成功', {
                                    onShown: function() {
                                        $('#datatable_ajax').DataTable().ajax.reload();
                                    }
                                });
                            }
                        })
                    });

                    $('[data-toggle=confirmation]').on('canceled.bs.confirmation', function () {
                        var orderId = $(this).attr('data-id')

                        $.ajax({
                            url: "/api/inner/order/update/" + orderId , // ajax URL
                            type: "PUT", // request type
                            data: {supplementStatus: false},
                            success: function(data) { // add request parameters before submit
                                toastrKit.success('关闭补充材料成功', {
                                    onShown: function() {
                                        $('#datatable_ajax').DataTable().ajax.reload();
                                    }
                                });
                            }
                        })
                    });
                }
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