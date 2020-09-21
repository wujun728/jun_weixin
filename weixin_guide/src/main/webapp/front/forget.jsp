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
<title>会员找回密码</title>
<link rel="stylesheet" href="<%=path %>/static/weui/lib/weui.css"/>
<link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css"/>
<link rel="stylesheet" href="<%=path %>/css/lgrg.css"/>

<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
<script type="text/javascript" src="<%=path %>/static/weui/js/jquery-weui.js"></script>

<!-- layer -->
<script src="<%=path %>/static/layer/layer.js"></script>
</head>
<div class="page">
		
   	<div class="hd">
   		
        <h1 class="page_title"><img alt="" width="80px"  height="80px" src="<%=path %>/images/logo.png"></h1>
        <p class="page_desc">极速开发微信公众号</p>
   	</div>
	<div class="bd">
		<form method="post" name="from" action="<%=path %>/ajax/forget" >
			<input type="hidden" id="forgettype"   name="forgettype" value="0">
			<input type="hidden" id="acc"   name="acc" >
			<!-- 账号 -->
			<div id="account-part" style="display:block;">
				<div class="weui_cells">
				    <div class="weui_cell">
				        <div class="weui_cell_hd"></div>
				        <div class="weui_cell_bd weui_cell_primary">
				            <input class="weui_input" type="text" name="account" placeholder="请输入您的手机号">
				        </div>
				    </div>
				</div>
			
				<div class="weui_cells">
				        <div class="weui_cell">
				            <div class="weui_cell_hd"></div>
				            <div class="weui_cell_bd weui_cell_primary">
				                 <input class="weui_input" type="text" maxlength="4" name="imgCode" placeholder="请输入验证码">
				            </div>
				            <div class="weui_cell_ft">
								<img src="<%=path %>/image_code" id="image_code" onclick="this.src = '<%=path %>/image_code?v=' + Math.random()" height="25" style="border: 1px solid #ccc;border-left: 0;cursor: pointer;" />
				            </div>
				        </div>
				 </div>
				<div class="weui_cells">
				        <div class="weui_cell">
				            <div class="weui_cell_hd"></div>
				            <div class="weui_cell_bd weui_cell_primary">
				                <input class="weui_input" type="text"  name="number" maxlength="6" pattern="[0-9]*" placeholder="请输入您收到的验证码">
				            </div>
				            <div class="weui_cell_ft">
				                <button type="button" class="mobile-msg" onclick="timeout(this);">发送验证码</button>
				            </div>
				        </div>
				</div>
				<div class="weui_btn_area">
					<input type="submit"  class="weui_btn weui_btn_warn"   value="找回密码"/>
				</div>
			</div>
			<!-- 账号 end -->
			<!-- 重置密码  -->
			<div id="password-part" style="display:none;">
				<div class="weui_cells">
				    <div class="weui_cell">
				        <div class="weui_cell_hd"></div>
				        <div class="weui_cell_bd weui_cell_primary">
				            <input class="weui_input" type="password" name="pass_one" placeholder="请输入您的新密码">
				        </div>
				    </div>
				</div>
				<div class="weui_cells">
				    <div class="weui_cell">
				        <div class="weui_cell_hd"></div>
				        <div class="weui_cell_bd weui_cell_primary">
				            <input class="weui_input" type="password" name="pass_two" placeholder="请输入再次输入您的新密码">
				        </div>
				    </div>
				</div>
				<div class="weui_btn_area">
					<input type="submit"  class="weui_btn weui_btn_warn"    value="确认找回密码"/>
				</div>
			</div>
			<!-- 重置密码 end -->
		</form>
		
		<div class="weui_btn_area">
		    <a class="weui_btn weui_btn_primary" href="<%=path %>/register" id="">免费注册</a>
		</div>
	</div>
<script type="text/javascript">
$(function(){
	$("form").submit(function(){
		var $form = $(this);
		$.post($form.attr("action"), $form.serialize(), function(data){
			if (data.code === 0) {
				if(data.data === '0'){
					$("#account-part").hide();
					$("#password-part").show();
					$("#forgettype").val(1);
					return false;
				}else{
					layer.msg("密码修改成功", {shift: 1});
					setTimeout(function(){window.location.href = "<%=path %>/login";}, 1200);
					return false;
				}
				
			}else {
				$("#image_code").click();
				layer.msg(data.message, {shift: 6});
				return false;
			}
		}, "json");
		return false;
	});
});

function timeout(dom){
	//设置按钮不可点击
	dom.setAttribute('disabled',true);
	//开始倒计时
    countDown(dom); 
    //ajax发送验证码
    sendForgetCode();
}

function sendForgetCode(){
	$.showLoading("正在发送验证码...");
	var account=from.account.value;
	$.post("<%=path %>/ajax/sendForgetCode",
	    {
			account:account,
	    },
	    function(res){
	    	$.hideLoading();
	    	if (res.code === 0) {
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
        if(sTime === 0){
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
</script>	
</body>
</html>