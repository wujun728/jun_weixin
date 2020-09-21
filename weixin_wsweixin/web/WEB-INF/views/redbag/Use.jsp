<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/6/17
  Time: 19:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>使用红包</title>
    <%@include file="../CommonHeader.jsp"%>
</head>
<body>


<div class="page-group">
    <div class="page">
        <header class="bar bar-nav">
            <h1 class="title">使用红包</h1>
        </header>
        <div class="content">
            <c:url value="/redbag/solveuse" var="myurl"/>
            <form action="${myurl}" method="post" id="myform">
                <div class="list-block">
                    <div class="item-content">
                        <div class="item-media"><i class="icon icon-form-name"></i></div>
                        <div class="item-inner">
                            <div class="item-title label">消费</div>
                            <div class="item-input">
                                <input type="text" name="det" placeholder="${value}">
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="appid" value="${appid}">
                </div>
                <div class="content-block">
                    <div class="row">
                        <div class="col-50">
                            <a onclick="document.getElementById('myform').reset()" class="button button-big button-fill button-danger">重置</a>
                        </div>
                        <div class="col-50">
                            <a onclick="document.getElementById('myform').submit()" class="button button-big button-fill button-success">确认</a>
                        </div>
                    </div>
                </div>
            </form>
            <div class="content-padded">
                <h5>1、确认后将直接扣除您的红包金额，请在工作人员的指导下进行操作，否则后果自负</h5>
                <h5>2、在莱芜务升车业购买电动车、摩托车、三轮车、电动汽车时，红包金额可抵现金</h5>
                <h5>3、每辆车只能使用一个微信账号的红包，且不得与其他优惠方式同时使用</h5>
                <h5>4、使用红包后，红包金额即清零，红包金额不得兑换现金不设找零</h5>
                <h5>5、退换货时，红包价值不予退还现金</h5>
                <h5>6、微信红包活动最终解释权归莱芜务升所有</h5>
            </div>
        </div>
    </div>
</div>


<c:if test="${!empty tip}">
    <script>
        alert('${tip}');
    </script>
</c:if>
<script>$.init()</script>

</body>
</html>
