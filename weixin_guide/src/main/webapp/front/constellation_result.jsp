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
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=0">
<title>工具集合</title>
<link rel="stylesheet" href="<%=path %>/static/weui/lib/weui.css"/>
<link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css"/>
<link rel="stylesheet" href="<%=path %>/css/index.css"/>
</head>
<body>
	<div class="container js_container"></div>
	<div class="page">
		<div class="hd">

			<h1 class="page_title">
				<img alt="" width="80px" height="80px"
					src="<%=path%>/images/constellation/constellation.png">
			</h1>
			<p class="page_desc">
				在线工具集合<br />星座运势
			</p>
		</div>

		<div class="weui_cells">
			 <c:if test="${not empty constellation.name}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/cons.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>星座名称</p>
					</div>
					<div class="weui_cell_ft">${constellation.name}</div>
				</div>
			  </c:if>
			  <c:if test="${not empty constellation.date}">
			  		<div class="weui_cell">
						<div class="weui_cell_hd">
							<img
								src="<%=path %>/images/constellation/time.png"
								alt="" style="width: 20px; margin-right: 5px; display: block">
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<p>时间</p>
						</div>
						<div class="weui_cell_ft">${constellation.date}</div>
					</div>
			  </c:if>
			  <c:if test="${not empty constellation.weekDate}">
			  		<div class="weui_cell">
						<div class="weui_cell_hd">
							<img
								src="<%=path %>/images/constellation/time.png"
								alt="" style="width: 20px; margin-right: 5px; display: block">
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<p>时间</p>
						</div>
					</div>
					<div class="weui_cells_title">${constellation.weekDate}</div>
			  </c:if>
			  <c:if test="${not empty constellation.all}">
			  		<div class="weui_cell">
						<div class="weui_cell_hd">
							<img
								src="<%=path %>/images/constellation/zonghezhishu.png"
								alt="" style="width: 20px; margin-right: 5px; display: block">
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<p>综合指数</p>
						</div>
						<div class="weui_cell_ft">${constellation.all}</div>
					</div>
			  </c:if>
			  <c:if test="${not empty constellation.monthAll}">
			  		<div class="weui_cell">
						<div class="weui_cell_hd">
							<img
								src="<%=path %>/images/constellation/zonghezhishu.png"
								alt="" style="width: 20px; margin-right: 5px; display: block">
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<p>综合概述</p>
						</div>
					</div>
					<div class="weui_cells_title">${constellation.monthAll}</div>
			  </c:if>
			  <c:if test="${not empty constellation.health}">
			  		<div class="weui_cell">
						<div class="weui_cell_hd">
							<img
								src="<%=path %>/images/constellation/health.png"
								alt="" style="width: 20px; margin-right: 5px; display: block">
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<p>健康指数</p>
						</div>
						<div class="weui_cell_ft">${constellation.health}</div>
					</div>
			  </c:if>	
			  <c:if test="${not empty constellation.weekHealth}">
			  		<div class="weui_cell">
						<div class="weui_cell_hd">
							<img
								src="<%=path %>/images/constellation/health.png"
								alt="" style="width: 20px; margin-right: 5px; display: block">
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<p>健康</p>
						</div>
					</div>
					<div class="weui_cells_title">${constellation.weekHealth}</div>
			  </c:if>	
				
			<c:if test="${not empty constellation.love}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/love.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>爱情指数</p>
					</div>
					<div class="weui_cell_ft">${constellation.love}</div>
				</div>
			</c:if>
			<c:if test="${not empty constellation.weekLove}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/love.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>爱情</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.weekLove}</div>
			</c:if>
			<c:if test="${not empty constellation.money}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/finance.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>财运指数</p>
					</div>
					<div class="weui_cell_ft">${constellation.money}</div>
				</div>
			</c:if>	
			<c:if test="${not empty constellation.weekFinance}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/finance.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>财运</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.weekFinance}</div>
			</c:if>	
			<c:if test="${not empty constellation.work}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/work.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>工作指数</p>
					</div>
					<div class="weui_cell_ft">${constellation.work}</div>
				</div>
			</c:if>	
			<c:if test="${not empty constellation.weekWork}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/work.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>工作</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.weekWork}</div>
			</c:if>	
			<c:if test="${not empty constellation.number}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/number.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>幸运数字</p>
					</div>
					<div class="weui_cell_ft">${constellation.number}</div>
				</div>
			</c:if>	
			<c:if test="${not empty constellation.color}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/color.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>幸运色</p>
					</div>
					<div class="weui_cell_ft">${constellation.color}</div>
				</div>
			</c:if>	
			<c:if test="${not empty constellation.QFriend}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/QFriend.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>速配星座</p>
					</div>
					<div class="weui_cell_ft">${constellation.QFriend}</div>
				</div>
			</c:if>	
			<c:if test="${not empty constellation.luckyStone}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/luckyStone.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>幸运石</p>
					</div>
					<div class="weui_cell_ft">${constellation.luckyStone}</div>
				</div>
			</c:if>	
			<c:if test="${not empty constellation.summary}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/summary.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>概要</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.summary}</div>
			</c:if>
			
			<c:if test="${not empty constellation.job}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/job.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>事业</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.job}</div>
			</c:if>
			
			<c:if test="${not empty constellation.info}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/text.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>解读概要</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.info}</div>
			</c:if>	
			<c:if test="${not empty constellation.text}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/text.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>解读详细信息</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.text}"</div>
			</c:if>	
			<c:if test="${not empty constellation.career}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/career.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>求职</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.career}</div>
			</c:if>
			<c:if test="${not empty constellation.finance}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/finance.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>财运</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.finance}</div>
			</c:if>		
			<c:if test="${not empty constellation.yearFinance}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/finance.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>财运</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.yearFinance}</div>
			</c:if>		
			<c:if test="${not empty constellation.yearLove}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/love.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>感情</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.yearLove}</div>
			</c:if>
			<c:if test="${not empty constellation.yearHealth}">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<img
							src="<%=path %>/images/constellation/health.png"
							alt="" style="width: 20px; margin-right: 5px; display: block">
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<p>健康</p>
					</div>
				</div>
				<div class="weui_cells_title">${constellation.yearHealth}</div>
			</c:if>
		</div>
	</div>
</body>
</html>