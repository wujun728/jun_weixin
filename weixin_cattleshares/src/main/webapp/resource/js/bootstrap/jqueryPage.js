/*分页控件v1.0
  date:2015.09.07
*/
(function (window, $) {
    $.fn.pagination = function (options) {
        var _dftOpts = {
            count: 0,//总数
            size: 10,//每页数量
            index: 1,//当前页
            lrCount: 5,//当前页左右最多显示的数量
            lCount: 0,//最开始预留的数量
            rCount: 0,//最后预留的数量
            first: "首页",
            last: "尾页",
            before: "上一页",
            next: "下一页",
            callback: null,//点击事件
            beforeRender: null//项呈现前
        };
        $.extend(_dftOpts, options);
        var count = _dftOpts.count;
        if (count <= 0) return;
        var _ellipsis = "...";
        var _size = _dftOpts.size > 0 ? (_dftOpts.size > count ? count : _dftOpts.size) : 1;
        var _page = Math.ceil(count / _size);
        var _index = _dftOpts.index > 0 ? (_dftOpts.index > _page ? _page : _dftOpts.index) : 1;
        var _lrcount = _dftOpts.lrCount * 2 + 1 > _page ? parseInt((_page - 1) / 2) : _dftOpts.lrCount;
        var _continueCount = _lrcount * 2 + 1;
        var _lCount = _dftOpts.lCount <= 0 ? 0 : (_dftOpts.lCount > _page ? _page - 1 : _dftOpts.lCount);
        var _rCount = _dftOpts.rCount <= 0 ? 0 : (_dftOpts.rCount > _page ? _page - 1 : _dftOpts.rCount);
        var _first = _dftOpts.first;
        var _before = _dftOpts.before;
        var _last = _dftOpts.last;
        var _next = _dftOpts.next;
        var _FromTo;
        var _url = location.pathname + location.search + "#p";
        var jthis = this;
        var jPager = $("<div>", { "class": "pager" });
        initJPager();
        jthis.append(jPager);
        regisiterEvent();
        return jthis;

        /*function*/
        function initJPager() {
            _FromTo = GetFromTo();
            var from = _FromTo.from;
            var to = _FromTo.to;
            var before = _index <= 1 ? 1 : _index - 1;
            var next = _index >= _page ? _page : _index + 1;
            var beforeLast = _page - 1;
            var jPrevs, jNexts;
            var i;

            //前      
            if (from === 2 && _lCount > 0) {
                appendLink(1);
            } else if (from > _lCount + 1) {
                for (i = 0; i < _lCount; i++) {
                    appendLink(i + 1);
                }
                if (_lCount > 0) {
                    appendEllipsis();
                }
            } else {
                for (i = 1; i < from; i++) {
                    appendLink(i);
                }
            }

            //连续部分
            for (i = from; i <= to; i++) {
                if (i === _index) {
                    appendLink(i, true);
                } else {
                    appendLink(i);
                }
            }

            //后
            if (to === beforeLast && _rCount > 0) {
                appendLink(_page);
            } else if (to < _page - _rCount) {
                if (_rCount > 0) {
                    appendEllipsis();
                }
                for (i = _page - _rCount; i < _page; i++) {
                    appendLink(i + 1);
                }
            } else {
                for (i = to; i < _page; i++) {
                    appendLink(i + 1);
                }
            }

            appendFirstAndLast();
        }
        function GetFromTo() {
            var from, to;
            from = _index - _lrcount;
            if (from <= 1) {
                return { from: 1, to: _continueCount };
            }
            if (_page - _index < _lrcount) {
                from = _page - _continueCount + 1;
                return { from: from, to: _page };
            }
            to = _index + _lrcount;
            to = to > _page ? _page : to;
            return { from: from, to: to };
        }
        function appendLink(index, active) {
            var jA = $("<a>", { text: index, href: _url + index });
            if (active) {
                jA.addClass("active");
            }
            if (_dftOpts.beforeRender) {
                _dftOpts.beforeRender(jA);
            }
            jPager.append(jA);
        }
        function appendFirstAndLast() {
            var jFirst = $("<a>", { text: _first });
            var jBefore = $("<a>", { text: _before });
            var jLast = $("<a>", { text: _last });
            var jNext = $("<a>", { text: _next });
            jPager.append(jNext).append(jLast);
            jBefore.insertBefore(jPager.find("a").first());
            jFirst.insertBefore(jBefore);
            if (_index === 1) {
                jFirst.addClass("disabled");
                jBefore.addClass("disabled");
            } else {
                jFirst.attr("href", _url + 1);
                jBefore.attr("href", _url + (_index - 1));
            }
            if (_index === _page) {
                jLast.addClass("disabled");
                jNext.addClass("disabled");
            } else {
                jLast.attr("href", _url + _page);
                jNext.attr("href", _url + (_index + 1));
            }
        }
        function appendEllipsis() {
            jPager.append(_ellipsis);
        }
        //event
        function regisiterEvent() {
            jPager.on("mouseenter", "a", function () {
                var jthis = $(this);
                if (!jthis.hasClass("active") && !jthis.hasClass("disabled")) {
                    jthis.addClass("hover");
                }
            }).on("mouseout", "a", function () {
                var jthis = $(this);
                if (!jthis.hasClass("active")) {
                    jthis.removeClass("hover");
                }
            }).on("click", "a", function () {
                var jItem = $(this);
                if (jItem.hasClass("disabled")) {
                    return;
                }
                var text = jItem.text();
                var index = 0;
                switch (text) {
                    case _first:
                        index = 1;
                        break;
                    case _before:
                        index = _index - 1;
                        break;
                    case _last:
                        index = _page;
                        break;
                    case _next:
                        index = _index + 1;
                        break;
                    default:
                        index = parseInt(text);
                        break;
                }
                var callback = _dftOpts.callback;
                var newOpts;
                _dftOpts.index = index;
                jPager.remove();
                if (callback) {
                    newOpts = callback(_dftOpts);
                }
                if (newOpts) {
                    _dftOpts = newOpts;
                }
                jthis.pagination(_dftOpts);
            });
        }
    }
})(window, $);