$(document).ready(function(){
});
	
	
	$(".tab-click").click(function(){
		var tab_id = $(this).attr("id");
		$("#"+tab_id).addClass("click-style").siblings().removeClass("click-style");
	
		if(tab_id=="common"){
			$(".tab-common").css("display","block");
			$(".tab-vip").css("display","none");
		}else{
			$(".tab-common").css("display","none");
			$(".tab-vip").css("display","block");
		}
	})
