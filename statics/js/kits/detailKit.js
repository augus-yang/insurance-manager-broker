var detailKit = function () {
    var liActive = function (liId) {
        $('#indexLi').removeClass('active open');

        var li = $('#' + liId);
        li.addClass('active open');
        li.find('a').append('<span class="selected"></span>');
    }

    return {
        init: function (opts) {
            liActive(opts.liId);
        }
    }
}();