<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	/* String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/"; 
	因为微信使用的是80端口 再JSSDK中签名验证不要端口号
	
	*/
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=0">
<title>Javen微信开发指南</title>
<link rel="stylesheet" href="<%=path%>/static/weui/lib/weui.css" />
<link rel="stylesheet" href="<%=path%>/css/index.css" />
<style>
img{
	    width: 80px;
	    margin: 3px;
}
.div-jj{
 margin: 10px;
}
</style>
</head>
<body>
	<div class="container js_container"></div>
	<div class="page">

		<div class="hd">

			<h1 class="page_title">
				<img alt="" width="80px" height="80px"
					src="<%=path%>/images/logo.png">
			</h1>
			<p class="page_desc">极速开发微信公众号</p>
		</div>
			<div class="div-jj">			
			单文件：<input type="file" name="imgsil" id="imgsil"/>
			<img src="<%=path%>/images/iconfont-jia.png" id="img"/>
			</div>
			<div  class="div-jj">
			多文件：<input type="file" name="imgmul" id="imgmul" multiple />
			<img src="<%=path%>/images/iconfont-jia.png"  id="imgl"/>
			</div>


	</div>
	<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
	<script type="text/javascript" src="<%=path %>/static/weui/js/ajaxfileupload.js"></script>
	<script type="text/javascript">
    //多个文件上传
	   $("#imgmul").change(function(){
			   $.ajaxFileUpload({
			        url:'/ajaxfile/uploadImgMul',
			        secureuri : false, // 是否启用安全提交，默认为false
			        fileElementId : 'imgmul', // file控件id
			        dataType : 'json',
			        success : function(data, status) {
			            var $str="";
			        	if (data.error == 0) {
			                var src = data.src;			               	
			                for(var i=0;i<src.length;i++){
			                	  $str+=' <img src="'+src[i]+'" />';
			                }		                
			                $("#imgl").before($str); //显示图片 
			            } else {
			            	alert(data.message);
			            }
			        },
			        error : function(data, status) {
			        	alert(data.message);
			        }
			    });	  
	   });
 //单文件上传
 $("#imgsil").change(function(e){
	   $.ajaxFileUpload({
	        url : '/ajaxfile/uploadImg',   //提交的路径
	        secureuri : false, // 是否启用安全提交，默认为false
	        fileElementId : 'imgsil', // file控件id
	        dataType : 'json',
	        success : function(data, status) {
	            if (data.error == 0) {
	                var src = data.src;	                          
	                $("#img").attr("src",src); //显示图片              
	            } else {
	            	alert(data.message);
	            }
	        },
	        error : function(data, status) {
	        	alert(data.message);
	        }
	    });

 });
	</script>
</body>
</html>