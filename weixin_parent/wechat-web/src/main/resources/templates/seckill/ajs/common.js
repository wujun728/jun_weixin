//var _path = location.protocol + '//' + location.host + '/api';
//var _view_path = location.protocol + '//' + location.host + '/view';
var _path = location.protocol + '//' + location.host + '/jf-pf-api';
var _view_path = location.protocol + '//' + location.host + '/jf-pf-view';
function req(url, data, callBack){
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',  
		data : data,
		success : function(d){
			if(d && d.code === 1000){
				redirectToLogin();
			}else if(typeof callBack === "function"){ callBack(d); }
		}
	});
}
function redirectToLogin(){ 
	document.cookie="pp_origin_="+location.href+";path=/";
	document.cookie="pp_channel_="+channel+";path=/";
//	var ca=getCookie('pp_channel_');
//	if(ca==null || ''==ca){	document.cookie="pp_channel_="+channel+";path=/";}
	if(isWeiXin()){
		var url=window.location.href;
		var code =url.split('/')[3];
		location.href = _path + '/login/one?code='+code;
	}else{
		location.href = _path + '/login/one?isLogin=true';
	}	
	//只有生产 有客服端
//	var storeUrl4Client ='https://m.jf.10010.com/deal?state='+ _path + '/login/one';
//    if ('android' == this.versionType) {// 安卓
//      js_invoke.interact("{\"type\":\"shoplogin\",\"shopUrl\":\"" + storeUrl4Client + "\"}");
//      return;
//    } else if ('iphone' == this.versionType) { // iphone
//      window.location.href = "clientAction={\"type\":\"shoplogin\",\"shopUrl\":\"" + storeUrl4Client + "\"}";
//      return;
//    }else{
//    	location.href = _path + '/login/one?isLogin=true';
//    }
}

function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function getRequest() {
	var url = location.search; // 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}  

//验证码
var Verify = {
		conf : {pointer : 24},
		init : function(callBack, from){
			var verifyUrl = _path + '/sys/yzm/get?d=' + new Date().getTime() + '&type=' + (from || 's');
					
			var str = '<div class="verifyWrap"><div class="mask"></div><div class="verify"><div class="verifyBox"><div class="vtitle"></div>'+ 
				'<div class="ct"><div class="imgwrap"><img class="yzm" src="" data-from="' + from + '"></div><span class="refresh"></span></div>'+ 
				'<div class="vfoot clearfix"><span class="vbtn cancle font30">取消</span><span class="vbtn sub font30">确定</span></div></div></div></div>';		
			
			var obj = $(str);
			$('body').append(obj);
			
			$('.verifyWrap .verify img.yzm').attr('src', verifyUrl);
			$('.verifyWrap').show();
			
			this.initVerifyEvt(callBack);
		},
		initVerifyEvt : function(callBack){
			var clickNo = 0;
			var that = this;
			$('body').on('click', '.verifyWrap .close,.verifyWrap .cancle', function(){ that.distroy(); });
			
			$('body').on('click', '.verifyWrap img.yzm', function(e){ 
				if($('.verifyWrap .imgwrap .pointer').length == 1){ $('.verifyWrap .imgwrap .pointer').remove(); }
				var left = e.offsetX - (that.conf.pointer / 2);
				var top = e.offsetY - (that.conf.pointer / 2);
				var pointer = '<span class="pointer"></span>';
				$('.verifyWrap .imgwrap').append(pointer);
				$('.verifyWrap .imgwrap .pointer').css({left:left,top:top,width:that.conf.pointer,height:that.conf.pointer,lineHeight:that.conf.pointer + 'px'}).show();
			});
			
			$('body').on('click', '.verifyWrap .pointer', function(){ $(this).remove(); });
			
			$('body').on('click', '.verifyWrap .sub', function(){ 
				if($('.verifyWrap .imgwrap .pointer').length == 0){ showPrompt('请先填写验证码'); return; }
				var top = $('.verifyWrap .imgwrap .pointer').get(0).offsetTop + (that.conf.pointer / 2);
				var left = $('.verifyWrap .imgwrap .pointer').get(0).offsetLeft + (that.conf.pointer / 2);
				
				var px = parseFloat(($('img.yzm').width() / 220));
				var d = {x : parseInt((left / px)), y : parseInt((top / px))};
				if(typeof callBack === 'function'){ callBack(d); that.distroy(); }
			});
			
			$('body').on('click', '.verifyWrap .refresh', function(){ that.refresh(); });
		},
		distroy : function(){ 
			$('.verifyWrap').remove();
			$('body').off('click', '.verifyWrap .sub');
			$('body').off('click', '.verifyWrap .pointer');
			$('body').off('click', '.verifyWrap img.yzm');
			$('body').off('click', '.verifyWrap .close,.verifyWrap .cancle');
		},
		refresh : function(){
			var from = $('.verifyWrap img.yzm').attr('data-from');
			var verifyUrl = _path + '/sys/yzm/get?d=' + new Date().getTime() + '&type=' + (from || 's');
			$('.verifyWrap img.yzm').attr('src', verifyUrl);
		}
}

//弹出提示，三秒后关闭
function showPrompt(msg) {
	var $div = $('<div class="prompt font32">' + msg + '</div>');
	$("body").append($div);
	$div.fadeIn();
	setTimeout(function() {
		$div.fadeOut(500, function() {
			$div.remove();
		});
	}, 2000);
}

window.addEventListener('load',function(){
	var _hmt = _hmt || [];
	var hm = document.createElement("script");
	var host = window.location.hostname;
	if (host=="m.jf.10010.com"){
		hm.src = "https://hm.baidu.com/hm.js?3334fb780471c3731693b3840ec31a20";
	}else{
		hm.src = "https://hm.baidu.com/hm.js?b47a3f3a00739c5ab83f66532901c8cf";
	}
	
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
});



//路由
function Router(){ 
    this.routes = {}; 
    this.curUrl = ''; 
 
    this.route = function(path, callback){ 
        this.routes[path] = callback || function(){}; 
    }; 
 
    this.refresh = function(){ 
        this.curUrl = location.hash.slice(1) || '/'; 
        this.routes[this.curUrl](); 
    }; 
 
    this.init = function(){ 
        window.addEventListener('load', this.refresh.bind(this), false); 
        window.addEventListener('hashchange', this.refresh.bind(this), false); 
    } 
}


//判断是否是微信浏览器的函数
function isWeiXin(){
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	  return true;
  }else{
	  return false;
  }
}
