$(function(){
	initActList();
	initAdList();
	initEvt();
	getUserScore();
	
	  
	window.onpageshow = function(event) {
		if(event.persisted) { window.location.reload(); }
	};
});

var hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :    
    null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
    if (!document[hiddenProperty]) {    
    }else{
    	initActList();
    	initAdList();
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);


var channel = '02';
var ruleList = {};
function initEvt(){
	// 选择活动
	$("#actList").on("click", "li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		// var index = $(this).index();
		// $("#tabContent .tabBody").eq(index).show().siblings().hide();
		loadGifts( $(this).attr('data-id') );
	});
	
	$('html,body').animate({ scrollTop: '0px' }, 200);
	
	//规则按钮
	$("#ruleBtn").click(function() {
		$("#dialog_rule").removeClass('moveOut').addClass('moveIn');
		return false;
	});
	//关闭按钮
	$(".closeBtn").click(function() {
		$(this).parents(".pageSlider").removeClass('moveIn').addClass('moveOut');
	});

	
	$('#tabContent').on('click', '.giftList li', function(){
		$("#dialog_rule").removeClass('moveOut');
		var id = $(this).attr('data-gid');
		if(id != ''){
			$("#dialog_rule").removeClass('moveOut');
			
			if(isWeiXin()){
				window.location.href="https://m.jf.10010.com/jf-auth/wx/auth/authorize?state=https://m.jf.10010.com/wx001/jf-pf-view/seckill_mobile/product.html?id=" + id;
			}else{
				location.href = view_path + '/seckill_mobile/product.html?id=' + id;
			}
		}
	});
}

function getUserScore(){
	
	/*var userScoreUrl = _path + '/act/seckill/getUserPoint';
	req(userScoreUrl, {}, function(d){
		if(d != ''){ $('#userScore').html(d + '积分'); }
	});*/
}

function initAdList(){
	var adUrl = _path + '/act/seckill/getAdList';
	req(adUrl, {type : 'phone'}, function(d){
		if(d.code == '1'){
			var fpath = d.fileServer;
			var str = '';
			if(d.list && d.list.length > 0){
				$.each(d.list, function(idx, item){
					str += '<div class="swiper-slide" data-actname="' + item.name + '"  onclick="$(\'#dialog_rule\').removeClass(\'moveOut\');location.href=\'' + item.link + '\'" style="background-image: url(' + (fpath + item.pic) + ');"></div>';
				})
				$('.swiper-wrapper').html(str);
				initSwiper();
			}else{ $('.swiper-container').hide(); }
		}else{ showPrompt('数据请求错误'); }
	});
}

function initActList(){
	var actUrl = _path + '/act/seckill/sklist';
	$('#tabContent').html("");
	req(actUrl, {type : 'phone'}, function(d){
		if(d.code == '1'){
			var now = d.now;
			if(intervalList != null){ clearInterval(intervalList); }
			var str = '';
			var m = moment(now);
			var tab_body = '';
			var hasChangci=0;
			
			if(d.list && d.list.length > 0){
				$.each(d.list, function(idx, item){
					var isIn = m.isBetween(item.start_time, item.end_time);
					var txt = '', timeStatus = 0;
					if(isIn){ txt = '正在秒杀'; timeStatus = 1; hasChangci++;}else{
						if(m.isBefore(item.start_time)){ txt = '未开始'; timeStatus = 0; hasChangci++;}
						else{ if(m.isAfter(item.end_time)){ txt = '已结束'; timeStatus = 2; } }
					}
					str += '<li data-start="' + item.start_time + '" data-end="' + item.end_time + '" data-id="' + (item._id) + '" class="flexItem ' + (timeStatus == 2 ? 'disabled' : '') + '" data-status="' + timeStatus + '"><div class="vCenter clearfix">'+
					'<div class="timeStr font-bold font60 left">'+moment(item.start_time).format('HH:mm')+'</div><div class="status left font24">'+
					'<p class="statusp">'+(timeStatus==1?txt:moment(item.start_time).format('MM月DD日'))+'</p>'+
					'<p class="djs"></p></div></div></li>';
					ruleList[item._id] = item.rule || '';
					tab_body += '<div class="tabBody"><ul class="list giftList"></ul></div>';
				});
				$('#actList').html(str);
				$('#tabContent').html(tab_body);
				$("#scrollbar").on("touchmove", function(e) { e.preventDefault(); });

				
				//tab滚动条
				$("#scrollbar").niceScroll({
					cursorcolor: "rgba(0,0,0,0.3)",
					cursorwidth: "5px",
					cursorborder: "",
					hwacceleration: true, // 激活硬件加速
					cursordragontouch: true, // 使用触屏模式来实现拖拽
				});
				setTimeout(function(){
					var $liActive = $("#actList li.active");
					$("#scrollbar").scrollLeft($liActive.index() * $liActive.width());
				},0);
				
				var currentId = '';
				var actIng = $('#actList li[data-status="1"]');
				var actPass = $('#actList li[data-status="2"]');
				var actWait = $('#actList li[data-status="0"]');
				
				if(actIng.length > 0){ currentId = actIng.eq(0).attr('data-id'); }
				else{
					if(actWait.length > 0){ currentId = actWait.eq(0).attr('data-id'); }
					else{ currentId = actPass.eq(actPass.length - 1).attr('data-id'); }
				}
				
				//var w = $('li[data-id="' + currentId + '"]').width();
				var idxx = $('#actList li').index($('li[data-id="' + currentId + '"]'));
				/*$("#scrollbar").getNiceScroll(0).doScrollLeft((idxx * w), 1);*/
				var timeStatus = $('li[data-id="' + currentId + '"]').attr("data-status");
				//if(timeStatus!=2){
					$('li[data-id="' + currentId + '"]').click();
				//}
				$('#ruleList').html(ruleList[currentId]);
				
				intervalList = setInterval(function(){
					m.add(1, 'seconds');
					$('#actList li').each(function(idx, item){
						var status = $(item).attr('data-status');
						if('1' == status){
							var end = $(item).attr('data-end');
							var diff = moment(end).diff(m, 'second');
							if(diff <= 0){ 
								$(item).attr('data-status', 2); 
								$(item).find(".statusp").html(moment($(item).attr('data-start_time')).format('MM月DD日'));
								$(item).find(".status p.djs").html("已结束");
							}else{
								$(item).find(".statusp").html("正在秒杀");
								$(item).find(".status p.djs").html("距结束 "+countDown(m, $(item)));
							}
						}else if('0' == status){
							var start = $(item).attr('data-start');
							var diff = moment(start).diff(m, 'second');
							if(diff <= 0){ 
								$(item).attr('data-status', 1); 
								$(item).find(".status p.djs").html("正在秒杀");
							}else{
								$(item).find(".status p.djs").html("距开始 "+countDown(m, $(item)));
							}
						}else if('2' == status){
							$(item).find(".status p.djs").html("已结束");
						}
					});
				}, 1000);
			}else{
				$("#dialog_rule").removeClass('moveOut');
				//location.href = _view_path + '/seckill_mobile/empty.html';
			}
			if(hasChangci==0){
				$("#dialog_warning").removeClass('moveOut').addClass('moveIn');
			}else{
				$("#dialog_warning").removeClass('moveIn');
			}
		}else{ showPrompt('数据请求错误'); }
	});
}

var currentSelKey = '_c_c_k';
var intervalPage = null, intervalList = null;

function loadGifts(clickId){
	
	var giftUrl = _path + '/act/seckill/getGiftList';
	var id = clickId || $('#actList li.flexItem[data-status="1"]').attr('data-id');
	var index = $(".flexItem.active").index();
	$('.giftList').eq(index).empty();
	var target = $('li[data-id="' + id + '"]');
	if(target.length > 0){
		$('#ruleList').html(ruleList[id]);
		req(giftUrl, {id : id}, function(d){
			if(d.code == '1'){
				var m = moment(d.now);
				countDown(m, target);
				// console.info($('[data-id="' + clickId + '"]').attr('data-status'))
				if(intervalPage != null){ clearInterval(intervalPage); }
				intervalPage = setInterval(function(){ countDown(m, target); }, 1000);
				var str = '';
				$.each(d.list, function(idx, item){
					var stockText = '立即秒杀';
					var isEnd = '';
					var over = (item.use_count == item.count && item.count != 0);
					var thatStatus = $('[data-id="' + clickId + '"]').attr('data-status');
					var timeOver = thatStatus == '2';
					if(timeOver){ stockText = '已结束'; }
					else if(thatStatus == '0'){ stockText = '未开始'; }
					else if(over){ stockText = '已抢光'; }
					
					var percent = item.use_count == 0 ? 0 : (item.use_count - item.count == 0) ? 100 : toPercent( item.use_count, item.count );					
					var stokeProgress =  '<div class="progress-info-box"><span class="font18 stockNum">已秒杀' + percent + '%</span>'+
							'<div class="progress progress-striped active myProcessbar" data-value="' + percent + '" data-init="true"><div class="progressBg">'+
							'<div class="progress-bar progress-bar-info probar" style="width: ' + percent + '%;"></div></div></div></div>';
					
					str += '<li data-gid="' + item._id + '"><div class="pic" style="background-image: url(' + item.gift[0].photoB + ');"></div><div class="info position-relative">'+
						'<p class="font30 proName">' + item.gift[0].g_name + '</p>'+
						'<div class="pos-bottom">'+
						'<p class="font20 curPrice">现积分:<span class="font42 font-bold">' + item.gift[0].g_seckill_price + '</span>&nbsp;积分</p>'+
						'<p class="del-line font24 oldPrice">原积分:' + item.gift[0].g_original_price + '</p></div>'+
						stokeProgress +
						'<div class="' + (over || timeOver ? 'disabled' : 'redirect') + ' seckill-btn font28" data-gid="' + item.gid + '">' + stockText + '</div>'+
						'</div></li>';
				})
				$('.giftList').eq(index).html(str);
				
				initProcessbar();
			}else{ showPrompt('数据请求错误'); }
		});
	}else{ showPrompt('活动不存在，请刷新页面'); }
}

function countDown(now, target){
	var status = target.attr('data-status'), str = '', hh = '', mm = '', ss = '';
	//now.add(1, 'seconds');
	if('1' == status){
		var end = $(target).attr('data-end');
		var diff = moment(end).diff(now, 'second');
		if(diff == 0){ 
			//refreshGift(status); 
		}
		
        hh = Math.floor(diff / 3600);
        mm = Math.floor((diff - (hh * 3600)) / 60 );
        ss = Math.floor(diff % 60);
	}else if('0' == status){
		var start = $(target).attr('data-start');
		var mstart = moment(start);
		var diff = moment(mstart).diff(now, 'second');
		if(diff == 0){ refreshGift(status); }
		
        hh = Math.floor(diff / 3600);
        mm = Math.floor((diff - (hh * 3600)) / 60 );
        ss = Math.floor(diff % 60);
	}
	
	hh = (hh+'').length == 1 ? '0' + hh : hh;
	mm = (mm+'').length == 1 ? '0' + mm : mm;
	ss = (ss+'').length == 1 ? '0' + ss : ss;
	return hh+":"+mm+":"+ss
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

function refreshGift(timeType){
	if(timeType == '1'){
		$('.seckill-btn').addClass('disabled').text('已结束').next('div').remove();
	}else if(timeType == '0'){
		$('.seckill-btn').text('立即秒杀');
	}
}

function showPrompt(msg) {
	$('.prompt').remove();
	var $div = $('<div class="prompt font32">' + msg + '</div>');
	$("body").append($div);
	$div.fadeIn();
	setTimeout(function() {
		$div.fadeOut(50000, function() {
			$div.remove();
		});
	}, 2000);
}

function toPercent(use_count, count){
	//var point = 1 - (use_count / count);
	var point = use_count / count;
    var str = Number(point*100).toFixed(1);
    return str;
}


function initSwiper() {
	$(".swiper-container").each(function(i, item) {
		if($(this).attr("data-init") != true) {

			new Swiper($(item), {
				direction: 'horizontal',
				loop: true,
				autoplay: 5000,
				autoplayDisableOnInteraction: false,
				pagination: $(item).find(".swiper-pagination"),
			});

			$(this).attr("data-init", true);
		}
	});
}



function initProcessbar() {
	$(".myProcessbar").each(function() {
		if($(this).attr("data-init") != true) {
			var val = $(this).attr("data-value");
			var $processbar = $(this).find(".probar");
			$processbar.width(val + "%");
			$(this).attr("data-init", true);
		}
	});
}
