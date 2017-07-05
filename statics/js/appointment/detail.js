var Detail = function () {
    var initDetail = function (liId) {
        detailKit.init({
            liId: liId
        });
    }

    return {
        init: function () {
            initDetail('insuranceLi');
        }
    }
}();

jQuery(document).ready(function () {
    Detail.init();
});