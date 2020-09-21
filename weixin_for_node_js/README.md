##微信公众平台开发模式 Node.js SDK

#####作者：____′↘夏悸 http://weibo.com/521090828

默认配置是过滤（/wechat/*）类型的所有请求。星号表示在公众平台里面配置的Token。

####例如：

你的Token如果设置为abcdefg的话，那么你对应配置的URL就应该为 http://xxxxx.com/wechat/abcdefg

####试用配置：

```
#####接口配置信息
URL：http://wechat-node-js.jeasyuicn.com/wechat/qwertyuiop
Token：qwertyuiop
```

##演示账号：

![image](http://bbs.jeasyuicn.com/data/attachment/common/cf/180311ezs0kpcmaffi2uci.jpg)

* 1、打开微信扫描上面二维码 
* 2、或者添加微信号: jeasyui


###功能介绍：

* 回复 0 查看菜单;
* 回复 1 查看社区最新动态;
* 回复 2 本周推荐;
* 回复 3 查看星座运势;
* 回复 4 轻松一刻;
* 回复 5 祝福墙;
* 回复 6 快递查询;
* 回复 @城市名称 查看天气(eg: @北京);
* 回复 zip#地名 查询邮编区号(eg:zip#北京);
* 回复 #内容 问题意见反馈;