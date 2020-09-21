<%--
  Created by IntelliJ IDEA.
  User: Wang Genshen
  Date: 2017-07-04
  Time: 19:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    String path = request.getContextPath();
%>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>个人主页</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
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
        <c:choose>
            <c:when test="${empty(sessionScope.user.phone) }">
                <a class="btn btn-primary btn-lg col-xs-12" href="<%=path %>/user/phone">填写手机号，参与抽奖活动！</a>
            </c:when>
            <c:otherwise>
                <c:choose>
                    <c:when test="${requestScope.game_status == 'gaming'}">
                        <a class="btn btn-primary btn-lg col-xs-12" href="<%=path %>/user/choose_count">参与抽奖！</a>
                    </c:when>
                    <c:when test="${requestScope.game_status == 'game_over'}">
                        <p class="text-warning col-xs-12">抽奖已经结束，欢迎下次参与！</p>
                    </c:when>
                    <c:when test="${requestScope.game_status == 'not_start'}">
                        <p class="text-warning col-xs-12">抽奖活动将在${applicationScope.activity_begin_time}开始！</p>
                        <a class="btn btn-primary btn-lg col-xs-12" href="<%=path %>/user/home">刷新</a>
                    </c:when>
                </c:choose>
                <a class="btn btn-primary btn-lg col-xs-12" href="<%=path %>/user/payed" style="margin-top: 5px;">查看我的参与情况</a>
            </c:otherwise>
        </c:choose>

    </div>
    <div class="row none-box">
        <div class="col-xs-12">
            <h4>活动说明</h4>
            <p>1、活动时间<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2017-8-20 19:19 至 2017-8-20 22:00</p>
            <p>2、活动形式<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在下方的数字中选择您喜欢的辛运数字点击打勾（每次最多选择6个数字即6个抽奖资格），确认好数字打勾后点击“确认参与抽奖”会出现您所需要支付的金额，完成支付即成功购买到抽奖资格。您所支付的金额从0.01元至100元随机对应。每次大奖开放10000个参与资格，每次中出10台价值17.98万的三加壹共享电动汽车五年单独使用权或分红权。
	    </p>
        </div>
    </div>
</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
</html>
