/*! layer mobile-v1.6 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
; !function (a) { "use strict"; var b = ""; b = b ? b : document.scripts[document.scripts.length - 1].src.match(/[\s\S]*\//)[0]; var c = document, d = "querySelectorAll", e = "getElementsByClassName", f = function (a) { return c[d](a) }; var g = { type: 0, shade: !0, shadeClose: !0, fixed: !0, anim: !0 }; a.ready = { extend: function (a) { var b = JSON.parse(JSON.stringify(g)); for (var c in a) b[c] = a[c]; return b }, timer: {}, end: {} }, ready.touch = function (a, b) { var c; a.addEventListener("touchmove", function () { c = !0 }, !1), a.addEventListener("touchend", function (a) { a.preventDefault(), c || b.call(this, a), c = !1 }, !1) }; var h = 0, i = ["layermbox"], j = function (a) { var b = this; b.config = ready.extend(a), b.view() }; j.prototype.view = function () { var a = this, b = a.config, d = c.createElement("div"); a.id = d.id = i[0] + h, d.setAttribute("class", i[0] + " " + i[0] + (b.type || 0)), d.setAttribute("index", h); var g = function () { var a = "object" == typeof b.title; return b.title ? '<h3 style="' + (a ? b.title[1] : "") + '">' + (a ? b.title[0] : b.title) + '</h3><button class="layermend"></button>' : "" }(), j = function () { var a, c = (b.btn || []).length; return 0 !== c && b.btn ? (a = '<span type="1">' + b.btn[0] + "</span>", 2 === c && (a = '<span type="0">' + b.btn[1] + "</span>" + a), '<div class="layermbtn">' + a + "</div>") : "" }(); if (b.fixed || (b.top = b.hasOwnProperty("top") ? b.top : 100, b.style = b.style || "", b.style += " top:" + (c.body.scrollTop + b.top) + "px"), 2 === b.type && (b.content = '<i></i><i class="laymloadtwo"></i><i></i><div>' + (b.content || "") + "</div>"), d.innerHTML = (b.shade ? "<div " + ("string" == typeof b.shade ? 'style="' + b.shade + '"' : "") + ' class="laymshade"></div>' : "") + '<div class="layermmain" ' + (b.fixed ? "" : 'style="position:static;"') + '><div class="section"><div class="layermchild ' + (b.className ? b.className : "") + " " + (b.type || b.shade ? "" : "layermborder ") + (b.anim ? "layermanim" : "") + '" ' + (b.style ? 'style="' + b.style + '"' : "") + ">" + g + '<div class="layermcont">' + b.content + "</div>" + j + "</div></div></div>", !b.type || 2 === b.type) { var l = c[e](i[0] + b.type), m = l.length; m >= 1 && k.close(l[0].getAttribute("index")) } document.body.appendChild(d); var n = a.elem = f("#" + a.id)[0]; b.success && b.success(n), a.index = h++, a.action(b, n) }, j.prototype.action = function (a, b) { var c = this; if (a.time && (ready.timer[c.index] = setTimeout(function () { k.close(c.index) }, 1e3 * a.time)), a.title) { var d = b[e]("layermend")[0], f = function () { a.cancel && a.cancel(), k.close(c.index) }; ready.touch(d, f), d.onclick = f } var g = function () { var b = this.getAttribute("type"); 0 == b ? (a.no && a.no(), k.close(c.index)) : a.yes ? a.yes(c.index) : k.close(c.index) }; if (a.btn) for (var h = b[e]("layermbtn")[0].children, i = h.length, j = 0; i > j; j++) ready.touch(h[j], g), h[j].onclick = g; if (a.shade && a.shadeClose) { var l = b[e]("laymshade")[0]; ready.touch(l, function () { k.close(c.index, a.end) }), l.onclick = function () { k.close(c.index, a.end) } } a.end && (ready.end[c.index] = a.end) }; var k = { v: "1.6", index: h, open: function (a) { var b = new j(a || {}); return b.index }, close: function (a) { var b = f("#" + i[0] + a)[0]; b && (b.innerHTML = "", c.body.removeChild(b), clearTimeout(ready.timer[a]), delete ready.timer[a], "function" == typeof ready.end[a] && ready.end[a](), delete ready.end[a]) }, closeAll: function () { for (var a = c[e](i[0]), b = 0, d = a.length; d > b; b++) k.close(0 | a[0].getAttribute("index")) } }; "function" == typeof define ? define(function () { return k }) : a.layer = k }(window);
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function () { function a(a) { return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y) } function b(a) { return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'" } function c(c, d) { function e(a) { return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a } function f(b) { var c = m; if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function () { return m++, "$line=" + m + ";" })), 0 === b.indexOf("=")) { var e = l && !/^=[=#]/.test(b); if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) { var f = b.replace(/\s*\([^\)]+\)/, ""); n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")") } else b = "$string(" + b + ")"; b = s[1] + b + s[2] } return g && (b = "$line=" + c + ";" + b), r(a(b), function (a) { if (a && !p[a]) { var b; b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0 } }), b + "\n" } var g = d.debug, h = d.openTag, i = d.closeTag, j = d.parser, k = d.compress, l = d.escape, m = 1, p = { $data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 }, q = "".trim, s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], t = q ? "$out+=text;return $out;" : "$out.push(text);", u = "function(){var text=''.concat.apply('',arguments);" + t + "}", v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}", w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""), x = s[0], y = "return new String(" + s[3] + ");"; r(c.split(h), function (a) { a = a.split(i); var b = a[0], c = a[1]; 1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c))) }); var z = w + x + y; g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}"); try { var A = new Function("$data", "$filename", z); return A.prototype = n, A } catch (B) { throw B.temp = "function anonymous($data,$filename) {" + z + "}", B } } var d = function (a, b) { return "string" == typeof b ? q(b, { filename: a }) : g(a, b) }; d.version = "3.0.0", d.config = function (a, b) { e[a] = b }; var e = d.defaults = { openTag: "<%", closeTag: "%>", escape: !0, cache: !0, compress: !1, parser: null }, f = d.cache = {}; d.render = function (a, b) { return q(a, b) }; var g = d.renderFile = function (a, b) { var c = d.get(a) || p({ filename: a, name: "Render Error", message: "Template not found" }); return b ? c(b) : c }; d.get = function (a) { var b; if (f[a]) b = f[a]; else if ("object" == typeof document) { var c = document.getElementById(a); if (c) { var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, ""); b = q(d, { filename: a }) } } return b }; var h = function (a, b) { return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a }, i = { "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;" }, j = function (a) { return i[a] }, k = function (a) { return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j) }, l = Array.isArray || function (a) { return "[object Array]" === {}.toString.call(a) }, m = function (a, b) { var c, d; if (l(a)) for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a); else for (c in a) b.call(a, a[c], c) }, n = d.utils = { $helpers: {}, $include: g, $string: h, $escape: k, $each: m }; d.helper = function (a, b) { o[a] = b }; var o = d.helpers = n.$helpers; d.onerror = function (a) { var b = "Template Error\n\n"; for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n"; "object" == typeof console && console.error(b) }; var p = function (a) { return d.onerror(a), function () { return "{Template Error}" } }, q = d.compile = function (a, b) { function d(c) { try { return new i(c, h) + "" } catch (d) { return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c)) } } b = b || {}; for (var g in e) void 0 === b[g] && (b[g] = e[g]); var h = b.filename; try { var i = c(a, b) } catch (j) { return j.filename = h || "anonymous", j.name = "Syntax Error", p(j) } return d.prototype = i.prototype, d.toString = function () { return i.toString() }, h && b.cache && (f[h] = d), d }, r = n.$each, s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, u = /[^\w$]+/g, v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), w = /^\d[^,]*|,\d[^,]*/g, x = /^,+|,+$/g, y = /^$|,+/; e.openTag = "{{", e.closeTag = "}}"; var z = function (a, b) { var c = b.split(":"), d = c.shift(), e = c.join(":") || ""; return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")" }; e.parser = function (a) { a = a.replace(/^\s/, ""); var b = a.split(" "), c = b.shift(), e = b.join(" "); switch (c) { case "if": a = "if(" + e + "){"; break; case "else": b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{"; break; case "/if": a = "}"; break; case "each": var f = b[0] || "$data", g = b[1] || "as", h = b[2] || "$value", i = b[3] || "$index", j = h + "," + i; "as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){"; break; case "/each": a = "});"; break; case "echo": a = "print(" + e + ");"; break; case "print": case "include": a = c + "(" + b.join(",") + ");"; break; default: if (/^\s*\|\s*[\w\$]/.test(e)) { var k = !0; 0 === a.indexOf("#") && (a = a.substr(1), k = !1); for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) o = z(o, m[l]); a = (k ? "=" : "=#") + o } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a } return a }, "function" == typeof define ? define(function () { return d }) : "undefined" != typeof exports ? module.exports = d : this.template = d }();

/**
 * Zepto swipeSlide Plugin
 * 西门 http://ons.me/500.html
 * 20150130 v2.2.1
 */
!function (a) { "use strict"; a.fn.swipeSlide = function (b, c) { function B(a, b) { a.css({ "-webkit-transition": "all " + b + "s " + w.transitionType, transition: "all " + b + "s " + w.transitionType }) } function C(a, b) { w.axisX ? a.css({ "-webkit-transform": "translate3d(" + b + "px,0,0)", transform: "translate3d(" + b + "px,0,0)" }) : a.css({ "-webkit-transform": "translate3d(0," + b + "px,0)", transform: "translate3d(0," + b + "px,0)" }) } function D(a) { var b, c; w.lazyLoad && (b = w.ul.children(), c = b.eq(a).find("[data-src]"), c && (c.is("img") ? (c.attr("src", c.data("src")), c.removeAttr("data-src")) : (c.css({ "background-image": "url(" + c.data("src") + ")" }), c.removeAttr("data-src")))) } function E(a) { v.touch && !a.touches && (a.touches = a.originalEvent.touches) } function F(a) { e = v.touch ? a.touches[0].pageX : a.pageX || a.clientX, f = v.touch ? a.touches[0].pageY : a.pageY || a.clientY } function G(a) { if (a.preventDefault ? a.preventDefault() : a.returnValue = !1, w.autoSwipe && clearInterval(n), r = !1, l = v.touch ? a.touches[0].pageX : a.pageX || a.clientX, m = v.touch ? a.touches[0].pageY : a.pageY || a.clientY, g = i = l - e, h = j = m - f, B(w.ul, 0), w.axisX) { if (!w.continuousScroll) { if (0 == d && i > 0) return i = 0, M(); if (d + 1 >= z && 0 > i) return i = 0, M() } C(w.ul, -(x * parseInt(d) - i)) } else { if (!w.continuousScroll) { if (0 == d && j > 0) return j = 0, M(); if (d + 1 >= z && 0 > j) return j = 0, M() } C(w.ul, -(y * parseInt(d) - j)) } } function H() { k = w.axisX ? i : j, Math.abs(g) < 5 && (r = !0), setTimeout(function () { r = !0 }, 100), Math.abs(k) <= o ? I(.3) : k > o ? (L(), M()) : -o > k && (K(), M()), g = i = 0, h = j = 0 } function I(a) { B(w.ul, a), w.axisX ? C(w.ul, -d * x) : C(w.ul, -d * y) } function J() { w.continuousScroll ? d >= z ? (I(.3), d = 0, setTimeout(function () { I(0) }, 300)) : 0 > d ? (I(.3), d = z - 1, setTimeout(function () { I(0) }, 300)) : I(.3) : (d >= z ? d = 0 : 0 > d && (d = z - 1), I(.3)), c(d) } function K() { d++, J(), w.lazyLoad && (w.continuousScroll ? D(d + 2) : D(d + 1)) } function L() { if (d--, J(), q && w.lazyLoad) { var a = z - 1; for (a; z + 1 >= a; a++) D(a); return q = !1, void 0 } !q && w.lazyLoad && D(d) } function M() { w.autoSwipe && (n = setInterval(function () { K() }, w.speed)) } var n, A, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, o = 50, p = 0, q = !0, r = !0, s = a(this), t = { ie10: window.navigator.msPointerEnabled, ie11: window.navigator.pointerEnabled }, u = ["touchstart", "touchmove", "touchend"], v = { touch: window.Modernizr && Modernizr.touch === !0 || function () { return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) }() }, w = a.extend({}, { ul: s.children("ul"), li: s.children().children("li"), continuousScroll: !1, autoSwipe: !0, speed: 4e3, axisX: !0, transitionType: "ease", lazyLoad: !1 }, b || {}), x = w.li.width(), y = w.li.height(), z = w.li.length; c = c || function () { }, t.ie10 && (u = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), t.ie11 && (u = ["pointerdown", "pointermove", "pointerup"]), A = { touchStart: u[0], touchMove: u[1], touchEnd: u[2] }, function () { var b, e; if (1 >= z) return D(0), !1; if (w.continuousScroll && (w.ul.prepend(w.li.last().clone()).append(w.li.first().clone()), w.axisX ? (C(w.ul.children().first(), -1 * x), C(w.ul.children().last(), x * z)) : (C(w.ul.children().first(), -1 * y), C(w.ul.children().last(), y * z))), w.lazyLoad) for (b = 0, p = w.continuousScroll ? 3 : 2, b; p > b; b++) D(b); (t.ie10 || t.ie11) && (e = "", e = w.axisX ? "pan-y" : "none", s.css({ "-ms-touch-action": e, "touch-action": e })), w.axisX ? w.li.each(function (b) { C(a(this), x * b) }) : w.li.each(function (b) { C(a(this), y * b) }), M(), c(d), s.on("click", function () { return r }), s.on(A.touchStart, function (a) { E(a), F(a) }), s.on(A.touchMove, function (a) { E(a), G(a) }), s.on(A.touchEnd, function () { H() }) }() } }(window.Zepto || window.jQuery);



/*禁用ios弹性滚动*/
function BlockMove(event) {
    event.preventDefault();
}


/*菜单浮动*/
$.fn.smartFloat = function () {
    var position = function (element) {
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function () {
            var scrolls = $(window).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 0
                    });
                } else {
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: pos,
                    top: top
                });
            }
        });
    };
    return $(this).each(function () {
        position($(this));
    });
};

/*页面调转前等待*/
/*layer.closeAll();
$(document).on("click", "a", function () {
    if ($(this).attr("href") != "#" && $(this).attr("href") != "" && $(this).attr("href").indexOf("javascript") == -1 && $(this).attr("href").indexOf("tel") == -1) {
        layer.open({ type: 2, shadeClose: false });
    }
});*/
/*批量获取价格*/
//var ppids = ""/*默认是浏览记录*/
//var priceCallback = ""/*成功获取价格后回调*/
//$(function () {
//  $(".now-price").each(function () {
//      ppids += $(this).attr("ppid") + ",";
//  });
//  if (ppids != "") {
//      $.ajax({
//          url: "http://price.ch999img.com/DataAPI.ashx", data: { act: "g-price-bat", "ppid": ppids, "pid": Cookie.Get("pidc"), "zid": Cookie.Get("zidc"), "did": Cookie.Get("didc") }, success: function (rsp) {
//              priceCallback && priceCallback(rsp);
//              $(".now-price").each(function () {
//                  var ppid = $(this).attr("ppid");
//                  for (var j = 0; j < rsp.length; j++) {
//                      if (ppid == rsp[j].ppid) {
//                          if ($(this).attr("tofixed") == 0) {
//                              $(this).html("￥" + parseInt(rsp[j].price));
//                          } else {
//                              $(this).html("￥" + parseFloat(rsp[j].price).toFixed(2));
//                          }
//                      }
//                  }
//              });
//          }, dataType: "jsonp"
//      });
//  }
//});
//Root em
function rootEm() {
    var cw = $(window).width();
    cw = cw / 16;
    //计算倍数，数值可变。
    if (cw < 20) { cw = 20 } //最小宽度
    if (cw > 40) { cw = 40 } //最大宽度
    $("html").css({fontSize:cw + 'px'});
};
rootEm();
$(window).resize(function () { rootEm(); });
