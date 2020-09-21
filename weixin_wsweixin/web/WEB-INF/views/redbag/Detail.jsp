<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>我的详情</title>
    <%@include file="../CommonHeader.jsp"%>
</head>
<body>

<div class="page-group">
    <div class="page">
        <header class="bar bar-nav">
            <h1 class="title">我的详情</h1>
        </header>
        <div class="content">
            <div class="content-block">
                <div class="content-block-title">个人信息</div>
                <div class="list-block">
                    <ul>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">昵称</div>
                                <div class="item-after">${userInfo.username}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">联系电话</div>
                                <div class="item-after">${userInfo.phone}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">地址</div>
                                <div class="item-after">${userInfo.address}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title"><strong>红包总额</strong></div>
                                <div class="item-after">${userInfo.redValue}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content-block">
                <div class="content-block-title">红包纪录</div>
                <div class="list-block">
                    <ul>
                        <c:forEach items="${recordList}" var="cur">
                            <li class="item-content">
                                <div class="item-inner">
                                    <div class="item-title">${cur.time.toLocalDate()}</div>
                                    <div class="item-after">${cur.value}</div>
                                </div>
                            </li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>


<script>$.init()</script>


</body>
</html>
