$(document).ready(function(){
	console.log($('.addserver-form').serialize());
})
$(function(){
            var validate = $(".addserver-form").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,   
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    form.submit();   //提交表单
                    $.ajax({
                    	type:"get",
                    	url:"http://localhost:8080/CattleShares/admin/addAdmin",
                    	data:$('.addserver-form').serialize(),
                    	async:true,
                    	success: function(data){
                    		var str ="<tr class='table-content'><td class='number'>"+adminUsername+"</td><td class=''>"+adminPassword+"</td><td class='number'><i class='small-icon small-change'></i><i class='small-icon small-deleteline'></i></td></tr>";
                    		$('.table').append(str);
                    	},
                    	error:function(){alert(data.msg);}
                    });
                },
                
                rules:{
                    adminUsername:{
                        required:true,
                        rangelength:[6,20],
                    },
                    
                    adminPassword:{
                        required:true,
                        rangelength:[6,20]
                    },
                    cadminPassword:{
                        equalTo:"#adminPassword"
                    }                    
                },
                messages:{
                    adminUsername:{
                        required:"必填",
                        rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符"),
                    },
                    adminPassword:{
                        required: "不能为空",
                        rangelength: $.format("密码最小长度:{0}, 最大长度:{1}。")
                    },
                    cadminPassword:{
                        equalTo:"两次密码输入不一致"
                    }                                    
                }
                
                          
            });    
    		
        });
