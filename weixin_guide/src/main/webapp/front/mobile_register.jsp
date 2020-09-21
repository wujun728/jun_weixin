<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
<title>会员注册</title>
<link rel="stylesheet" href="<%=path %>/static/weui/lib/weui.css"/>
<link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css"/>
<link rel="stylesheet" href="<%=path %>/css/lgrg.css"/>
<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
<script type="text/javascript" src="<%=path %>/static/weui/js/jquery-weui.js"></script>
<!-- layer -->
<script src="<%=path %>/static/layer/layer.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#mobile-tab").click(function(){
		$("#regtype").val(1);
		$("#email-part").hide();
		$("#email-tab").removeClass('active');
		$(this).addClass('active');
		$("#mobile-part").show();
		 
	});
	
	$("#email-tab").click(function(){
		$("#regtype").val(0);
		$("#mobile-part").hide();
		$("#mobile-tab").removeClass('active');
		$(this).addClass('active');
		$("#email-part").show();
	}); 
});

</script>
</head>
<body>
	<body class="page">
	<div class="hd">
        <h1 class="page_title"><img alt="" width="80px"  height="80px" src="<%=path %>/images/logo.png"></h1>
        <p class="page_desc">极速开发微信公众号</p>
   	</div>
    	
    	<div class="tab-change">
		    <span id="mobile-tab" class="reg-part mobile-reg active">手机注册</span>
		</div>
		
		<form method="post" action="<%=path %>/ajax/register" id="from" name="from">	
			<input type="hidden" id="regtype"   name="regtype" value="1">
			<div class="weui_cells">
		        <div class="weui_cell">
		            <div class="weui_cell_hd"></div>
		            <div class="weui_cell_bd weui_cell_primary">
		                <input class="weui_input" type="text" name="nickName" placeholder="请输入昵称">
		            </div>
		        </div>
		    </div>
		    
			<!--邮箱注册-->
			<div id="email-part" style="display:none;">
				    <div class="weui_cells">
				        <div class="weui_cell">
				            <div class="weui_cell_hd"></div>
				            <div class="weui_cell_bd weui_cell_primary">
				                <input class="weui_input" type="text" name="email" id="email" placeholder="请输入邮箱">
				            </div>
				        </div>
				    </div>
			</div>	
			
			<!--手机注册-->
			<div id="mobile-part" style="display:block;">
				    <div class="weui_cells">
				        <div class="weui_cell">
				            <div class="weui_cell_hd"></div>
				            <div class="weui_cell_bd weui_cell_primary">
				                <input class="weui_input" type="text" pattern="[0-9]*"  name="tel" id="tel" placeholder="请输入11位手机号">
				            </div>
				        </div>
				    </div>
			</div>		
			    
		    <div class="weui_cells">
		        <div class="weui_cell">
		            <div class="weui_cell_hd"></div>
		            <div class="weui_cell_bd weui_cell_primary">
		                <input class="weui_input" type="password" maxlength="24" name="password" placeholder="请输入密码">
		            </div>
		        </div>
		    </div>
		
		    <div class="weui_cells">
		        <div class="weui_cell">
		            <div class="weui_cell_bd weui_cell_primary">
		                 <input class="weui_input" type="text" maxlength="4" name="imgCode" placeholder="请输入验证码">
		            </div>
		            <div class="" style="margin-right: 10px;">
		                <img src="<%=path %>/image_code" id="image_code" onclick="this.src = '<%=path %>/image_code?v=' + Math.random()" height="25" style="border: 1px solid #ccc;border-left: 0;cursor: pointer;" />
		            </div>
		           <!--  <div class="weui_cell_ft">
		                <a href="javascript:void(0);">看不清</a>
		            </div> -->
		        </div>
		    </div>
		    <div class="weui_cells">
		        <div class="weui_cell">
		            <div class="weui_cell_hd"></div>
		            <div class="weui_cell_bd weui_cell_primary">
		                <input class="weui_input"  type="text" name="number" maxlength="6" pattern="[0-9]*" placeholder="请输入您收到的验证码">
		            </div>
		            <div class="weui_cell_ft">
		                <button type="button" class="mobile-msg" onclick="timeout(this);" >发送验证码</button>
		            </div>
		        </div>
	        </div>
			
		    <div class="weui_btn_area">
		    	<input type="submit"  class="weui_btn weui_btn_primary"   value="免费注册 "/>
			</div>
	</form>	
	<div class="weui_btn_area"  style="padding: 0 0 15px 0;">
	    <a  class="weui_btn weui_btn_primary" href="<%=path %>/login" id="">已有账号,<span class="error">登录</span></a>
	</div>
	<div class="tc blue" >
	    <p >注册及代表同意</p>
	    <p ><a class="blue" href="<%=path %>/secret">《隐私条款》</a></p>
	</div>
	
<script type="text/javascript">
	$(function(){
		$("#from").submit(function(){
			var $form = $(this);
			$.post($form.attr("action"), $form.serialize(), function(data){
				if (data.code === 0) {
					layer.msg("注册成功", {shift: 1});
					setTimeout(function(){window.location.href = "<%=path %>/login";}, 1200);
					return false;
				} else {
					$("#image_code").click();
					layer.msg(data.message, {shift: 6});
					return false;
				}
			}, "json");
			return false;
		});
	});
	
	
	function timeout(dom){
		var regType=from.regtype.value;
		//设置按钮不可点击
		dom.setAttribute('disabled',true);
		//开始倒计时
	    countDown(dom); 
	    //ajax发送验证码
	    if(regType==0){
	    	sendRegEmail();
	    }else{
	    	sendRegSMS();
	    }
	}
	
	function sendRegSMS(){
		$.showLoading("正在发生验证...");
		var tel=from.tel.value;
		$.post("<%=path %>/ajax/sendRegSMS",
		    {
			tel:tel,
		    },
		    function(res){
		    	$.hideLoading();
		    	if (res.code == 0) {
		    		layer.msg("注册手机验证码发送成功", {shift: 1});
		    	}else{
		    		$("#image_code").click();
		    		layer.msg(res.message, {shift: 6});
		    	}
		    }); 
	}
	
	function sendRegEmail(){
		$.showLoading("正在发生验证...");
		var email=from.email.value;
		$.post("<%=path %>/ajax/sendRegEmail",
		    {
				email:email,
		    },
		    function(res){
		    	$.hideLoading();
		    	if (res.code == 0) {
		    		layer.msg("注册邮箱验证码发送成功", {shift: 1});
		    	}else{
		    		$("#image_code").click();
		    		layer.msg(res.message, {shift: 6});
		    	}
		    }); 
		
	}
	
	function countDown(dom){
        var sTime = 60,     //倒计时的时间
            timer = null;

        clearTimeout(timer);
        timer = setTimeout(function () {
            if(sTime == 0){
            	 dom.removeAttribute('disabled');
            	 dom.innerHTML = "发送验证码";
                 clearTimeout(timer);
                 return false;
            }else{
                sTime--;
                setTimeout(arguments.callee, 1000);
            }
            dom.innerHTML = "("+sTime+"/60s)";
        },1000);
    }
</script>
</body>
</html>