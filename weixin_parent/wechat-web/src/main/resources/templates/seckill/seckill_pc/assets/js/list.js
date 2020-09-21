var channel = "01";
$(document).ready(function () {
    getSkrecord(1,10)
    
    
    $('.gotoTop').on('click', function() {
    	$(window).scrollTop(0);
    })
    
    $(".un-record-table-tbody").on("click",".un-link",function(){
		 var g_no = $(this).attr("data-gno");
		 var order_no = $(this).attr("data-oid");
		 //console.info(g_no)
		 //console.info(order_no)
		 if(g_no == "" || g_no == undefined ||order_no == "" || order_no == undefined ){
			 return;
		 }
		 
		 $("input[name='goodsId']").val(g_no);
     	 $("input[name='sign']").val(order_no);
     	 $("input[name='count']").val(1);
         $("#killForm").submit(); 
	})
	

   
});
function getSkrecord(pageNum,pageSize){
	req(_path+"/sys/seckillsafe/skrecord",{pageNum:pageNum,pageSize:pageSize}, function(d){
		if(d.code == 1){
        	 var record = d.data;
        	 $(".un-record-table-tbody").empty();
        	 for(var i = 0;i<record.length;i++){
        		 var status = "";
        		 var text = "---";
        		 if(record[i].status == 0){
        			 status = "无效订单";
        		 }else if(record[i].status == 1){
        			 if(record[i].end_time>d.now_time){
        				 text = '<a class="un-link"  data-endtime='+record[i].end_time+'   data-gno='+record[i].g_no+' data-oid='+record[i]._id+' >支付</a>'
        				 status = "待支付";
        			 }else{
        				 text = "---";
        				 status = "活动已过期";
        			 }
        		 }else if(record[i].status == 2){
        			 status = "已支付";
        		 }
        		 
        		 
        		var tr = '<tr>'+
               '<td style="width: 270px;">'+
               '    <div class="un-record-order">'+record[i]._id+'</div>'+
               '</td>'+
               '<td style="width: 320px;">'+
               '    <div class="clearfix">'+
               '        <img src="'+record[i].g_pic+'" alt="" class="un-record-img">'+
               '        <div class="un-record-title" style="width:220px"><p>'+record[i].g_name+'</p></div>'+
               '    </div>'+
               '</td>'+
               '<td style="width: 90px;">'+
               '    <div class="un-record-sale">'+record[i].g_seckill_price+'积分</div>'+
               '</td>'+
               '<td style="width: 185px;">'+
               '    <div class="un-record-time">'+record[i].order_time+'</div>'+
               '</td>'+
               '<td style="width: 75px;">'+status+'</td>'+
              ' <td>'+text+'</td>'+
               '</tr>';
        		 $(".un-record-table-tbody").append(tr);
        	 }
        	 resizeDot();
        	 $("#killForm").attr('action',d.pc_action); 
        	 var page_s = $(".pagesize").val();
        	 initPage('pageBar', d.totalPage, d.pageNum, 'toPage', d.totalCount,  d.pageSize || 10);
        	 setTimeout(function(){
        		 updateFooter();
        		 onReisze();
        	  },200);
          }else{
        	   //TODO
          }
	})
}
//$("#pagesize").on("change", function () {
//	var s = $(this).val();
//	getSkrecord(1,s)
//})
 
function toPage(p, type, s){
	
	if(type != 2){input_pageNum = "";
	}
	s = $(".pagesize").val();
	 getSkrecord(p,s)
}

function sub(g_no,order_id){
	console.info(g_no);
	console.info(order_id);
}

/**
 * 分页插件
 divid	页码条元素的id
 count	总页数
 num	当前页
 methodName	回调函数名
 total	总条目数
 s		分页数
 */
var input_pageNum = "";
var initPage = function(divid, count, num, methodName, total, s) {
	var paging = $('#' + divid);
	// if(count <= 1){ paging.css("display", "none"); return; }
	var pageSize = 5;
	paging.hide();
	if (undefined == count || '' == count) return;
	if (methodName == null) methodName = 'toPage';
	var prevP = Number(count);
	
	var nextP = Number(num) + 1;
	nextP = nextP > count ? count : nextP;

	var html = "", classname = num <= 1 ? "disabled" : "";
	
	if (count > 0) {
		var begin = 1;
		var end = count;
		if (count < pageSize) { begin = 1; end = count; }
		else {
		   if (num <= Math.floor(pageSize / 2) + 1) { begin = 1; end = pageSize; } 
		   else {
			   begin = num - Math.floor(pageSize / 2);
			   end = Number(num) + Math.floor(pageSize / 2);
			   if (end >= count) { end = count; begin = count - pageSize + 1; }
		   }
		}
		var pli = '';
		for (var i = begin; i <= end; i++) {
			var aclass = i == num ? 'active' : '';
			pli += '<li class="' + aclass + '"><a onclick="return ' + methodName + '(' + i + ');" href="javascript:;">' + i + '</a></li>'; // 页码
		}
		var pevt = num == 1 ? '' : "onclick='return " + methodName + "(1);'";
		var nevt = num == count ? '' : "onclick='return " + methodName + "(" + prevP + ");'";
		
		html += '<div class="un-navigation-bar clearfix right" style="margin-top:30px;">'+
			'<span class="left" style="margin-top:7px;margin-right:14px;">共' + total + '条记录</span>'+
			'<nav aria-label="Page navigation" class="left"><ul class="pagination mrg0A">'+
			'<li class="' + (num == 1 ? "disabled" : "") + '"><a href="javascript:;" ' + pevt + ' aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'+ pli +
			'<li class="' + (num == count ? "disabled" : "") + '"><a href="javascript:;" ' + nevt + ' aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav>'+
			
			'<div class="left" style="margin:0 16px;width:95px;"><select class="selectpicker js-example-basic-single pagesize">'+
			'<option value="10">10条/页</option><option value="20">20条/页</option><option value="50">50条/页</option><option value="100">100条/页</option></select></div>'+
			
			'<span class="left" style="line-height: 32px;">跳至</span>'+
			'<input type="text" name="pageNum" maxlength="8" value="" class="form-control pageNum left" style=" width: 42px;margin: 0 10px;" onkeyup="return RepNumber(this);" onafterpaste="return RepNumber(this);">'+
			'<span class="left" style="line-height: 32px;">页</span>'+
			'</div>';
		paging.show();
	}
	paging.html(html);
	paging.find('.pageNum').on('keydown', function(e){   
   		var ev = document.all ? window.event : e; 
   		if(ev.keyCode==13) {
   			var func = eval(methodName);
   			if($(this).val()>count){func(count,2)}//return;
   			input_pageNum = $(this).val();
   			func($(this).val(),2); 
   		}
	});
	paging.find('.pagesize').on('change', function(e){
   		var func = eval(methodName); func(1, 0, $(this).val());
	});
	paging.find('.pagesize').val(s || 10);
	if(input_pageNum != ""){
		$("input[name='pageNum']").val(input_pageNum);
	}
	paging.find('.selectpicker').selectpicker('refresh');
};

function RepNumber(obj) {
    var reg = /^[\d]+$/g;
     if (!reg.test(obj.value)) {
         var txt = obj.value;
         txt.replace(/[^0-9]+/, function (char, index, val) {//匹配第一次非数字字符
            obj.value = val.replace(/\D/g, "");//将非数字字符替换成""
            if(obj.value.length > 6){ obj.value = obj.value.substring(0, 6); }
            var rtextRange = null;
            if (obj.setSelectionRange) {
                obj.setSelectionRange(index, index);
            } else {//支持ie
                rtextRange = obj.createTextRange();
                rtextRange.moveStart('character', index);
                rtextRange.collapse(true);
                rtextRange.select();
            }
        })
     }
 }



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


 