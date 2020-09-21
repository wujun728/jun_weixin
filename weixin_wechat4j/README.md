# wechat4j

> 一个基于Web微信API的Java版微信客户端

作者：Allen

码云主页：[https://gitee.com/hotlcc](https://gitee.com/hotlcc)

[![gitee](https://img.shields.io/badge/github-%40hotlcc-blank.svg)](https://github.com/hotlcc)
[![License](https://img.shields.io/badge/license-Anti%20996-4EB1BA.svg)](https://raw.githubusercontent.com/996icu/996.ICU/master/LICENSE_CN)
<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg"></a>

## Web微信API文档

详见：[Web微信API文档](doc/web-weixin-api.md)

## 简单使用

```java
// 实例化微信客户端
Wechat wechat = new Wechat();
// 自动登录
wechat.autoLogin();
```

## 发送消息

### 文本消息

```java
// 通过userName发送文本消息
JSONObject sendTextToUserName(String content, String userName);
// 通过昵称发送文本消息
JSONObject sendTextToNickName(String content, String nickName);
// 通过备注名发送文本消息
JSONObject sendTextToRemarkName(String content, String remarkName);
// 发送文本消息（根据多种名称）
JSONObject sendText(String userName, String nickName, String remarkName, String content);
```

### 图片消息

```java
// 通过userName发送图片消息
JSONObject sendImageToUserName(String userName, byte[] mediaData, String mediaName, ContentType contentType);
JSONObject sendImageToUserName(String userName, File image);
// 通过昵称发送图片消息
JSONObject sendImageToNickName(String nickName, byte[] mediaData, String mediaName, ContentType contentType);
JSONObject sendImageToNickName(String nickName, File image);
// 通过备注名发送图片消息
JSONObject sendImageToRemarkName(String remarkName, byte[] mediaData, String mediaName, ContentType contentType);
JSONObject sendImageToRemarkName(String remarkName, File image);
// 发送图片消息（根据多种名称）
JSONObject sendImage(String userName, String nickName, String remarkName, byte[] mediaData, String mediaName, ContentType contentType);
JSONObject sendImage(String userName, String nickName, String remarkName, File image);
```

### 视频消息

```java
// 通过userName发送视频消息
JSONObject sendVideoToUserName(String userName, byte[] mediaData, String mediaName, ContentType contentType);
JSONObject sendVideoToUserName(String userName, File video);
// 通过昵称发送视频消息
JSONObject sendVideoToNickName(String nickName, byte[] mediaData, String mediaName, ContentType contentType);
JSONObject sendVideoToNickName(String nickName, File video);
// 通过备注名发送视频消息
JSONObject sendVideoToRemarkName(String remarkName, byte[] mediaData, String mediaName, ContentType contentType);
JSONObject sendVideoToRemarkName(String remarkName, File video);
// 发送视频消息（根据多种名称）
JSONObject sendVideo(String userName, String nickName, String remarkName, byte[] mediaData, String mediaName, ContentType contentType);
JSONObject sendVideo(String userName, String nickName, String remarkName, File video);
```

> 更多消息类型支持尽请期待。

## 消息处理器

> 通过在实例化时添加消息处理器来处理接收到的消息<br>
> 消息处理器需要实现`ReceivedMsgHandler`接口

```java
wechat.addReceivedMsgHandler(new ReceivedMsgHandler() {
    @Override
    public void handleAllType(Wechat wechat, ReceivedMsg msg) {
        UserInfo contact = wechat.getContactByUserName(false, msg.getFromUserName());
        String name = StringUtil.isEmpty(contact.getRemarkName()) ? contact.getNickName() : contact.getRemarkName();
        System.out.println(name + ": " + msg.getContent());
    }
});
```

