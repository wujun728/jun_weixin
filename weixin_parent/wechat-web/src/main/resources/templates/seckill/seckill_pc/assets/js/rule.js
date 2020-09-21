getAdList();
function getAdList(){
	req(_path+"/act/seckill/getAdList",{type:"pc"}, function(d){
	   if(d.code == 1){
     	 var list = d.list;
     	 if(list.length>0){
     		$(".un-banner").css({"background-image":"url("+d.fileServer+list[0].pic+")", "cursor":"pointer"}).click(function(e){
     			if(e.target.className == "un-banner"){
     				location.href=list[0].link;
     			}
     		});
     	 }else{
     		$(".un-banner").css("background-image","url("+_view_path+"/seckill_pc/assets/img/banner.jpg)")
     	 }
       }else{
     	   //TODO
       }
	})
} 

getRule();
function getRule(){
	req(_path+"/act/seckill/getAdList",{type:"pc"}, function(d){
	   if(d.code == 1){
     	 var list = d.list;
     	 if(list.length>0){
     		$(".un-banner").css({"background-image":"url("+d.fileServer+list[0].pic+")", "cursor":"pointer"}).click(function(e){
     			if(e.target.className == "un-banner"){
     				location.href=list[0].link;
     			}
     		});
     	 }else{
     		$(".un-banner").css("background-image","url("+_view_path+"/seckill_pc/assets/img/banner.jpg)")
     	 }
       }else{
     	   //TODO
       }
	})
} 
 

$(function(){
	$('.gotoTop').on('click', function() {
		$(window).scrollTop(0);
	})
	/*取文档内容实际高度*/
	function getScrollHeight() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	}
	//每次更新list时，调用此方法
	function updateFooter() {
		var $footer = $(".un-footer");
		if(getScrollHeight() > $(window).height()) {
			$footer.removeClass("fixed");
		} else {
			$footer.addClass("fixed");
		}
	}
	updateFooter();
})

