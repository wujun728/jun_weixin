$("#answ-btn").click(function(){
	$(".answer-input").css('display','block');
	$("#answ-btn").css('display','none');
	$("#subm-btn").css('display','inline-block');
	$('.answer').css('display','none'); 
})
$("#subm-btn").click(function(){
	var answertext = $('#answertext').val();
	if(answertext==""){
		$(".answer-input").css('display','none');
		$("#answ-btn").css('display','inline-block');
		$("#subm-btn").css('display','none');
	}else{
		$('.answer-input').css('display','none');
		$('.answer div').html(answertext);
		$('.answer').css('display','block');
		$("#answ-btn").css('display','inline-block');
		$("#subm-btn").css('display','none');
	}
	
})
