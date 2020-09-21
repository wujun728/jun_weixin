@extends('layouts.common')
@section('title', '客户需求列表详情')
@section('style')

@endsection
@section('content')
    <div class="container">
        <h2>{{ $detail->name }}</h2>
        <h4>{{ $detail->phone }}</h4>
        <p>{{ $detail->demand }}</p>
    </div>
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
