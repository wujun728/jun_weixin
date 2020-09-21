$('.account-type').blur(function(){
	var bank = $('#bank').is(':selected');
	if(bank==true){
		$('.bank').css('display','block');
	}else{
		$('.bank').css('display','none');
	}
})
$('.small-change').click(function(){
	$('.change-umessage').slideDown();
	$('.back').fadeIn();
})
$('.close').click(function(){
	$('.change-umessage').slideUp();
	$('.back').fadeOut();
})
	
