$(function(){
	$('#list').empty();
	getOrder();
	initEvt();
	
});

function initEvt(){
	// 拖到底部刷新
	window.addEventListener("scroll", function(b) {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollHeight = $(document).height();
		var windowHeight = $(window).height();
		if(scrollTop + windowHeight == scrollHeight) {
			getOrder();
		}
	});
	
	$('body').on('click', '.sub', function(){
		if(!$(this).hasClass('disabled')){
			var order_id = $(this).attr('data-gid');
			var g_no = $(this).attr('data-id');
			sub(order_id, g_no);
		}
	});
}

var channel = '02';
var page = 1;
var phone_action = '';
function getOrder(){
	var orderUrl = _path + '/sys/seckillsafe/skrecord';
	console.info(orderUrl);
	req(orderUrl, {pageNum : page, pageSize : 10}, function(d){
		if(d.code == 1){
			phone_action = d.phone_action;
			if(d && d.data.length > 0){
				var str = '';
				$.each(d.data, function(idx, item){
					var text = '', disable = '';
					if(item.status == '1'){
					   if(item.end_time>d.now_time){
						  text = '支付'; disable = ''; 
					   }else{
						   text = '活动已过期';disable = 'disabled';
					   }
					}else if(item.status == '0'){ text = '无效订单'; disable = 'disabled'; }
					else if(item.status == '2'){ text = '已支付'; disable = 'disabled'; }
					
					str += '<li><div class="orderInfo clearfix"><span class="font24 left">' + item.order_time + '</span>'+
					'<span class="font24 right">订单编号:' + item._id + '</span></div><div class="position-relative">'+
					'<div class="pic" style="background-image: url(' + item.g_pic + ');"></div><div class="info position-relative">'+
					'<p class="font30 proName">' + item.g_name + '</p>'+
					'<p class="font24 color-red priceTxt pos-bottom"><span class="font36">' + item.g_seckill_price + '</span>&nbsp;积分</p>'+
					'<button class="font30 sub ' + disable + '" data-gid="' + item._id + '" data-id="' + item.g_no + '">' + text + '</button></div></div></li>';
				});
				page++;
			}else if(page == d.pageNum && $('li[data-end="1"]').length == 0){ str = '<li data-end="1"><p class="text-center font30">暂无更多记录</p></li>'; }
			$('#list').append(str);
		}else if(d && d.code == 0){
			showPrompt(d.errmsg);
		}else{ showPrompt('查询出错'); }
	});
}

function sub(order_id, g_no){
	var form = $('<form id="subOrder" style="display: none;" action="' + phone_action + '" method="post">'+
		'<input type="hidden" name="goodsId" value="' + g_no + '"/><input type="hidden" name="sign" value="' + order_id + '"/>'+
		'<input type="hidden" name="count" value="1"/></form>');
	$('#formsumit').html(form);
	$('#subOrder').submit();
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

function toPercent(point){
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