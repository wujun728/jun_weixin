# Web微信API文档

## 1、登录

Web微信登录页面是[https://wx.qq.com](https://wx.qq.com)，以下内容以此页开始。

### 1.1、获取登录uuid

进入Web微信登录页面后，在开发者工具中查看网络请求情况，可以发现在二维码图片加载之前，浏览器发送了一次 GET 请求：

```
https://login.wx.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=zh_CN&_=1532078129220
```

该请求用于获取登录uuid，分析发现有如下URL参数：

|参数名|示例值|描述|
|---|---|---|
|appid|wx782c26e4c19acffb|这个值不变，表示来自Web版微信；|
|redirect_uri|https%3A%2F%2Fwx2.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage|跳转页面；非必须值；|
|fun|new|固定值；|
|lang|zh_CN|语言；zh_CN表示中文；|
|_|1532078129220|13位时间戳；|

然后服务器返回数据：

```
window.QRLogin.code = 200; window.QRLogin.uuid = "wcXrINkB9Q==";
```

- window.QRLogin.code的值为200时表示成功，为其它值均表示失败。
- window.QRLogin.uuid的值为获取到的uuid，每次刷新会获取到不同的uuid，实际上uuid是服务端用来标识每一次登录的。

### 1.2、获取二维码

接着会发现如下 GET 请求：

```
https://login.weixin.qq.com/qrcode/wcXrINkB9Q==
```

该url为二维码图片的链接，url尾部的字符串即是上面获取到的uuid。

### 1.3、等待确认登录

在获取二维码的请求之后，会发现如下 GET 请求：

```
https://login.wx.qq.com/cgi-bin/mmwebwx-bin/login?loginicon=true&uuid=wcXrINkB9Q==&tip=0&r=1223005686&_=1532080293141
```

这是等待扫描登录并获取跳转url的请求。如果没有及时扫描二维码，一定时间后该请求会重复出现，表示浏览器在轮询请求。

URL参数分析：

|数名|示例值|描述|
|---|---|---|
|loginicon|true|固定值；|
|uid|wcXrINkB9Q==|同前面的uuid；|
|tip|0或1|0表示等待用户扫码确认；1表示等待用户直接确认，用于push登陆时；|
|r|1223005686|10位随机数|
|_|1532080293141|13位时间戳；|

如果没有及时扫描二维码，服务器返回数据：

```
window.code=408;
```

- 表示没有轮询到认证信息，此时需要再次发送该请求。

如果一直没有扫描二维码，服务器返回数据：

```
window.code=400;
```

- 表示该次登录uuid失效，即二维码失效，此时会停止轮询，需要重新获取uuid才能继续。

及时扫码认证之后，在点击确认登录之前，服务器返回数据：

```
window.code=201;
```

- 表示微信APP端已经扫码，但还没有点击确认。

及时扫码并点击确认之后，服务器返回：

```
window.code=200;
window.redirect_uri="https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage?ticket=A51bGY49nxxxxxxx1wNPC3@qrticket_0&uuid=wcXrINkB9Q==&lang=zh_CN&scan=1532083897";
```

- window.code的值为200表示APP端认证成功。
- window.redirect_uri为需要跳转的url。

### 1.4、获取登录认证码

微信APP端认证后，会产生的新的 GET 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage?ticket=A51bGY49nxxxxxxx1wNPC3@qrticket_0&uuid=wcXrINkB9Q==&lang=zh_CN&scan=1532083897&fun=new&version=v2
```

我们发现该请求即是上一步认证成功之后得到的redirect_uri再拼上&fun=new&version=v2。
该请求发送之后，其它web或pc端登录的微信会被踢下线。

URL参数分析：

|数名|示例值|描述|
|---|---|---|
|ticket|A51bGY49nxxxxxxx1wNPC3@qrticket_0|保存不变即可；|
|uuid|wcXrINkB9Q==|同前面的uuid；|
|lang|zh_CN|语言；zh_CN表示中文；|
|scan|1532083897|用户扫描的时间戳；|
|fun|new|固定值；|
|version|v2|固定值；|

服务器返回数据：

```XML
<error>
    <ret>0</ret>
    <message></message>
    <skey>@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp</skey>
    <wxsid>8rwxxxxxxxxxHq2P</wxsid>
    <wxuin>26xxx7</wxuin>
    <pass_ticket>AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn=</pass_ticket>
    <isgrayscale>1</isgrayscale>
</error>
```

***（为了个人隐私，以上返回数据有打码）***

- ret表示请求返回状态，0表示成功。
- skey、wxsid和wxuin都是具体微信用户的信息，不会变化，在后续的通讯中需要用到。
- pass_ticket在初始化页面时需要用到。

### 1.5、退出登录

如果点击退出，我们会发现先后出现如下两个 POST 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxlogout?redirect=1&type=0&skey=%40crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxlogout?redirect=1&type=1&skey=%40crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp
```

这两个请求唯一的区别就是type的值，先是0再是1。

URL参数分析：

|数名|示例值|描述|
|---|---|---|
|redirect|1|固定值；|
|type|0或1|0或1，固定值；|
|skey|%40crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp|登录时获取的；需要urlencode。|

FORM表单参数分析：

|参数名|示例值|描述|
|---|---|---|
|sid||登录时获取的；|
|uin||登录时获取的；|

服务器返回数据：

- 该请求会导致页面跳转，没有返回数据。

### 1.6、push登录

点击退出后，页面会出现点击直接登录的页面，点击登录之后，会发现产生一个叫webwxpushloginurl的 GET 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxpushloginurl?uin=26xxx7
```

该请求是不扫码获取uuid的方式，仅用在手动退出登录之后，uuid获取之后还是继续1.3的等待确认。

URL参数分析：

|数名|示例值|描述|
|---|---|---|
|uin|26xxx7|同前面获取的uin；|

服务器返回数据：

```JavaScript
{
    "ret": "0",
    "msg": "all ok",
    "uuid": "A_1_xxxw=="
}
```

- ret为0表示成功，为1表示uin错误等失败。
- uuid为新的uuid。经过反复“退出-push登录-退出-push登录”测试发现，全程uin保持不变，uuid会变化。

## 2、数据同步

### 2.1、页面初始化

上面已经拿到了用户认证码，接着需要登录并初始化页面。

初始化页面就是向服务端请求常用的联系人等信息，如下 POST 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=1219172280&lang=zh_CN&pass_ticket=AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn=
```

URL参数分析：

|数名|示例值|描述|
|---|---|---|
|r|1219172280|10位随机数；|
|lang|zh_CN|语言；zh_CN表示中文；|
|pass_ticket|AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn=|上一步获取到的；|

POST的数据（JSON）：

```JavaScript
{
    "BaseRequest": {
        "DeviceID": "e659xxxxxxxx3006",
        "Sid": "8rwxxxxxxxxxHq2P",
        "Skey": "@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",
        "Uin": "26xxx7"
    }
}
```

POST参数分析：

|数名|示例值|描述|
|---|---|---|
|BaseRequest.DeviceID|e659xxxxxxxx3006|设备ID，e拼上15位随机串；|
|BaseRequest.Sid|rwxxxxxxxxxHq2P|上一步获取到的wxsid；|
|BaseRequest.Skey|crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp|上一步获取到的skey；|
|BaseRequest.Uin|6xxx7|上一步获取到的wxuin；|

服务器返回数据：

```JavaScript
{
    "BaseResponse": {
        "Ret": 0,
        "ErrMsg": ""
    },
    "Count": 11,
    "ContactList": [{
        "Uin": 0,
        "UserName": "filehelper",
        "NickName": "...",
        "HeadImgUrl": "...",
        "ContactFlag": 5,
        "MemberCount": 0,
        "MemberList": [],
        "RemarkName": "",
        "HideInputBarFlag": 0,
        "Sex": 0,
        "Signature": "",
        "VerifyFlag": 0,
        "OwnerUin": 0,
        "PYInitial": "WJCSZS",
        "PYQuanPin": "wenjianchuanshuzhushou",
        "RemarkPYInitial": "",
        "RemarkPYQuanPin": "",
        "StarFriend": 0,
        "AppAccountFlag": 0,
        "Statues": 0,
        "AttrStatus": 0,
        "Province": "",
        "City": "",
        "Alias": "",
        "SnsFlag": 0,
        "UniFriend": 0,
        "DisplayName": "",
        "ChatRoomId": 0,
        "KeyWord": "fil",
        "EncryChatRoomId": "",
        "IsOwner": 0
    }],
    "SyncKey": {
        "Count": 4,
        "List": [{
            "Key": 1,
            "Val": 704152857
        }, {
            "Key": 2,
            "Val": 704152894
        }, {
            "Key": 3,
            "Val": 704152870
        }, {
            "Key": 1000,
            "Val": 1532075042
        }]
    },
    "User": {
        ...
    },
    "ChatSet": "...",
    "SKey": "@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",
    "ClientVersion": 3697797,
    "SystemTime": 1132000000,
    "GrayScale": 1,
    "InviteStartCount": 40,
    "MPSubscribeMsgCount": 0,
    "MPSubscribeMsgList": [],
    "ClickReportInterval": 600000
}
```

- BaseResponse.Ret表示请求返回状态，0表示成功。
- ContactList为最近联系人列表。联系人的UserName以一个@开头为好友，两个@为群组。
- MPSubscribeMsg为公众号订阅消息。
- User是当前登录账户信息。

### 2.2、开启消息状态通知

接着需要开启消息状态通知。我们可以看到如下 POST 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxstatusnotify?lang=zh_CN&pass_ticket=AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn=
```

URL参数分析：

|数名|示例值|描述|
|---|---|---|
|lang|zh_CN|语言；zh_CN表示中文；|
|pass_ticket|AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn=|同前面；|

POST的数据（JSON）：

```JavaScript
{
	"BaseRequest": {
		"DeviceID": "e81xxxxxxxxx7686",
		"Sid": "8rwxxxxxxxxxHq2P",
        "Skey": "@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",
        "Uin": "26xxx7"
	},
	"ClientMsgId": 1532xxxxx3374,
	"Code": 3,
	"FromUserName": "@56a0a9xxxxxxxxxxxxx54w0dxxxxbfab",
	"ToUserName": "@56a0a9xxxxxxxxxxxxx54w0dxxxxbfab"
}
```

POST参数分析：

|参数名|示例值|描述|
|---|---|---|
|BaseRequestB|{<br>  "DeviceID":"e81xxxxxxxxx7686",<br>  "Sid":"8rwxxxxxxxxxHq2P",<br>  "Skey":"@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",<br>  "Uin":"26xxx7"<br>}|每一次POST请求都会发送BaseRequest；其中DeviceID是字母e拼上15位随机字符串，其余三个都是前面获取到的认证信息。|
|ClientMsgId|1532xxxxx3374|13位时间戳；|
|Code|3|固定值；|
|FromUserName|@56a0a9xxxxxxxxxxxxx54w0dxxxxbfab|页面加载时获取到的User.UserName；|
|ToUserName|@56a0a9xxxxxxxxxxxxx54w0dxxxxbfab|同FromUserName；|

服务器返回数据：

```javascript
{
    "BaseResponse": {
        "Ret": 0,
        "ErrMsg": ""
    },
    "MsgID": "2271xxxxxxxxxxxxx44"
}
```

- BaseResponse.Ret表示请求返回状态，0表示成功。

### 2.3、服务端状态同步

继续观察，我们没间隔一定的时间，浏览器会想服务器发送一个重复的 GET 请求：

```
https://webpush.wx.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=1532145313248&skey=%40crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp&sid=8rwxxxxxxxxxHq2P&uin=26xxx7&deviceid=e35077xxxx772148&synckey=1_704152857%7C2_704152996%7C3_704152955%7C1000_1532127722&_=1532145290777
```

该请求是轮询向服务器获取最新在线、消息等状态的。

URL参数分析：

|数名|示例值|描述|
|---|---|---|
|r|1532145313248|13位时间戳；|
|skey|%40crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp|同前面；需要urlencode；|
|sid|8rwxxxxxxxxxHq2P|同前面；|
|uin|26xxx7	同前面；|
|deviceid|e35077xxxx772148|设备ID，e拼上15位随机串；|
|synckey|1_704152857%7C2_704152996%7C3_704152955%7C1000_1532127722|由初始化登录页面信息返回串中Sync的list列表组成；需要urlencode；|
|_|1532145290777|13位时间戳；|

服务器返回数据：

```
window.synccheck={retcode:"0",selector:"2"}
```

返回数据分析：

|名称|示例值|描述|
|---|---|---|
|retcode|0|表示当前在线状态。<br>0：正常<br>1100：失败/登出微信<br>1101：从其它设备登录微信|
|selector|2|表示消息状态。<br>0：正常<br>2：有新消息<br>4：目前发现修改了联系人备注会出现<br>7：手机操作了微信|

## 3、联系人管理

### 3.1、获取全部联系人列表

接着可以看到获取全部联系人列表的 GET 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact?lang=zh_CN&pass_ticket=AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn%253D&r=1532190636970&seq=0&skey=@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp
```

URL参数分析：

|参数名|示例值|描述|
|---|---|---|
|lang|zh_CN|语言；|
|pass_ticket|AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn%253D|同前面获取到的；|
|r|1532190636970|13位时间戳；|
|seq|0|固定值；|
|skey|@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp|同前面获取到的；|

服务器返回数据：

```javascript
{
    "BaseResponse": {
        "Ret": 0,
        "ErrMsg": ""
    },
    "MemberCount": 1,
    "MemberList": [{
        "Uin": 0,
        "UserName": "weixin",
        "NickName": "å¾®ä¿¡å›¢é˜Ÿ",
        "HeadImgUrl": "/cgi-bin/mmwebwx-bin/webwxgeticon?seq=1&username=weixin&skey=@crypt_4fb399da_91a345e0be9deca5d61b183fc36a3a93",
        "ContactFlag": 1,
        "MemberCount": 0,
        "MemberList": [],
        "RemarkName": "",
        "HideInputBarFlag": 0,
        "Sex": 0,
        "Signature": "å¾®ä¿¡å›¢é˜Ÿå®˜æ–¹å¸•å•·",
        "VerifyFlag": 56,
        "OwnerUin": 0,
        "PYInitial": "WXTD",
        "PYQuanPin": "weixintuandui",
        "RemarkPYInitial": "",
        "RemarkPYQuanPin": "",
        "StarFriend": 0,
        "AppAccountFlag": 0,
        "Statues": 0,
        "AttrStatus": 4,
        "Province": "",
        "City": "",
        "Alias": "",
        "SnsFlag": 0,
        "UniFriend": 0,
        "DisplayName": "",
        "ChatRoomId": 0,
        "KeyWord": "wei",
        "EncryChatRoomId": "",
        "IsOwner": 0
    }],
    "Seq": 0
}
```

- BaseResponse.Ret为0表示请求成功。
- MemberCount表示联系人总数。
- MemberList表示联系人列表。这个列表中同时包含好友、群组、公众号。好友和公众号是通过ContactFlag来区分的，1是好友，2是群组，3是公众号。
- User内部字段介绍：

```javascript
   "Uin": 0,
   "UserName": 用户名称，一个"@"为好友，两个"@"为群组
   "NickName": 昵称
   "HeadImgUrl":头像图片链接地址
   "ContactFlag": 1-好友， 2-群组， 3-公众号
   "MemberCount": 成员数量，只有在群组信息中才有效,
   "MemberList": 成员列表,
   "RemarkName": 备注名称
   "HideInputBarFlag": 0,
   "Sex": 性别，0-未设置（公众号、保密），1-男，2-女
   "Signature": 公众号的功能介绍 or 好友的个性签名
   "VerifyFlag": 0,
   "OwnerUin": 0,
   "PYInitial": 用户名拼音缩写
   "PYQuanPin": 用户名拼音全拼
   "RemarkPYInitial":备注拼音缩写
   "RemarkPYQuanPin": 备注拼音全拼
   "StarFriend": 是否为星标朋友  0-否  1-是
   "AppAccountFlag": 0,
   "Statues": 0,
   "AttrStatus": 119911,
   "Province": 省
   "City": 市
   "Alias": 
   "SnsFlag": 17,
   "UniFriend": 0,
   "DisplayName": "",
   "ChatRoomId": 0,
   "KeyWord": 
   "EncryChatRoomId": ""
```

### 3.2、批量获取指定用户信息

然后可以看到批量获取指定联系人信息的 POST 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxbatchgetcontact?type=ex&r=1532246093335&lang=zh_CN&pass_ticket=AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn%253D
```

该请求用于批量获取好友信息，或者批量获取群聊中的成员信息。

URL参数分析：

|参数名|示例值|描述|
|---|---|---|
|type|ex|不知道什么意思；|
|r|1532246093335|13位时间戳；|
|lang|zh_CN|语言；|
|pass_ticket|AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn%253D|前面获取到的；|

POST的数据（JSON）：

```javascript
{
	"BaseRequest": {
		"DeviceID": "e81xxxxxxxxx7686",
		"Sid": "8rwxxxxxxxxxHq2P",
		"Skey": "@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",
		"Uin": "26xxx7"
	},
	"Count": 2,
	"List": [
        {
			"EncryChatRoomId": "",
			"UserName": "@@76feaa87c63576aaxxxxxxxxeaaa7030c60a09d33"

		},
		{
			"ChatRoomId": "",
			"UserName": "@@55664b9ab69bbe5e6aaxxxxxxxxx778c17e11e9dab09c9a1"

		}
	]
}
```

POST参数分析：

|参数名|示例值|描述|
|---|---|---|
|BaseRequest||基本请求参数，同前面；|
|Count||要进行批量查询的用户数；|
|List||批量指定要查询的UserName的列表；如果要获取好友信息，EncryChatRoomId或ChatRoomId为空，UserName为好友的UserName；如果要获取群聊成员的信息，EncryChatRoomId或ChatRoomId为群聊的UserName，UserName为成员的UserName。|

服务器返回数据：

```javascript
{
    "BaseResponse": {
        "Ret": 0,
        "ErrMsg": ""
    },
    "Count": 2,
    "ContactList": [{
        "Uin": 0,
        "UserName": "@@76feaa87c635763438059aaeaaa7030c60a09d33",
        "NickName": "ä¸€å•£ç<span class=\"emoji emoji1f525\"></span>¾¤)",
        "HeadImgUrl": "/cgi-bin/mmwebwx-bin/webwxgetheadimg?seq=704138898&username=@@76feaa87c635763438059aaeaaa7030c60a09d33&skey=",
        "ContactFlag": 3,
        "MemberCount": 80,
        "MemberList": [{
            "Uin": 0,
            "UserName": "@3a13860046f9f5cac66faba26f2bd0537f535",
            "NickName": "é¾Ž",
            "AttrStatus": 2147437,
            "PYInitial": "",
            "PYQuanPin": "",
            "RemarkPYInitial": "",
            "RemarkPYQuanPin": "",
            "MemberStatus": 0,
            "DisplayName": "",
            "KeyWord": ""
        }, ...],
        "RemarkName": "",
        "HideInputBarFlag": 0,
        "Sex": 0,
        "Signature": "",
        "VerifyFlag": 0,
        "OwnerUin": 0,
        "PYInitial": "",
        "PYQuanPin": "",
        "RemarkPYInitial": "",
        "RemarkPYQuanPin": "",
        "StarFriend": 0,
        "AppAccountFlag": 0,
        "Statues": 0,
        "AttrStatus": 0,
        "Province": "",
        "City": "",
        "Alias": "",
        "SnsFlag": 0,
        "UniFriend": 0,
        "DisplayName": "",
        "ChatRoomId": 0,
        "KeyWord": "",
        "EncryChatRoomId": "@5fd8877457351e3a697",
        "IsOwner": 0
    }, {
        "Uin": 0,
        "UserName": "@f7dee38d1c3626c0e421c1f66deac0906559ac",
        "NickName": "å°•å¨…",
        "HeadImgUrl": "/cgi-bin/mmwebwx-bin/webwxgeticon?seq=686458815&username=@f7dee38d1c3626c0e421c1f66deac0906559ac&skey=",
        "ContactFlag": 259,
        "MemberCount": 0,
        "MemberList": [],
        "RemarkName": "å•¢æ½§",
        "HideInputBarFlag": 0,
        "Sex": 2,
        "Signature": "ä½ è<span class=\"emoji emoji1f48b\"></span>",
        "VerifyFlag": 0,
        "OwnerUin": 0,
        "PYInitial": "XY",
        "PYQuanPin": "",
        "RemarkPYInitial": "",
        "RemarkPYQuanPin": "",
        "StarFriend": 0,
        "AppAccountFlag": 0,
        "Statues": 0,
        "AttrStatus": 1047,
        "Province": "åäº¬",
        "City": "",
        "Alias": "",
        "SnsFlag": 49,
        "UniFriend": 0,
        "DisplayName": "",
        "ChatRoomId": 0,
        "KeyWord": "",
        "EncryChatRoomId": "0",
        "IsOwner": 0
    }]
}
```

- ContactList即是获取到的指定的联系人信息。

### 3.3、修改联系人备注

当我们修改联系人备注的时候，会发现浏览器发送了如下 POST 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxoplog
```

POST的数据（JSON）：

```javascript
{
    "BaseRequest": {
        "DeviceID": "e81xxxxxxxxx7686",
        "Sid": "8rwxxxxxxxxxHq2P",
        "Skey": "@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",
        "Uin": "26xxx7"
    },
    "CmdId": 2,
    "RemarkName": "新的备注名",
    "UserName": "@07a2e8b4a1f98eb78a7xxxxxxxxxxxx5b7bc4908376xxx05917b"
}
```

POST参数分析：

|参数名|示例值|描述|
|---|---|---|
|BaseRequest||基本请求参数，同其它；|
|CmdId|2|固定值；有可能还有其它值来表示不同类型操作。|
|RemarkName||新的备注名；|
|UserName||要修改的联系人的UserName；|

服务器返回数据：

```javascript
{
    "BaseResponse": {
        "Ret": 0,
        "ErrMsg": ""
    }
}
```

- BaseResponse.Ret表示操作成功。

## 4、收发消息

### 4.1、从服务端拉取新消息

我们发现2.4中的轮询请求每一次返回的数据中selector为2或者6时，都会发生如下的 POST 请求来从服务端获取新消息：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxsync?sid=8rwxxxxxxxxxHq2P&skey=@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp&pass_ticket=AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn%253D
```

URL参数分析：

|参数名|示例值|描述|
|---|---|---|
|sid|8rwxxxxxxxxxHq2P|同前面获取的；|
|skey|@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp|同前面获取的；|
|pass_ticket|AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn%253D|同前面获取的；|

POST的数据（JSON）：

```javascript
{
    "BaseRequest": {
        "DeviceID": "e2089xxxxx902803",
        "Sid": "8rwxxxxxxxxxHq2P",
        "Skey": "@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",
        "Uin": 26xxx7
    },
    "SyncKey": {
        "Count": 4,
        "List": [{
                "Key": 1,
                "Val": 704153081
            },
            {
                "Key": 2,
                "Val": 704153167
            },
            {
                "Key": 3,
                "Val": 704153152
            },
            {
                "Key": 1000,
                "Val": 1532180042
            }
        ]
    },
    "rr": 1112687259
}
```

POST参数分析：

|参数名|示例值|描述|
|---|---|---|
|BaseRequest|{<br>"DeviceID": "e81xxxxxxxxx7686",<br> "Sid": "8rwxxxxxxxxxHq2P",<br> "Skey": "@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",<br> "Uin": "26xxx7"<br>}|每一次POST请求都会发送<br>BaseRequest；其中DeviceID是字母e拼上15位随机字符串，其余三个都是前面获取到的认证信息。|
|SyncKey|{<br> "Count": ...,<br> "List": [...]<br>}|前一次获取到的SyncKey；首次是初始化数据时获取的，zhiy之后都是通过本请求更新；|

服务端返回数据：

```javascript
{
    "BaseResponse": {
        "Ret": 0,
        "ErrMsg": ""
    },
    "AddMsgCount": 1,
    "AddMsgList": [{
        "MsgId": "462399962004142457",
        "FromUserName": "@56a0a9xxxxxxxxxxxxx54w0dxxxxbfab",
        "ToUserName": "@56a0a9xxxxxxxxxxxxx54w0dxxxxbfab",
        "MsgType": 51,
        "Content": "",
        "Status": 3,
        "ImgStatus": 1,
        "CreateTime": 1532190642,
        "VoiceLength": 0,
        "PlayLength": 0,
        "FileName": "",
        "FileSize": "",
        "MediaId": "",
        "Url": "",
        "AppMsgType": 0,
        "StatusNotifyCode": 4,
        "StatusNotifyUserName": "...",
        "RecommendInfo": {
            "UserName": "",
            "NickName": "",
            "QQNum": 0,
            "Province": "",
            "City": "",
            "Content": "",
            "Signature": "",
            "Alias": "",
            "Scene": 0,
            "VerifyFlag": 0,
            "AttrStatus": 0,
            "Sex": 0,
            "Ticket": "",
            "OpCode": 0
        },
        "ForwardFlag": 0,
        "AppInfo": {
            "AppID": "",
            "Type": 0
        },
        "HasProductId": 0,
        "Ticket": "",
        "ImgHeight": 0,
        "ImgWidth": 0,
        "SubMsgType": 0,
        "NewMsgId": 462399962004142457,
        "OriContent": "",
        "EncryFileName": ""
    }],
    "ModContactCount": 0,
    "ModContactList": [],
    "DelContactCount": 0,
    "DelContactList": [],
    "ModChatRoomMemberCount": 0,
    "ModChatRoomMemberList": [],
    "Profile": {
        "BitFlag": 0,
        "UserName": {
            "Buff": ""
        },
        "NickName": {
            "Buff": ""
        },
        "BindUin": 0,
        "BindEmail": {
            "Buff": ""
        },
        "BindMobile": {
            "Buff": ""
        },
        "Status": 0,
        "Sex": 0,
        "PersonalCard": 0,
        "Alias": "",
        "HeadImgUpdateFlag": 0,
        "HeadImgUrl": "",
        "Signature": ""
    },
    "ContinueFlag": 0,
    "SyncKey": {
        "Count": 7,
        "List": [{
            "Key": 1,
            "Val": 704153081
        }, {
            "Key": 2,
            "Val": 704153169
        }, {
            "Key": 3,
            "Val": 704153152
        }, {
            "Key": 11,
            "Val": 704152941
        }, {
            "Key": 201,
            "Val": 1532190642
        }, {
            "Key": 1000,
            "Val": 1532190561
        }, {
            "Key": 1001,
            "Val": 1532180114
        }]
    },
    "SKey": "",
    "SyncCheckKey": {
        "Count": 7,
        "List": [{
            "Key": 1,
            "Val": 704153081
        }, {
            "Key": 2,
            "Val": 704153169
        }, {
            "Key": 3,
            "Val": 704153152
        }, {
            "Key": 11,
            "Val": 704152941
        }, {
            "Key": 201,
            "Val": 1532190642
        }, {
            "Key": 1000,
            "Val": 1532190561
        }, {
            "Key": 1001,
            "Val": 1532180114
        }]
    }
}
```

- AddMsgCount为新消息数目。
- AddMsgList为新消息列表。
   - MsgType说明：
      - 1：文本消息
      - 3：图片消息
      - 34：语音消息
      - 37：VERIFYMSG（验证消息）
      - 40：POSSIBLEFRIEND_MSG（可能的朋友的消息）
      - 42：共享名片
      - 43：视频通话消息
      - 47：动画表情
      - 48：位置消息
      - 49：分享链接
      - 50：VOIPMSG（VoIP消息）
      - 51：微信初始化消息
      - 52：VOIPNOTIFY（VoIP通知）
      - 53：VOIPINVITE（VoIP邀请）
      - 62：小视频
      - 9999：SYSNOTICE（系统通知）
      - 10000：系统消息
      - 10002：撤回消息
- SyncKey会暂存起来作为下一次请求的参数。

### 4.2、发送文本消息

打开一个聊天界面，向好友发送一条消息，会发现产生如下 POST 请求：

```
https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsg?pass_ticket=AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn%253D
```

URL参数分析：

|参数名|示例值|描述|
|---|---|---|
|pass_ticket|AFsdZ7eHxxxxxxxxxxxxxxxxfr1vjHPn%253D|同前面获取的；|

POST的数据（JSON）：

```javascript
{
	"BaseRequest": {
		"DeviceID": "e57xxxxxxx94xx27",
		"Sid": "8rwxxxxxxxxxHq2P",
        "Skey": "@crypt_jkde99da_b4xxxxxxxxxxxxxxx76d9yualp",
        "Uin": "26xxx7"
	},
	"Msg": {
		"ClientMsgId": "15321964202620841",
		"Content": "这里是消息内容",
		"FromUserName": "@da9d7631177b3c54492954010eb7",
		"LocalID": "15321964202620841",
		"ToUserName": "@d946a2006c12e85deda45c26b8cd42dbd3f03fa67be",
		"Type": 1
	},
	"Scene": 0
}
```

POST参数分析：

|Key|示例值|描述|
|---|---|---|
|BaseRequest||同上；|
|Msg.ClientMsgId||同LocalID；|
|Msg.Content||消息内容；消息为媒体时，该值为媒体ID。|
|Msg.FromUserName||发送用户；|
|Msg.LocalID||13位时间戳+4位随机数；|
|Msg.ToUserName||接收用户；|
|Msg.Type|1|消息类型；同3.1中接收的消息类型；|
|Scene|0|固定值；|

服务端返回数据：

```javascript
{
    "BaseResponse": {
        "Ret": 0,
        "ErrMsg": ""
    },
    "MsgID": "7650884298732299102",
    "LocalID": "15321964202620841"
}
```

- LocalID是发送时指定的LocalID。
- MsgID是服务端的消息ID。

### 4.3、上传媒体到服务器

如果我们发送一个图片、文件等媒体类消息，会看到在发送消息请求前有如下 POST 请求：

```
https://file.wx.qq.com/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json
```

若文件较小，则只会产生一个该请求，若文件较大，则会产生多个该请求。多个请求表示以分片的方式发送文件数据，分片大小约为524288。

FORM表单参数分析：

|参数名|示例值|描述|
|---|---|---|
|~~id~~|WU_FILE_0|页面文件组件ID；非必须；|
|~~name~~|bd00c8eed5c2cd522e69f38317b46903.jpg|文件名；非必须；|
|~~type~~|image/jpeg|文件的MimeType；非必须；|
|~~lastModifieDate~~||文件最后修改时间；非必须；|
|~~size~~|99785|文件大小；非必须；|
|chunks|3|文件分片数量；文件较大需要分片时必须；|
|chunk|0|文件分片序号；从0开始；文件较大需要分片时必须；|
|mediatype|pic|文件类型；图片为pic，视频为video，其它文件为doc；必须；|
|uploadmediarequest||JSON字符串；必须；|
|webwx_data_ticket||cookie中的数据；必须；|
|pass_ticket||登录时获取的；必须；|
|filename||文件二进制数据；必须；|

uploadmediarequest结构示例：

```json
{
	"UploadType": 2,
	"BaseRequest": {
		"Uin": 1245,
		"Sid": "zxaODbK4ed",
		"Skey": "@crypt_4f399da_3c7a87e93b7872bce",
		"DeviceID": "e69688819413"
	},
	"ClientMediaId": 153686311,
	"TotalLen": 87508,
	"StartPos": 0,
	"DataLen": 87508,
	"MediaType": 4,
	"FromUserName": "@6feb88ee01067121479f686",
	"ToUserName": "@6feb88ee0106f67121479f686",
	"FileMd5": "717d1dbb9833c7cdbdd09ac"
}
```

服务端返回数据：

```json
{
	"BaseResponse": {
		"Ret": 0,
		"ErrMsg": ""
	},
	"MediaId": "@crypt_17ab5.................39bd9cfa9ab",
	"StartPos": 99785,
	"CDNThumbImgHeight": 56,
	"CDNThumbImgWidth": 100,
	"EncryFileName": "bd00c8e.....38317b46903.jpg"
}
```

上传成功后，返回数据中会有MediaId，如果是分片上传的，则最后一个请求会返回MediaId。

### 4.4、发送图片消息

发送图片后，紧接着4.3的是如下POST请求：

```
https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsgimg?fun=async&f=json&lang=zh_CN&pass_ticket=xFAjPcq0eXh.......TYHHdHgVL52eHo%253D
```

URL参数分析：

|数名|示例值|描述|
|---|---|---|
|pass_ticket|xFAjPcq0eXh.......TYHHdHgVL52eHo%253D|同前面获取的；|

POST的数据（JSON）：

```json
{
	"BaseRequest": {
		"Uin": 16...245,
		"Sid": "KvCP..../TNqh8",
		"Skey": "@crypt_4fb399da......9f1b3d997c4b5eef82",
		"DeviceID": "e2825...3652448"
	},
	"Msg": {
		"Type": 3,
		"MediaId": "@crypt_17ab5.................39bd9cfa9ab",
		"Content": "",
		"FromUserName": "@3641f45.......69bed57642",
		"ToUserName": "@3641f454....9bed57642",
		"LocalID": "153691....0527",
		"ClientMsgId": "1536....390527"
	},
	"Scene": 0
}
```

POST参数分析：

|Key|示例值|描述|
|---|---|---|
|BaseRequest||同上；|
|Msg.ClientMsgId||同LocalID；|
|Msg.Content||消息内容；消息为媒体时，该值为媒体ID。|
|Msg.FromUserName||发送用户；|
|Msg.LocalID||13位时间戳+4位随机数；|
|Msg.ToUserName||接收用户；|
|Msg.Type|3|消息类型；同3.1中接收的消息类型；|
|Msg.MediaId||4.3接口中返回的MediaId；|
|Scene|0|固定值；|

服务端返回数据：

```json
{
	"BaseResponse": {
		"Ret": 0,
		"ErrMsg": ""
	},
	"MsgID": "28832......8291836",
	"LocalID": "1536.....54390527"
}
```

Web微信发送图片，需要先调4.3的接口将媒体文件上传到服务器，然后再调4.4的接口发送图片的相关信息。
