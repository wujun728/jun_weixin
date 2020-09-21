$(function(){
	initActList();
});

var channel = '02';
function initActList(){
	var actUrl = _path + '/act/seckill/sklist';
	req(actUrl, {type : 'phone'}, function(d){
		if(d.code == '1'){
			if(d.list && d.list.length > 0){
				location.href = _view_path + '/seckill_mobile/index.html';
			}
		}else{ console.info('数据请求错误'); }
	});
}
