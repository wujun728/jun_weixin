<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName()+ path ;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=0">
<title>微信公众号分享</title>
<link rel="stylesheet" href="<%=path%>/static/weui/lib/weui.css" />
<link rel="stylesheet" href="<%=path%>/static/weui/css/jquery-weui.css" />
<link rel="stylesheet" href="<%=path%>/css/lgrg.css" />
</head>
<div class="page">

	<div class="hd">

		<h1 class="page_title">
			<img alt="" width="80px" height="80px"
				src="<%=path%>/images/logo.png">
		</h1>
		<p class="page_desc">极速开发微信公众号</p>
	</div>
	<div class="bd">
		<div class="weui_cells weui_cells_form">
			<div class="weui_cell">
				<div class="weui_cell_hd">
					<label class="weui_label">微信号</label>
				</div>
				<div class="weui_cell_bd weui_cell_primary">
					<input class="weui_input" type="tel" placeholder="请输入微信号">
				</div>
			</div>
			<div class="weui_cell">
				<div class="weui_cell_hd">
					<label class="weui_label">公众号名称</label>
				</div>
				<div class="weui_cell_bd weui_cell_primary">
					<input class="weui_input" type="tel" placeholder="请输入公众号名称">
				</div>
			</div>
			<div class="weui_cell">
				<div class="weui_cell_bd weui_cell_primary">
					<div class="weui_uploader">
						<div class="weui_uploader_hd weui_cell">
							<div class="weui_cell_bd weui_cell_primary">公众号二维码</div>
							<div class="weui_cell_ft">0/6</div>
						</div>
						<div class="weui_uploader_bd">
							<ul class="weui_uploader_files" onclick="previewImage();">
								<li class="weui_uploader_file" style="background-image:url(http://shp.qpic.cn/weixinsrc_pic/pScBR7sbqjOBJomcuvVJ6iacVrbMJaoJZkFUIq4nzQZUIqzTKziam7ibg/)"></li>
								<li class="weui_uploader_file weui_uploader_status"
									style="background-image: url(http://shp.qpic.cn/weixinsrc_pic/pScBR7sbqjOBJomcuvVJ6iacVrbMJaoJZkFUIq4nzQZUIqzTKziam7ibg/)">
									<div class="weui_uploader_status_content">50%</div>
								</li>
								<div id="insertImage"></div>
							</ul>
							<div class="weui_uploader_input_wrp" id="chooseImage">
								<button class="weui_uploader_input" >
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="weui_cell">
				<div class="weui_cell_bd weui_cell_primary">
					<div class="weui_cells_title">公众号简介</div>
					<div class="weui_cells weui_cells_form">
						<div class="weui_cell">
							<div class="weui_cell_bd weui_cell_primary">
								<textarea class="weui_textarea" placeholder="请输入公众号简介" rows="3"></textarea>
								<div class="weui_textarea_counter">
									<span>0</span>/200
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			 <div class="weui_btn_area">
		    <a class="weui_btn weui_btn_primary" href="#" id="">提交</a>
		</div>
		</div>
	</div>



	<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
	<script type='text/javascript' src="<%=path %>/static/weui/js/jquery-weui.js"></script>
	<!-- layer -->
	<script src="<%=path %>/static/layer/layer.js"></script>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
	<script type="text/javascript">
	wx.config({
		  debug: true,
	      appId:'${appId}',
	      timestamp: '${timestamp}',
	      nonceStr: '${nonceStr }',
	      signature: '${signature}',
	      jsApiList: [
	        'checkJsApi',
	        'onMenuShareTimeline',
	        'onMenuShareAppMessage',
	        'onMenuShareQQ',
	        'onMenuShareWeibo',
	        'hideMenuItems',
	        'showMenuItems',
	        'hideAllNonBaseMenuItem',
	        'showAllNonBaseMenuItem',
	        'translateVoice',
	        'startRecord',
	        'stopRecord',
	        'onRecordEnd',
	        'playVoice',
	        'pauseVoice',
	        'stopVoice',
	        'uploadVoice',
	        'downloadVoice',
	        'chooseImage',
	        'previewImage',
	        'uploadImage',
	        'downloadImage',
	        'getNetworkType',
	        'openLocation',
	        'getLocation',
	        'hideOptionMenu',
	        'showOptionMenu',
	        'closeWindow',
	        'scanQRCode',
	        'chooseWXPay',
	        'openProductSpecificView',
	        'addCard',
	        'chooseCard',
	        'openCard'
	      ]
	  });
	//  拍照、本地选图
	  var images = {
	    localId: [],
	    serverId: []
	  };
	wx.ready(function () {
		document.querySelector('#chooseImage').onclick = function () {
		    wx.chooseImage({
		      success: function (res) {
		        images.localId = res.localIds;
		        alert('已选择 ' + res.localIds.length + ' 张图片');
		      }
		    });
		  };
		 
		  document.querySelector('#chooseImage').onclick = function () {
		    wx.chooseImage({
		      success: function (res) {
		        images.localId = res.localIds;
		        alert('已选择 ' + res.localIds.length + ' 张图片');
		        if (images.localId.length == 0) {
	      		      alert('请先选择图片');
	      		      return;
	      		}	
		        
		        var ss='';
		        
		        for (var i = 0; i < images.localId.length; i++) {
		        	ss=ss+'<li class="weui_uploader_file" style="background-image:url('+images.localId[i]+')"</li>'
		        }
		        $("#insertImage").html(ss); 
		        
		        
		        var i = 0, length = images.localId.length;
		        images.serverId = [];
		        function upload() {
		          wx.uploadImage({
		            localId: images.localId[i],
		            success: function (res) {
		              alert(JSON.stringify(res));
		              i++;
		              alert('已上传：' + i + '/' + length);
		              images.serverId.push(res.serverId);
		              if (i < length) {
		                upload();
		              }
		            },
		            fail: function (res) {
		              alert(JSON.stringify(res));
		            }
		          });
		        }
		        upload();
		        
		      }
		    });
		  };  
		  
	});
	
	//预览图片
	function previewImage() {
		if (images.localId.length == 0) {
		      alert('请先选择图片');
		      return;
		}
		//预览图片
        wx.previewImage({
            current: images.localId[0], // 当前显示图片的http链接
            urls:  images.localId// 需要预览的图片http链接列表
        });
	}
	</script>
	</body>
</html>