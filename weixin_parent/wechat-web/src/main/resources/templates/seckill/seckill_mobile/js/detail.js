$(function(){
	initDetail();
	initEvt();
});
var now = {};
var channel = '02';
var gift_need_points=null;
function dealVerify(data){
	data['id'] = gid;
	data['type'] = 'phone';
	data['vtype'] = '秒杀';
	
	var addOrderUrl = _path + '/sys/seckillsafe/seckill';
	req(addOrderUrl, data, function(d){
		//showPrompt(JSON.stringify(d));
		if(d && d.code == '1'){
			var form = $('<form id="subOrder" style="display: none;" action="" method="post">'+
				'<input type="hidden" name="goodsId" value="' + d.g_no + '"/><input type="hidden" name="sign" value="' + d.order_no + '"/>'+
				'<input type="hidden" name="count" value="1"/></form>');
			$('body').append(form);
			$("#subOrder").attr('action',d.action); 
			$('#subOrder').submit();
		}else if(d && d.code == 0){
			showPrompt(d.errmsg);
		}else{ showPrompt('查询出错'); } 
	
	
	});
}

function initEvt(){
	$(".tabNav").on("click", "li", function() {
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".tabContent .tabBody").eq(index).show().siblings().hide();
	});
	
	$('#secBtn').click(function(){
		if(!$(this).hasClass('disabled')){
			// TODO 积分校验 验证码 秒杀
			//if(canSeckill){
				if(gid == ''){ showPrompt('商品错误');return; }
				req(_path+"/sys/seckillsafe/checkmsg", {id:gid}, function(d){
			 	    if(d.code == 1){
			 	    	if(d.has_order == 1){
				    		  $('.un-mask .un-modal-content-text').text("已参与")
				              $('.un-mask').show();
				    		  return;
				    	}
			 	    	Verify.init(dealVerify, '秒杀');
			 	   }else{
			           //TODO 跳转到登录页
			        	
			        }
				})
				
			//}else{ showPrompt('积分不足'); }
		}
	});
}

var gid = '';
var canSeckill = false;
function initDetail(){
	console.log("初始化秒杀数据")
	var idObj = getRequest();
	if(Object.keys(idObj).length == 1 && typeof idObj.id != 'undefined'){
		var detailUrl = _path + '/act/seckill/getGiftDetail';
		req(detailUrl, {id : idObj.id}, function(d){
			if(d && d.code == '1'){
				// 按钮
				var data = d.data;
				var status = 0;
				now = moment(d.now);
				var btn = '', disabled = '';
				
				
				// 用户积分
				canSeckill = false;
				
				if(now.isBetween(data.start_time, data.end_time)){ 
					console.log("立即秒杀")
					status = 1; btn = '立即秒杀';
					
					if(d.is_logined==1){
						canSeckill = d.userPoint >= data.gift[0].g_seckill_price;
						if(data.count == data.use_count){
							btn = '已抢光'; disabled = 'disabled';
							console.log("已抢光")
						}else if(d.has_order == '1'){ 
							btn = '已参与'; disabled = 'disabled'; 
							console.log("已参与")
						} 					
					}
				}else if(now.isBefore(data.start_time)){ 
					status = 0; btn = '立即秒杀'; disabled = 'disabled'; 
				}else if(now.isAfter(data.end_time)){ 
					status = 2; btn = '已结束'; disabled = 'disabled';
					$('.seckill-progress').css("visibility","hidden") 
				}
				console.log("$('#secBtn').html(btn).addClass(disabled)  :"+btn+" disabled:"+disabled)
				$('#secBtn').html(btn).addClass(disabled);
				countDownDetail( data.start_time, data.end_time);
				gid = data._id;
				// 计时
				setInterval(function(){ countDownDetail(data.start_time, data.end_time); }, 1000);
				
				// 图片
				var imgStr = '<div class="swiper-slide" style="background-image: url(' + data.gift[0].photoC + ');"></div>';
//				$.each(data.gift[0].g_pic, function(idx, item){
//					imgStr += '<div class="swiper-slide" style="background-image: url(' + item + ');"></div>';
//				})
				$('.swiper-wrapper').html(imgStr);
				initSwiper();
				gift_need_points = data.gift[0].g_seckill_price;
				// 礼品积分
				$('.curPrice').html('<span class="font36">' + data.gift[0].g_seckill_price + '</span>&nbsp;积分');
				$('.oldPrice').html(data.gift[0].g_original_price + '积分');
				
				// 库存
				var percent = data.use_count == 0 ? 100 : (data.use_count - data.count == 0) ? 0 : 100-toPercent( data.use_count, data.count );
				$('.seckill-progress').html('<p class="font24 stockNum">剩余' + (percent) + '%</p><div class="progress progress-striped active myProcessbar" data-value="' + percent + '"><div class="progressBg"><div class="progress-bar progress-bar-info probar"></div></div></div>');
				initProcessbar();
				
				
				// 产品介绍
				$('.productPic').html(data.gift[0].g_detail);
				
				$('.title').html(data.gift[0].g_name);
				
				// 规格参数
//				var attr = '';
//				$.each(data.gift[0].g_attr, function(idx, item){
//					attr += '<p class="font24 clearfix"><span>' + item.k + '</span><span>' + item.v + '</span></p>';
//				})
				$('#gAttr').html(data.gift[0].g_attr);
			}else if(d){ showPrompt(d.errmsg); }
		});
	}else{ showPrompt('参数错误'); }
	

}

function countDownDetail( start, end ){
	var str = '', hh = '', mm = '', ss = '';
	now.add(1, 'seconds');
	if(now.isBetween(start, end)){
		str = '距结束';
		var diff = moment(end).diff(now, 'second');
		if(diff == 0){ refreshGift(1); }
		
        hh = Math.floor(diff / 3600);
        mm = Math.floor((diff - (hh * 3600)) / 60 );
        ss = Math.floor(diff % 60);
	}else if(now.isBefore(start)){
		str = '距开始';
		var mstart = moment(start);
		var diff = moment(mstart).diff(now, 'second');
		if(diff == 0){ refreshGift(0); }
		
        hh = Math.floor(diff / 3600);
        mm = Math.floor((diff - (hh * 3600)) / 60 );
        ss = Math.floor(diff % 60);
	}else if(now.isAfter(end)){ str = '已结束'; }
	
	hh = (hh+'').length == 1 ? '0' + hh : hh;
	mm = (mm+'').length == 1 ? '0' + mm : mm;
	ss = (ss+'').length == 1 ? '0' + ss : ss;
	var text = str;
	if(!now.isAfter(end)) text += '<span> ' + hh + ':' + mm + ':' + ss + '</span>'

	$('#timeTxt').html(text);
}

function refreshGift(timeType){
	if(timeType == 1){
		$('#secBtn').addClass('disabled').text('已结束');
	}else if(timeType == 0){
		$('#secBtn').removeClass('disabled').text('立即秒杀');
	}
}

function showPrompt(msg) {
	$('.prompt').remove();
	var $div = $('<div class="prompt font32">' + msg + '</div>');
	$("body").append($div);
	$div.fadeIn();
	setTimeout(function() {
		$div.fadeOut(500, function() {
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
	$(".swiper-container").height($(window).width());
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