var channel = "01";
var point_bool = false;//判断积分是否足够
var gift_need_points = null;
$(document).ready(function () {  
    var Request = new Object();  
    Request = GetRequest();  
    var id= Request["id"];    
    if(id == undefined || id == "" || id == null) {
    	$('.un-mask .un-modal-content-text').text("参数丢失")
        $('.un-mask').show();
    	return;
    }
    getGdetail(id)
    $(".seckill_btn").click(function(){
    	if($(this).hasClass("un-detail-skill-btn")){
    		 var m = moment(all_now);
         	 var isIn = m.isBetween(k_start_time, k_end_time);
			 if(!isIn){
				 return;
			 }
			 //判断积分是否够
//			 if(point_bool){
//				  $('.un-mask .un-modal-content-text').text("积分不足")
//	              $('.un-mask').show();
//				 return;
//			 }

		req(_path+"/sys/seckillsafe/checkmsg", {id:id}, function(d){
	 	    if(d.code == 1){
	 	    	if(d.userPoint < gift_need_points){
	 	    		  $('.un-mask .un-modal-content-text').text("积分不足")
		              $('.un-mask').show();
	 	    		  return;
	 	    	}
	 	    	if(d.has_order == 1){
		    		  $('.un-mask .un-modal-content-text').text("已参与")
		              $('.un-mask').show();
		    		  return;
		    	}
	 	    	 // 前端验证
				 Verify.init(function(data){
					data['id'] = id;
					data['type'] = 'pc';
					data['vtype'] = '秒杀';
					req(_path+"/sys/seckillsafe/seckill", data, function(d){
				    	   if(d.code == 1){
				             	 $("input[name='goodsId']").val(d.g_no);
				             	 $("input[name='sign']").val(d.order_no);
				             	 $("input[name='count']").val(1);
				             	 
				             	 $("#killForm").attr('action',d.action); 
				                 $("#killForm").submit(); 
				           }else{
				               // 打开弹窗
				        	   $('.un-mask .un-modal-content-text').text(d.errmsg)
				               $('.un-mask').show();
				           }
			    	    })
				},"秒杀");
			
				 
	        }else{
	           //TODO 跳转到登录页
	        	
	        }
	     })
			     
			 
    	}
    })
    //  弹窗
   $('.un-modal-close').on('click',function(){
       $('.un-mask').hide();
   })
    
     $('.gotoTop').on('click', function() {
    	$(window).scrollTop(0);
     })
    
});

var k_start_time, k_end_time,all_now;
function getGdetail(id){
	console.info(id);
	req(_path+"/act/seckill/getGiftDetail",{id:id }, function(d){
		 if(d.code == 1){
         	 var detail = d.data;
         	 var pics = detail.gift[0].g_pic;
         	 k_start_time= detail.start_time;
         	 k_end_time = detail.end_time
         	 $(".un-slider-preview .swiper-wrapper").empty();
         	 $(".un-slider-view .swiper-wrapper").empty();
         	 for(var i = 0;i<pics.length;i++){
         		 var bdiv = ' <div class="swiper-slide ';
         		 if(i==0){
         			bdiv += ' swiper-slide-active ';
         		 }else if(i == 1){
         			bdiv += ' swiper-slide-next ';
         		 } 
         		 bdiv+= '"> <img src="'+pics[i]+'" alt="">'+
                        '</div>';
         		 $(".un-slider-view .swiper-wrapper").append(bdiv);
         		 
         		 var div = ' <div class="swiper-slide ';
         		 if(i==0){
         			 div += ' active-nav swiper-slide-active ';
         		 }else if(i==1){
         			 div += ' swiper-slide-next';
         		 } 
         		 div+= '"> <img src="'+pics[i]+'" alt="">'+
                        '</div>';
         		 $(".un-slider-preview .swiper-wrapper").append(div);
         	 }
         	 $(".un-warp .un-detail-title span").text(detail.gift[0].g_name);
         	 $(".un-warp .un-detail-intr p").text(detail.gift[0].g_name);
         	 $(".un-warp .un-detail-options").find(".un-detail-options-sale").text(detail.gift[0].g_seckill_price);
         	 
         	 
         	 $(".un-warp .clearfix").find(".un-detail-options-pro").text(detail.gift[0].g_original_price+"积分");
         	 $(".un-warp .un-detail-aside").find(".un-detail-options-sale-aside").text(detail.count-detail.use_count+"件");
         	 
         	 
         	 $(".un-detail-progress-residue").css("width",(detail.count-detail.use_count)*(120/detail.count));
         	 
         	 $("#g_detail").html(detail.gift[0].g_detail);
         	 $("#g_tips").html(detail.gift[0].g_tips);
         	 $("#g_attr").html(detail.gift[0].g_attr);
         	 //缓存商品所需积分
         	 gift_need_points = detail.gift[0].g_seckill_price;
         	 $("#end_time").val(detail.end_time)
         	
         	 all_now = new Date(d.now);
         	 var m = moment(d.now);
         	 var isIn = m.isBetween(detail.start_time, detail.end_time);
			 if(isIn){
				if(detail.count-detail.use_count == 0){
					$(".seckill_btn").text("已抢光");
	         	 }else{
	         		 if(d.is_logined == 1){
		         		 if(d.has_order == 1){
		         			$(".seckill_btn").text("已参与");
		         		 }else{
		         			 //积分不足
			            	 if(d.userPoint < detail.gift[0].g_seckill_price){
			            		point_bool = true;
			            		$(".seckill_btn").text("积分不足");
			            	 }else{
			            		 $(".seckill_btn").removeClass("un-detail-skill-disabled-btn").addClass("un-detail-skill-btn"); 
			            	 }
		         		 }
	         		 }else{
	         			 $(".seckill_btn").removeClass("un-detail-skill-disabled-btn").addClass("un-detail-skill-btn");
	         		 }
	         	 }
				$(".g_gcount").show();
				show_time(detail.end_time,"距结束")
			 }else{
				if(m.isBefore(detail.start_time)){
					//未开始
					show_time(detail.start_time,"距开始")
					$(".seckill_btn").text("未开始");
					$(".g_gcount").show();
				}else{
					if(m.isAfter(detail.end_time)){
						//已结束
						$(".un-residue").text("已结束");
						$(".seckill_btn").text("已结束");
						$(".seckill_btn").removeClass("un-detail-skill-btn").addClass("un-detail-skill-disabled-btn"); 
					}else{
						$(".g_gcount").show();
					}
				}
			}
			initSwiper()
           }else{
         	   //TODO
           }
	})
}



var t;
function show_time(end_date,text){  
 all_now.setSeconds(all_now.getSeconds()+1);
 var time_now,time_distance; 
 var str_time = "";
 var int_day,int_hour,int_minute,int_second;  
 var time_now= all_now;
 
 var time_end = new Date(end_date.split("-").join("/"));
 time_distance=time_end-time_now;  
 if(time_distance>0){  
//  int_day=Math.floor(time_distance/86400000)  
//  time_distance-=int_day*86400000;  
  int_hour=Math.floor(time_distance/3600000)  
  time_distance-=int_hour*3600000;  
  int_minute=Math.floor(time_distance/60000)  
  time_distance-=int_minute*60000;  
  int_second=Math.floor(time_distance/1000)  
   
  if(int_hour<10)  
   int_hour="0"+int_hour;  
  if(int_minute<10)  
   int_minute="0"+int_minute;  
  if(int_second<10)  
   int_second="0"+int_second;  
 //str_time=int_day+"天"+int_hour+"小时"+int_minute+"分钟"+int_second+"秒";  
  str_time=int_hour+":"+int_minute+":"+int_second;
  $(".un-residue").text(text+"  "+str_time);
  t = setTimeout("show_time('"+end_date+"','"+text+"')",1000);  
 }
 else{
  clearTimeout(t)  
  if(text == "距结束"){
	  $(".un-residue").text("已结束");
	  $(".seckill_btn").removeClass("un-detail-skill-btn").addClass("un-detail-skill-disabled-btn");
	  $(".seckill_btn").text("已结束");
	  $(".g_gcount").hide();
  }else if(text == "距开始"){
	  var next_end_time = $("#end_time").val();
	  $(".seckill_btn").removeClass("un-detail-skill-disabled-btn").addClass("un-detail-skill-btn");
	  $(".g_gcount").show();
	  $(".seckill_btn").text("立即秒杀");
	  show_time(next_end_time,"距结束")  
  }
 }  
 return str_time	;
}  
function GetRequest() {  
    var url = location.search; //获取url中"?"符后的字串   
    var theRequest = new Object();  
    if (url.indexOf("?") != -1) {  
        var str = url.substr(1);  
        strs = str.split("&");  
        for (var i = 0; i < strs.length; i++) {  
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);  
        }  
    }  
    return theRequest;  
}
function initSwiper(){
    // 商品图轮播
    var viewSwiper = new Swiper('.un-slider-view .swiper-container', {
        onSlideChangeStart: function () {
            updateNavPosition()
        }
    })
    var previewSwiper = new Swiper('.un-slider-preview .swiper-container', {
        //visibilityFullFit: true,
        slidesPerView: 'auto',
        allowTouchMove: false,
        onTap: function () {
            viewSwiper.slideTo(previewSwiper.clickedIndex)
        }
    })
    $('.un-slider-view .arrow-left,.un-slider-preview .arrow-left').on('click', function (e) {
        e.preventDefault()
        if($('.un-slider-preview .swiper-slide').length ==1) return;
        if (viewSwiper.activeIndex == 0) {
            viewSwiper.slideTo(viewSwiper.slides.length - 1, 1000);
            return
        }
        viewSwiper.slidePrev()
    })
    $('.un-slider-view .arrow-right,.un-slider-preview .arrow-right').on('click', function (e) {
        e.preventDefault()
        if($('.un-slider-preview .swiper-slide').length ==1) return;
        if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
            viewSwiper.slideTo(0, 1000);
            return
        }
        viewSwiper.slideNext()
    })
    function updateNavPosition() {
        $('.un-slider-preview .active-nav').removeClass('active-nav')
        var activeNav = $('.un-slider-preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
        if (!activeNav.hasClass('swiper-slide-visible')) {
            if (activeNav.index() > previewSwiper.activeIndex) {
                var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
                previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
            } else {
                previewSwiper.slideTo(activeNav.index())
            }
        }
    }

}
//  切换详情内容
function slideTab (index){
    $('.un-detail-tab-active').removeClass('un-detail-tab-active');
    $('.un-detail-tab-index').eq(index).addClass('un-detail-tab-active');
    $('.un-detail-tab-content').hide();
    $('.un-detail-tab-content').eq(index).show();
}
$(function(){
	$('.un-detail-tab').on('click','.un-detail-tab-index',function(){
        var index = $(this).index();
        slideTab(index)
    })
    // 初始化详情内容
    slideTab(0)
})
