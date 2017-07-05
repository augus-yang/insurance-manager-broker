var pageKit = function () {
    var liActive = function (liId) {
        $('#indexLi').removeClass('active open');

        var li = $('#' + liId);
        li.addClass('active open');
        li.find('a').append('<span class="selected"></span>');
    }

    var create = function (url) {
        $("#create").on('click', function () {
            window.location.href = url
        });
    }

    var del = function (url, success) {
        $("#del").on("show.bs.modal", function (e) {
            var id = $(e.relatedTarget).data('id');

            $("#confirm").on('click', function () {
                $("#confirm").attr('disabled', 'disabled');
                requestKit.del(url + '/' + id, function () {
                    $("#confirm").removeAttr('disabled');
                    $("#del").modal('hide');
                    $('#datatable_ajax').DataTable().ajax.reload();
                    if (success) {
                        success();
                    }
                });
            });
        });
    }

    var initDatePicker = function () {
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true
        });
    }

    var handleRecords = function (url, columns, drawCallback) {
        var grid = new Datatable();

        grid.init({
            src: $("#datatable_ajax"),
            loadingMessage: 'Loading...',
            dataTable: {
                "bStateSave": true,
                "ordering": false,
                "lengthMenu": [
                    [10, 20, 50, 100, 150],
                    [10, 20, 50, 100, 150]
                ],
                "pageLength": 10,
                "ajax": {
                    url: '/dtb' + url
                },
                "columns": columns
            }
        });

        if(drawCallback){
            grid.drawCallback(function() {
                drawCallback();
            })
        }

    }

    return {
        init: function (opts) {
            liActive(opts.liId);
            if(opts.create){
                create(opts.create);
            } else {
                $("#create").hide();
            }
            del(opts.del, opts.delSuccess);
            initDatePicker();
            handleRecords(opts.table.url, opts.table.columns, opts.table.drawCallback);
        }
    }
}();