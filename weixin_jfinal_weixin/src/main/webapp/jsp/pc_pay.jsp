<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% String ctxPath = request.getContextPath(); %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JFinal-weixin PC支付测试</title>
    <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
    <script type="text/javascript" src="<%=ctxPath%>/js/jquery.qrcode.min.js"></script>
</head>
<body>
JFinal-weixin PC支付测试<br>
使用jquery-qrcode生成二维码：https://github.com/jeromeetienne/jquery-qrcode
<br/>
<div id="output"></div>
</body>
<script type="text/javascript">
    jQuery(function(){
        jQuery('#output').qrcode("${code_url}");
    })
</script>
</html>