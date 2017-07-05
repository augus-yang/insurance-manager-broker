var requestKit = function () {
    // ajax请求统一处理
    function request(type, url, data, success, error) {
        App.blockUI({
            boxed: true
        });

        $.ajax({
            type: type,
            url: '/api/inner' + url,
            data: data,
            success: function (res) {
                App.unblockUI();

                success(res.data.data);
            },
            error: function (res) {
                App.unblockUI();

                var data = res.responseJSON;
                if (data.code === 'login_timeout_error') {
                    window.location.href = '/login';
                } else {
                    if (!error) {
                        toastrKit.error(data.message);
                    } else {
                        error(data.message);
                    }
                }
            }
        })
    }

    return {
        get: function (url, data, success, error) {
            url += '?';

            for (var i in data) {
                url += i + '=' + data[i] + '&';
            }

            url = url.substring(0, url.length - 1);

            if (url.charAt(url.length - 1) === '?') {
                url = url.substring(0, url.length - 1);
            }

            request('get', url, {}, success, error);
        },
        post: function (url, data, success, error) {
            request('post', url, data, success, error);
        },
        put: function (url, data, success, error) {
            request('put', url, data, success, error);
        },
        del: function (url, success, error) {
            request('delete', url, {}, success, error);
        }
    }
}();