// Copyright 2013 Tr0j4n. All rights reserved.
Tr = {
    init: function() {
        Tr.ajaxFinishBind();
    },
    ajaxFinishBind: function() { //call after Ajax returned
        $(document).ajaxSuccess(function(event, XMLHttpRequest, ajaxOptions) {
            var data = $.parseJSON(XMLHttpRequest.responseText);
            if (data.code == 400) {
                alert('提交参数有误, 请联系管理员!' + data.msg);
            } else if (data.code == 401) {
                alert('非法认证请求, 请重新登录!');
                window.top.location.replace(data.msg);
            } else if (data.code == 561) {
            	alert('会话已过期, 请重新登录!');
                document.location.replace(data.msg);
            } else if (data.code == 500) {
            	alert('操作失败, 请稍后再试，若问题依旧请联系【管理员】解决!');
            } else if (data.code == 503) {
                alert('系统繁忙, 请稍后再试，若问题依旧请联系客服解决!');
            } else if (data.code == 8002) {
                alert('该功能需要开通会员后才可以使用喔~ ');
                // Tr.stimulate();
            }
            $('#tr_loading_mask').hide();
        });
        $(document).ajaxError(function(event, XMLHttpRequest, ajaxOptions, thrownError) {
            if (XMLHttpRequest.status == 403) {
                alert('拒绝访问！如果您之前登录过其他账号，需要退出重新登录！');
            }else if (XMLHttpRequest.status == 404) {
                alert('网络连接不通或访问地址不存在!');
            } else if (XMLHttpRequest.status == 500) {
                alert('操作失败, 请联系【管理员】解决!');
            }
            $('#tr_loading_mask').hide();
        });
    },
    ajax: function(url, data, success, type) {
        //tr_juhua
        Tr.popup('tr_loading_mask');
        // filter params
        for(var key in data){
            if(data[key] && data[key].constructor == String){
                data[key] = $.trim(data[key]);
            }
        }
        var currAjax = $.ajax({
            type: type,
            url: url,
            data: $.extend({__ts: new Date().getTime()}, data),
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                success(data);
            },
            traditional: true,
            timeout:20000,
            complete: function(XMLHttpRequest,status){
                if(status=='timeout'){
                    currAjax.abort();
                    alert('网络超时');
                }
                $('#tr_loading_mask').hide();
            }
        });
    },
    get: function(url, data, success) {
    	Tr.ajax(url, data, success, 'GET');
    
    },
    post: function(url, data, success) {
        var token = $('#authenticityToken input').val();
        
        if (token) {
            data = $.extend({authenticityToken: token}, data);
        }
        Tr.ajax(url, data, success, 'POST');
    },
    popup: function(wrapper_id){
        $('#'+wrapper_id).height($(document).height()).width($(document).width()).show();
    }
};
Tr.init();

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

(function($) {
    $.fn.trForm = function(options) {
        var defaultsOpts = {
            validate: function(){
                return true;
            },
            get:false,
            exparams:{},
            exvals:{},
            callback_run: true,
            callback: function(data) {
                return false;
            }
        }, log = function(str) {
            if(window.console) console.log(str);
        };
        var opts = $.extend(defaultsOpts, options);
        this.each(function(){
            var $formEle = $(this), actionUrl = $formEle.attr('tr-url');
            if (actionUrl == undefined) return true;
            var $valControls = $formEle.find('.trControl'),$submitBtn = $formEle.find('.trSubmit');
            if($valControls.length==0 || $submitBtn.length==0){
                log('没有可提交的参数或者按钮');
                return true;
            }
            function getParams(){
                var ps = {};
                $.each($valControls, function(i, n) {
                    var $n = $(n);
                    if ($n.attr('tr-param') == undefined || $n.attr('tr-param') == '') {
                        log($n);
                        log('绑定不完全,略过');
                        return true;
                    }
                    ps[$n.attr('tr-param')] = $.trim($n.attr('value') != undefined ? $n.val() : $n.text());
                });
                return ps;
            }

            //提交按钮
            $submitBtn.click(function(){
                var params = getParams();
                if(!defaultsOpts.validate()) return;
                $.each(defaultsOpts.exvals,function(k,v){
                    params[k] = eval(v);
                });
                if(!defaultsOpts.get){
                    Tr.post(actionUrl, params, function(data){
                        opts.callback(data);
                    });
                }
                else{
                     Tr.get(actionUrl, params, function(data){
                        opts.callback(data);
                    });                   
                }

            });

        });
    };

})(jQuery);

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));
