/**
 * Created by lfl on 2018/2/2.
 */

$.when(getFS).done(function () {
    initComm();
    req(url.ruleUrl,{},function (resp) {
        if(resp.code==1){
            $(".un-guess-rule").html(resp.data);
        }else {
            alert("系统忙");
        }
    },"json");
})