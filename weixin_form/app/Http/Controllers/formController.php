<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Http\Requests;
use EasyWeChat\Payment\Order;
use Log;
use App\Person;
use Redis;

class formController extends Controller
{
    /**
     * 处理微信的请求消息
     *
     * @return string
     */
    public function serve()
    {

        Log::info('request arrived.'); # 注意：Log 为 Laravel 组件，所以它记的日志去 Laravel 日志看，而不是 EasyWeChat 日志
        $wechat = app('wechat');
        $wechat->server->setMessageHandler(function($message){
            return "欢迎关注 overtrue！";
        });

        Log::info('return response.');

        return $wechat->server->serve();
    }



    //微信授权页
    public function oauth(){
        session_start();
        $app = app('wechat');
        $oauth = $app->oauth;

        // 获取 OAuth 授权结果用户信息william-oCfHGvnMTMkruI0BFTHjJctL6_JY
        $user = $oauth->user();


        $_SESSION['wechat_user'] = $user->toArray();
        $targetUrl = empty($_SESSION['target_url']) ? '/' : $_SESSION['target_url'];
        return redirect($targetUrl);
        //debug 不知道为什么有bug？header('location:'. $targetUrl); // 跳转到 user/profile
    }
    public function form(Request $request)
    {
        session_start();
        $app = app('wechat');
        $oauth = $app->oauth;
        if (empty($_SESSION['wechat_user'])) {
            $_SESSION['target_url'] = '/weixinform/public/form';
                       //此法不通？session()->put('target_url','/color-run/public/colorRun');
            return $oauth->redirect();
        }
        //已登录
        $user = $_SESSION['wechat_user'];
        $new_user = Person::firstOrCreate(['open_id' => $user['id']]);
        if(!empty($new_user)){
            $result = Person::where('open_id', $user['id'])
                ->update([
                    'nickname' => $user['nickname'],
                    'avatar' => $user['avatar'],
                ]);
            if(!$result){
                echo('插入数据库失败');
            }
        }
        $js = $app->js;
        return view('formindex',['js'=>$js]);
    }

    public function user(){
        session_start();
        $app = app('wechat');
        $oauth = $app->oauth;

        //$_SESSION['wechat_user'] = '';
        // 未登录
        if (empty($_SESSION['wechat_user'])) {
            $_SESSION['target_url'] = '';
            return $oauth->redirect();
            // 这里不一定是return，如果你的框架action不是返回内容的话你就得使用
            // $oauth->redirect()->send();
        }

        //已登录
        $user = $_SESSION['wechat_user'];

        return $user;
    }

    public function signin(Request $request){
        session_start();
        $person=$request->input('Person');
        $user = $_SESSION['wechat_user'];
        Person::where('open_id', $user['id'])
            ->update([
                'name'=>$person['name'],
                'demand'=>$person['content'],
                'phone'=>$person['phone'],
            ]);
        $app = app('wechat');
        $js = $app->js;
        $list=Person::where('open_id', $user['id'])
            ->get();
        /*dd($list);*/
       return view('formlist',['js'=>$js,'list'=>$list]);
    }

    public function detail($id){
        $app = app('wechat');
        $js = $app->js;
        $detail=Person::find($id);
        return view('formdetail',['detail'=>$detail,'js'=>$js]);
    }
}
