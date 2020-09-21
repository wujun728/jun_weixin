$(document).ready(function(){
	console.log($('.login-form').serialize());
})

function check_login()
{
 var name=$("#adminUsername").val().trim();
 var pass=$("#adminPassword").val().trim();
$("#adminUsername").focus(function(){
	$(".prompt-username").css("display","none");
})
$("#adminPassword").focus(function(){
	$(".prompt-psw").css("display","none");
})
 if(name==""||pass==""){
 	if(name==""&&pass==""){
 		$(".prompt").css("display","inline-block");
 		return false;
 	}else if(pass==""){
 		$(".prompt-psw").css("display","inline-block");
 		return false;
 	}else{
 		$(".prompt-username").css("display","inline-block");
 		return false;
 	}
 	$(".form").css("text-align","left");
 	$("#login_form").removeClass('shake_effect');  
  	setTimeout(function(){
   		$("#login_form").addClass('shake_effect')
  	},1);  
 }else{
 	$.ajax({
 		type:"post",
 		url:"http://localhost:8080/CattleShares/login/chenck_login",
 		async:true,
 		data:$('.login-form').serialize(),
 		success:function(data){
            if (data.success) {
                window.location.href="../login/index";
            } else {
                ;
            }
 		},
 		error:function(){alert('用户名验证失败');}
 	});
 }
 
 
}
//function check_register(){
//	var name = $("#r_user_name").val();
//	var pass = $("#r_password").val();
//	var email = $("r_email").val();
//	if(name!="" && pass!="" && email != "")
//	 {
//	  alert("注册成功！");
//	  $("#user_name").val("");
//	  $("#password").val("");
//	 }
//	 else
//	 {
//	  $("#login_form").removeClass('shake_effect');  
//	  setTimeout(function()
//	  {
//	   $("#login_form").addClass('shake_effect')
//	  },1);  
//	 }
//}
$(function(){
//	$("#create").click(function(){
//		check_register();
//		return false;
//	})
	$("#login").click(function(){
		
		check_login();
		$("input").val("");
		return false;
	})
//	$('.message a').click(function () {
//		$('form').animate({
//			height: 'toggle',
//			opacity: 'toggle',
//		}, 'slow');
//	});
})
//catchYzm();
//function catchYzm(){
//	//$("#r_user_name").css("width","50%");
//	var secon=5;
//	$("#catchYzm").click(function(){
//		$("#catchYzm").attr("disabled", true);
//		var time = setInterval(function(){
//			secon--;
//			$("#catchYzm").val(secon+"秒后重新获取");
//			
//			if(secon==0){
//				$("#catchYzm").val("获取验证码");
//				$("#catchYzm").removeAttr("disabled");
//				clearInterval(time);
//				secon=5;
//			}
//		},1000);
//		
//		
//	})
//}

//$(function(){
//		$("#user_name").blur(function(){
//		if($(this).val()!=""){
//			$(".imgsucced").css("display","inline-block");
//		}else{
//		}
//	});
//	
//	$("#password").on("blur",function(){
//		//$(".uname").append("<img src='img/add.png' />");
//	});
//})
