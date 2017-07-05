var toastrKit = function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    return {
        success: function (message, opts) {
            opts = opts || {}
            if(opts.onShown) {
                toastr.options.onShown = function() {
                    opts.onShown();
                }
            }

            toastr.success(message);
        },
        error: function (message) {
            toastr.error(message);
        }
    }
}();