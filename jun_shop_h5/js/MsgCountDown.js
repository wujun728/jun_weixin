var _timer = 0;
(function ($) {
    $.fn.SendCode = function ($numInputer, url, callback,param) {
        var context = $(this);

        function startCountDown(time) {
            _timer = time;
            context.attr("disabled", "disabled");
            _timer--;
            if (_timer >= 0) {
                setTimeout(function () {
                    if (context.is("input")) context.val("" + _timer + "秒后可重新发送").attr("disabled", "disabled");
                    else context.html("" + _timer + "秒后可重新发送").attr("disabled", "disabled");
                    startCountDown(_timer);
                }, 1000);
            } else {
                if (context.is("input")) context.removeAttr("disabled").val("重新发送");
                else context.removeAttr("disabled").html("重新发送");
            }
        }
        context.attr("disabled", "disabled");

        context.click(function () {
            if (callback() != false) startCountDown(60);
        });
        return {
            optoins: { $numInputer: $numInputer, $sendTrigger: context, callback: callback },
            clear:function() {
                clearInterval(countDownCounter);
                startCountDown(0);
            },
            countDown: function () {
                $.get(url + "?act=getMsgTime&sence=" + param + "&r=" + Math.random() + "", function (data) {
                    if (data.status == 0) {
                        startCountDown(data.time);
                    } else {
                        context.removeAttr("disabled");
                        return;
                    }
                }, "json");
            }
        };
    };
})(jQuery)