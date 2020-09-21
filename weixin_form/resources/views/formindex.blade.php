@extends('layouts.common')
@section('title', '客户需求表单')
@section('style')

@endsection
@section('content')
<div class="container">

    <form class="form-signin" role="form" action="/weixinform/public/signin" method="post">
        {{ csrf_field() }}
        <div class="form-group">
        <input type="text" class="form-control" placeholder="姓名" required="" autofocus="" name="Person[name]">
        </div>
        <div class="form-group">
        <input type="number" class="form-control" placeholder="联系方式" required="" name="Person[phone]">
        </div>
      {{--  <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>--}}
        <div class="form-group">
                <textarea name="Person[content]"  cols="40" rows="10" placeholder="用户需求"></textarea>
        </div>
        <div class="form-group">
        <button class="btn btn-lg btn-primary btn-block" type="submit">提交</button>
        </div>
    </form>

</div> <!-- /container -->
@endsection

@section('js')
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="./Signin Template for Bootstrap_files/ie10-viewport-bug-workaround.js.下载"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    wx.config(<?php echo $js->config(array('onMenuShareQQ', 'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQZone'), false) ?>);
    wx.ready(function(){

    }
</script>
@endsection
