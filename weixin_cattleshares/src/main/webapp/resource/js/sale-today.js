$(".tab-click").click(function(){
		var tab_id = $(this).attr("id");
		$("#"+tab_id).addClass("click-style").siblings().removeClass("click-style");
	
		if(tab_id=="sale-common"){
			$(".sale-tab-common").css("display","block");
			$(".sale-tab-vip").css("display","none");
		}else{
			$(".sale-tab-common").css("display","none");
			$(".sale-tab-vip").css("display","block");
		}
	})
