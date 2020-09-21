<%--
  Created by IntelliJ IDEA.
  User: Wang Genshen
  Date: 2017-07-04
  Time: 22:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
%>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>门票支付</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="<%=path %>/plugins/sweet-alert/sweet-alert.css" rel="stylesheet"/>
    <link href="<%=path %>/css/main.css" rel="stylesheet" />
</head>
<body>
<div class="row none-box">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 none-box">
        <img src="<%=path %>/${applicationScope.logo_img}" class="img-responsive"/>
    </div>
</div>
<div class="row none-box">
    <div class="col-xs-12 col-sm-12 com-md-12 col-lg-12">
        <h4>
            欢迎您：${sessionScope.user.wechatNickname}
        </h4>
    </div>
</div>
<div class="row none-box">
    <p>您正在购买门票，门票单价：<span id="ticketPrice" style="font-weight: bold;color:red;">${applicationScope.ticket_price }</span>元</p>
    <form id="buyForm" method="post" action="<%=path%>/ticket/pay">
        <input type="hidden" name="l1" value="${requestScope.l1}"/>
        <input type="hidden" name="l2" value="${requestScope.l2}"/>
        <div class="form-group">
            <input type="number" class="form-control" id="quantity" name="quantity" placeholder="请输入购买门票数量" value="1"/>
        </div>
        <p>您共需支付<span id="totalCost" style="font-weight:bold;color:red;">0</span>元</p>
        <input type="submit" class="btn btn-primary col-xs-12 " value="确认支付" onclick="return pay();"/>
    </form>
</div>

</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/plugins/sweet-alert/sweet-alert.min.js"></script>
<script src="<%=path %>/js/main.js"></script>
<script>

    $(function() {
        var price = ${applicationScope.ticket_price };
        $("#totalCost").text(price * parseInt($("#quantity").val()));
        $('#quantity').bind('input propertychange', function() {
            var quantity = $(this).val();
            var quantityInt = parseInt(quantity);
            $(this).val(quantityInt);
            if (isNaN(quantityInt)) {
                $("#totalCost").text(0);
            } else {
                $("#totalCost").text(price * quantityInt);
            }
        });
    });
</script>
</html>
