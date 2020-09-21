@extends('layouts.common')
@section('title', '客户需求列表')
@section('style')

@endsection

@section('content')
    <div class="container">
    <div class="list-group">
        @foreach($list as $person)
        <a href="{{ url('/detail',['id'=>$person->id]) }}" class="list-group-item active">
            <h4 class="list-group-item-heading">{{ $person->name }}</h4>
            <p class="list-group-item-text">{{ $person->phone }}</p>
        </a>
        @endforeach
    </div>
    </div>
@endsection

@section('js')
    <script type="text/javascript" src="{{ URL::asset('/dist/js/bootstrap.min.js')}}"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
        wx.config(<?php echo $js->config(array('onMenuShareQQ', 'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQZone'), false) ?>);
        wx.ready(function(){

        }
    </script>
@endsection
