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
<title>购买通知</title>
<link rel="stylesheet" href="//res.wx.qq.com/open/libs/weui/0.4.0/weui.css"/>
<link rel="stylesheet" href="<%=path %>/css/index.css"/>
<script type="text/javascript">
function closeWindow(){
	WeixinJSBridge.call('closeWindow');
}
</script>
</head>
<body>
	<div class="page">
		
    	<div class="hd">
	        <h1 class="page_title">Javen微信开发指南</h1>
	        <p class="page_desc">极速开发微信公众号</p>
    	</div>
	    
	    <div class="weui_msg">
		    <c:if test="${(code == 0)}">
			    <div class="weui_icon_area"><i class="weui_icon_success weui_icon_msg"></i></div>
			    <div class="weui_text_area">
			        <h2 class="weui_msg_title">购买成功</h2>
			        <p class="weui_msg_desc">感谢您购买《${course.courseName}》课程。在公众号中点击课单支付成功通知详情即可观看直播！</p>
			    </div>
			</c:if>
			<c:if test="${(code == 1)}">
			    <div class="weui_icon_area"><i class="weui_icon_waiting weui_icon_msg"></i></div>
			    <div class="weui_text_area">
			        <h2 class="weui_msg_title">订单处理中</h2>
			        <p class="weui_msg_desc">感谢您的购买,请留意公众号中的课单支付通知。</p>
			    </div>
			</c:if>
			<c:if test="${(code == 2)}">
			    <div class="weui_icon_area"><i class="weui_icon_warn weui_icon_msg"></i></div>
			    <div class="weui_text_area">
			        <h2 class="weui_msg_title">订单支付失败</h2>
			        <p class="weui_msg_desc">感谢您的支持,请再次购买。</p>
			    </div>
			</c:if>
		    <div>
		    	<div class="weui_text_area">
			        <p class="weui_msg_desc">我们的专业客服人员会在24小时内与您联系，请注意接听我们的电话，再次感谢您的支持！</p>
			    </div>
		    </div>
		    <div class="weui_opr_area">
		        <p class="weui_btn_area">
		            <a href="javascript:closeWindow();" class="weui_btn weui_btn_primary">确定</a>
		            <a href="javascript:closeWindow();" class="weui_btn weui_btn_default">取消</a>
		        </p>
		    </div>
		    <!-- <div class="weui_extra_area">
		        <a href="">查看详情</a>
		    </div> -->
		</div>
		 
	    
    </div>
</body>
</html>