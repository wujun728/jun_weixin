var channel = "01";
var all_now;
var ruleList = {};
var endtimeArray = {};
$(function () {
    var pageType = getQueryString("pageType");
    if (pageType) switchActivityAndRule(pageType);


    $('.gotoTop').on('click', function () {
        $(window).scrollTop(0);
    });

    $('#showActivityBtn').on('click', function () {

        var $li = $(this).parent();
        var value = $li.attr("data-value");
        $("#swipertime").show();
        $("#activity").show();
        $("#rulePanel").hide();
        $li.addClass("active").siblings().removeClass("active");
    });
    $('#showRuleBtn').on('click', function () {
        var $li = $(this).parent();
        var value = $li.attr("data-value");
        $("#swipertime").hide();
        $("#rulePanel").show();
        $("#activity").hide();
        var $li = $(this).parent();
        $li.addClass("active").siblings().removeClass("active");
    });

    getSeckills();
});


var hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :    
    null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
    if (!document[hiddenProperty]) {    
    }else{
    	
    	getSeckills();
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);

function getSeckills(callback) {
    $(".swiper-wrapper").empty();
    req(_path + "/act/seckill/sklist", {
        type: "pc"
    }, function (d) {
        if (d.code == 1) {
            var list = d.list;
            all_now = new Date(d.now);
            var m = moment(d.now);
            var c = 0;
            var n = 0;
            var active_nav = "active-nav";
            var div = '';
            for (var i = 0; i < list.length; i++) {
                ruleList[list[i]._id] = list[i].rule;
                endtimeArray[list[i]._id] = list[i];
                var isIn = m.isBetween(list[i].start_time, list[i].end_time);
                if (isIn) {
                    c++;
                    if (n > 0) active_nav = "";
                    div += ' <div class="swiper-slide ' + active_nav + ' clearfix" id="' + list[i]._id + '"  data-id="' + list[i]._id + '" data-status="0" >' +
                        ' <div class="timeStr">' + moment(list[i].start_time).format('H:mm') + '</div>' +
                        ' <div class="statusBox">' +
                        ' <p class="statusStr">正在秒杀</p>' +
                        ' <p class="dateStr sck_active" >' + show_time(list[i].end_time, "结束", list[i]._id) + '</p>' +
                        ' </div>' +
                        ' </div>';
                    n++;

                    // $("#end_time").val(list[i].end_time)
                } else {
                    if (m.isBefore(list[i].start_time)) {
                        if (c == 0) {
                            div += ' <div class="swiper-slide active-nav clearfix" id="' + list[i]._id + '"   data-id="' + list[i]._id + '" data-status="1" >' +
                                '        <div class="timeStr">' + moment(list[i].start_time).format('H:mm') + '</div>' +
                                '        <div class="statusBox">' +
                                '            <p class="statusStr">距开始</p>' +
                                '            <p class="dateStr sck_active" >' + show_time(list[i].start_time, "开始", list[i]._id) + '</p>' +
                                '        </div>' +
                                '    </div>';
                            c++;
                            $("#end_time").val(list[i].end_time)
                        } else {
                            div += '<div class="swiper-slide clearfix" data-status="1"   data-id="' + list[i]._id + '">  ' +
                                '   <div class="timeStr">' + moment(list[i].start_time).format('H:mm') + '</div>' +
                                '		<div class="statusBox">' +
                                '		<p class="statusStr">' + moment(list[i].start_time).format('MM月DD') + '</p>' +
                                '		</div>' +
                                '	</div>';
                            //$("#end_time").val(list[i].end_time)
                        }
                    } else {
                        if (m.isAfter(list[i].end_time)) {
                            div += ' <div class="swiper-slide clearfix" data-id="' + list[i]._id + '" data-status="2" >' +
                                '        <div class="timeStr">' + moment(list[i].start_time).format('H:mm') + '</div>' +
                                '        <div class="statusBox">' +
                                '            <p class="statusStr">已结束</p>' +
                                '            <p class="dateStr">' + moment(list[i].start_time).format('MM月DD') + '</p>' +
                                '        </div>' +
                                '    </div>';
                            //$("#end_time").val(list[i].end_time)
                        }
                    }
                }

            }
            $(".swiper-wrapper").empty().append(div);
            initViewSwiper();
            var index = $(".swiper-wrapper").find(".active-nav").index();
            if (index == -1) { //不存在
                var len = $(".swiper-wrapper").find(".swiper-slide").length;
                if (len > 0) {
                    index = 0;
                    $(".swiper-wrapper").find(".swiper-slide").eq(0).addClass("active-nav");
                }
            }
            var id = $('.un-set-swiper .active-nav').attr("data-id");
            if (id == undefined || id == "" || id == null) {
                return;
            }
            setTimeout(function () {
                viewSwiper.slideTo(index, 1000, false);
            }, 200)
            getSKGifts(id);

            if (callback != undefined) callback();
        }
    })
}

/*更新秒杀信息*/
function updateSeckillInfo()
{
	
	
}

var issub = false;

function getSKGifts(sk_id) {
    if (issub) return;
    issub = true;
    $(".sk_ul").html("");
    req(_path + "/act/seckill/getGiftList", {
        id: sk_id
    }, function (d) {
        if (d.code == 1) {
            var list = d.list;
            var status = $(".swiper-wrapper").find(".active-nav").attr("data-status");
            for (var i = 0; i < list.length; i++) {
                var li = getli_html(list[i], status);
                $(".sk_ul").append(li);
            }

            $(".un-rule-blocks").empty().html(ruleList[sk_id]);

            setTimeout(function () {
                updateFooter();
                issub = false;
            }, 0);

        } else {
            //TODO
        }
    })
}


function getli_html(doc, status) {
    var btn_class = "un-goods-skill-btn disabled";
    if (status == "0") {
        if ((doc.count - doc.use_count) > 0) {
            btn_class = "un-goods-skill-btn";
        }
    }

    /*	<li class="un-goods-item">
	<img src="./assets/img/gift-demo.jpg" alt="" class="un-goods-img">
	<p class="un-goods-name">111小笨熊毛绒玩具泰迪熊公仔布娃娃玩偶1.6米抱抱熊大号送女友情人节生日圣诞节礼物 泰迪熊粉色 1米 送玫瑰花.......</p>
	<div class="un-goods-info">
		<div class="un-goods-left">
			<p class="un-goods-sale">现积分:<span>7900</span></p>
			<p class="un-goods-sale-old delLineBox">原积分:<span>13880</span></p>
		</div>
		<div class="un-goods-right">
			<a href="" class="un-goods-skill-btn"></a>
		</div>
	</div>
</li>*/

    var li = '<li class="un-goods-item"><a href="' + _view_path + '/seckill_pc/detail.html?id=' + doc._id + '">' +
        '<img src="' + doc.gift[0].g_pic[0] + '" alt="" class="un-goods-img"></a>' +
        '<p class="un-goods-name"><a href="' + _view_path + '/seckill_pc/detail.html?id=' + doc._id + '" style="text-decoration:  none;color: #340B0C;">' + doc.gift[0].g_name + '</a></p>' +
        '<div class="un-goods-info">' +
        '   <div class="un-goods-left">' +
        '        <p class="un-goods-sale">现积分:<span>' + doc.gift[0].g_seckill_price + '</span></p>' +
        '		 <p class="un-goods-sale-old delLineBox">原积分:<span>' + doc.gift[0].g_original_price + '</span></p>' +
        '    </div>' +
        '    <div class="un-goods-right">' +
        '        <a class="' + btn_class + '" href="' + _view_path + '/seckill_pc/detail.html?id=' + doc._id + '"></a>' +
        '    </div>' +
        '	</div></a>' +
        '</li>';
    return li;
}

function show_time(end_date, text, id) {
    all_now.setSeconds(all_now.getSeconds() + 1);
    var time_now, time_distance;
    var str_time = "";
    var int_day, int_hour, int_minute, int_second;
    var time_now = all_now;

    if (end_date.indexOf("-") != -1) {
        var time_end = new Date(end_date.split("-").join("/"));
        time_distance = time_end - time_now;
    } else {
        time_distance = 0;
    }

    if (time_distance > 0) {
        //  int_day=Math.floor(time_distance/86400000)  
        //  time_distance-=int_day*86400000;  
        int_hour = Math.floor(time_distance / 3600000)
        time_distance -= int_hour * 3600000;
        int_minute = Math.floor(time_distance / 60000)
        time_distance -= int_minute * 60000;
        int_second = Math.floor(time_distance / 1000)
        if (int_hour < 10)
            int_hour = "0" + int_hour;
        if (int_minute < 10)
            int_minute = "0" + int_minute;
        if (int_second < 10)
            int_second = "0" + int_second;
        //str_time=int_day+"天"+int_hour+"小时"+int_minute+"分钟"+int_second+"秒";  

        if (text == "开始") {
            if (int_hour == 0 && int_minute == 0 && int_second == 0) {
                str_time = "";
            } else {
                str_time = int_hour + ":" + int_minute + ":" + int_second;
            }
        } else {
            str_time = "距" + text + int_hour + ":" + int_minute + ":" + int_second;
        }
        if (id != undefined && id != null) {
            $("#" + id).find(".sck_active").text(str_time);
        }
        //clearTimeout(t);
        t = setTimeout("show_time('" + end_date + "','" + text + "','" + id + "')", 1000);
    } else {
        //clearTimeout(t)
        if (text == "结束") {
            //$("#"+id).find(".sck_active").prev().text("已结束");
            $("#" + id).find("p").eq(0).text("已结束");
            $("#" + id).find(".sck_active").text(moment(end_date).format('MM月DD'))
            $("#" + id).attr("data-status", "2");
            $("#" + id).find("div").css("color", "#b1b1b1");
            if ($("#" + id).hasClass("active-nav")) {
            	 $(".un-goods-right").find("a").addClass("disabled");
                // $(".un-goods-left").removeClass("un-goods-left").addClass("un-goods-end-left");
                //$(".un-goods-end-left").find("div").hide();
                //$(".un-goods-right").find("p").text("已结束");
                //$(".un-goods-right").find("p").removeClass("un-goods-skill-btn").addClass("disabled");
            }
            var _index = viewSwiper.activeIndex < viewSwiper.slides.length ? viewSwiper.activeIndex + 1 : -1;
            if (_index > -1) {
                /*setTimeout(function(){
	     		window.location.href=window.location.href;
	     	  },500);*/

//                getSeckills(function () {
//                    gotoSlide(_index, false);
//                });
            }

        } else if (text == "开始") {
            $("#" + id).find("p").eq(0).text("正在秒杀");
            $("#" + id).attr("data-status", "0");
            //var next_end_time = $("#end_time").val();
            var next_end_time = endtimeArray[id].end_time;
            if ($("#" + id).hasClass("active-nav")) {
                $(".un-goods-right").find("a").removeClass("disabled");
            }
            show_time(next_end_time, "结束", id)
        }
    }
    return str_time;
}

function initViewSwiper() {
    // 秒杀滚动条
    viewSwiper = new Swiper('.un-set-swiper', {
        width: 271,
        spaceBetween: 0,
    })

    $('.un-arrow-left').on('click', function (e) {
        e.preventDefault()
        viewSwiper.slidePrev()
    })
    $('.un-arrow-right').on('click', function (e) {
            e.preventDefault()
            viewSwiper.slideNext()
        })
        // 点击时间段事件
    viewSwiper.on('tap', function (swiper) {
        //        $('.un-set-swiper .active-nav').removeClass('active-nav')
        //        var activeNav = $('.un-set-swiper .swiper-slide').eq(swiper.clickedIndex).addClass('active-nav')
        //        var id =  $('.un-set-swiper .active-nav').attr("data-id");
        //        if(id == undefined || id == "" || id == null) {
        //        	  return;	
        //        }
        //        
        //        $(".fixBtnGroup ul").find("li").removeClass("active").eq(0).addClass("active")
        //        $("#swipertime").show();
        //        $("#activity").show();
        //		$("#rulePanel").hide();
        //		getSKGifts(id);
    	console.log("tap")
        gotoSlide(swiper.clickedIndex, true);
    })

}

function gotoSlide(index, isGetGifts) {
console.log("index " + index);
    if (index == -1) {
        return;
    }
    $('.un-set-swiper .active-nav').removeClass('active-nav')
    var activeNav = $('.un-set-swiper .swiper-slide').eq(index).addClass('active-nav')
    var id = $('.un-set-swiper .active-nav').attr("data-id");
    
    console.log("id " + id);
    if (id == undefined || id == "" || id == null) {
        return;
    }

    $(".fixBtnGroup ul").find("li").removeClass("active").eq(0).addClass("active")
    $("#swipertime").show();
    $("#activity").show();
    $("#rulePanel").hide();
    if (isGetGifts) getSKGifts(id);
}


//取url后面的参数 
function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    //切换活动或规则

function switchActivityAndRule(type) {
        var type = arguments[0] ? arguments[0] : "activity";
        var $li;
        if (type == "activity") {
            $("#swipertime").show();
            $("#activity").show();
            $("#rulePanel").hide();
            $li = $('#showActivityBtn').parent();
        } else if (type = "rule") {
            $("#rulePanel").show();
            $("#activity").hide();
            $("#swipertime").hide();
            $li = $('#showRuleBtn').parent();
        }
        $li.addClass("active").siblings().removeClass("active");
    }
    /*取文档内容实际高度*/

function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    //每次更新list时，调用此方法

function updateFooter() {
    var $footer = $(".un-footer");
    if (getScrollHeight() > $(window).height()) {
        $footer.removeClass("fixed");
    } else {
        $footer.addClass("fixed");
    }
}