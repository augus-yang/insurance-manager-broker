var Detail = function () {
    var initDetail = function (liId) {
        detailKit.init({
            liId: liId
        });
    }

    var resetPwd = function () {
        $("#resetPwd").on('click', function () {
            window.location.href = '/user/resetPwd/' + $('input[name="id"]').val()
        });
    }

    return {
        init: function () {
            initDetail('privilegeLi');
            resetPwd();
        }
    }
}();

jQuery(document).ready(function () {
    Detail.init();
});