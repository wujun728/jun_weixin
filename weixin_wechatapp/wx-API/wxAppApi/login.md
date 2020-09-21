### 登录 :   pages/login/index

### 使用接口

    账号密码登录  Client.User.Login  ( /login.html )
    微信登录  Client.User.WxMiniCodeLogin （ wx_mini_code_login ）)

### 链接地址

     账号密码登录 https://mini.sansancloud.com/chainalliance/xianhua/login.html
     微信登录 https://mini.sansancloud.com/chainalliance/xianhua/wx_mini_code_login.html

##  账号密码登录  Client.User.Login  ( /login.html )
###  Client.User.Login  请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|loginType|登录类型0 普通  1 微信  2 短信验证码|是|-
|telno|绑定手机号码|否|-
|verifyCode|验证码|否|-
|username|用户名|是|-
|password|密码|是|-

### Client.User.Login  返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|userIcon|头像|-
|nickName|昵称|-
|likeCount|收藏数|-
|totalCarItemCount|购物车里面的商品数|-
|jifen|积分数|-
|couponCount|优惠券数|-

### Client.User.Login   请求结果:

    {
      "errcode": "0",
      "errMsg": " 登陆成功",
      "relateObj": {
        "id": 47446,
        "name": "17805905565",
        "password": "7fa8282ad93047a4d6fe6111c93b308a",
        "userLimit": 0,
        "type": 0,
        "nickName": "jzq1111111",
        "sex": 0,
        "mail": "",
        "registTime": "2017-10-11 17:28:35",
        "telno": "11111223",
        "viewCount": 0,
        "userIcon": "http://image1.sansancloud.com/jianzhan/2017_11/21/15/53/14_323.jpg",
        "likeCount": 0,
        "myfollow": 0,
        "followme": 0,
        "oneStory": 0,
        "groupStory": 0,
        "goTop": 0,
        "unreadMsgCount": 0,
        "jifen": 0,
        "platformNo": "yanhualingshou",
        "platformUser": {
          "id": 58627,
          "unionUserId": 47446,
          "platformNo": "jianzhan",
          "parentId": 0,
          "gradparentId": 0,
          "gradparent2Id": 0,
          "gradparent3Id": 0,
          "gradparent4Id": 0,
          "guanzhu": 0,
          "jifen": 7092,
          "telNo": "11111223",
          "userLevel": 1,
          "nickname": "jzq1111111",
          "headimgurl": "http://image1.sansancloud.com/jianzhan/2017_11/21/15/53/14_323.jpg",
          "sex": 2,
          "yongjin": 0,
          "fxName": "jzq",
          "fxShenhe": 0,
          "userShenhe": 0,
          "account": 2158,
          "fxTuijianma": "FX58627",
          "loginUserName": "17805905565",
          "threeFxUserCount": 0,
          "fiveFxUserCount": 0,
          "levelOneFxUserCount": 0,
          "levelTwoFxUserCount": 0,
          "levelThreeFxUserCount": 0,
          "levelFourFxUserCount": 0,
          "levelFiveFxUserCount": 0,
          "loginUserFollowed": 0,
          "fensiUserCount": 0,
          "followUserCount": 0,
          "managerShopId": 0,
          "backOrderCount": 0,
          "backOrderTotalCount": 0,
          "todayBbsJifen": 0,
          "todayBbsRecordJifen": 0,
          "todayBbsCommentJifen": 0,
          "todayBbsRecommentJifen": 0,
          "todayTime": "",
          "qrcodeForever": 0,
          "lastestLoginIp": "210.13.192.54",
          "lastestLoginLongitude": 0,
          "lastestLoginLatitude": 0,
          "userTip": "33334",
          "lastestLocateShopId": 236,
          "lastestLocateShop": {
            "id": 236,
            "shopName": "一方建盏",
            "shopDescription": "",
            "shopLogo": "",
            "belongAreaId": 0,
            "belongUserId": 0,
            "belongShangquanId": 0,
            "shopLevelId": 0,
            "hotShop": 0,
            "shopLevelValue": 0,
            "shopTip": "",
            "checkTime": "2017-09-23 14:56:49",
            "checkUserId": 0,
            "checkState": 1,
            "setEnable": 1,
            "platformNo": "jianzhan",
            "telno": "13665075175",
            "range": 0,
            "ownerName": "",
            "favoriteCount": 0,
            "ownerQq": "",
            "ownerEmail": "",
            "deleteFlag": 0,
            "turnover": 10113.07,
            "shopContent": "",
            "adverts": [

            ],
            "productCount": 0,
            "platformShop": 0,
            "managerPlatformUserId": 49631,
            "shopScore": 10,
            "scoreNum": 4,
            "averageScore": 2,
            "averageScoreHundred": 100,
            "shopOrder": 0,
            "shopIndexPage": "",
            "orderItems": [

            ],
            "carItems": [

            ],
            "shopFavorite": 0,
            "backOrderCount": 2,
            "maxOrderPerDay": 0,
            "todayOrderCount": 0,
            "serviceOrderCount": 7,
            "printerType": 1,
            "printerPartner": "",
            "printerMachineCode": "",
            "printerApiKey": "",
            "printerMachineKey": "",
            "serviceStartTime": 0,
            "serviceEndTime": 24,
            "account": {
              "id": 38,
              "shopId": 236,
              "shopName": "一方建盏",
              "platformNo": "jianzhan",
              "account": 1541.5
            }
          },
          "loginToken": "f7f0411187f4a22c758c81ca6bbac8f8",
          "tokenExpireTime": "2018-02-16 11:06:28",
          "needSynErp": 0,
          "belongMendian": 0,
          "belongMendianName": "",
          "platformUserCode": "",
          "wxLimitSceneId": 0,
          "newRegist": 0,
          "addTime": "2017-11-08 13:11:36",
          "lastestLoginTime": "2018-01-17 11:06:28",
          "loginCount": 170,
          "unpayedCount": 0,
          "unsendedCount": 0,
          "unreceivedCount": 0,
          "uncomment": 0,
          "unfinished": 0,
          "unreadMessageCount": 0,
          "couponCount": 0,
          "favoriteProductCount": 0,
          "wxAppRefreshToken": ""
        },
        "totalCarItemCount": 1,
        "unpayedOrderCount": 0,
        "unreceivedOrderCount": 0,
        "uncommentOrderCount": 0,
        "uncommentGoodsCount": 0,
        "unsendedOrderCount": 0
      }
    }


##  微信登录  Client.User.WxMiniCodeLogin （ wx_mini_code_login ）)
###  Client.User.WxMiniCodeLogin  请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|code|授权码|是|-

### Client.User.WxMiniCodeLogin 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|userIcon|头像|-
|nickName|昵称|-
|likeCount|收藏数|-
|totalCarItemCount|购物车里面的商品数|-
|jifen|积分数|-
|couponCount|优惠券数|-

### Client.User.WxMiniCodeLogin 请求结果:

    {
      "errcode": "0",
      "errMsg": " 登陆成功",
      "relateObj": {
        "id": 47446,
        "name": "17805905565",
        "password": "7fa8282ad93047a4d6fe6111c93b308a",
        "userLimit": 0,
        "type": 0,
        "nickName": "jzq1111111",
        "sex": 0,
        "mail": "",
        "registTime": "2017-10-11 17:28:35",
        "telno": "11111223",
        "viewCount": 0,
        "userIcon": "http://image1.sansancloud.com/jianzhan/2017_11/21/15/53/14_323.jpg",
        "likeCount": 0,
        "myfollow": 0,
        "followme": 0,
        "oneStory": 0,
        "groupStory": 0,
        "goTop": 0,
        "unreadMsgCount": 0,
        "jifen": 0,
        "platformNo": "yanhualingshou",
        "platformUser": {
          "id": 58627,
          "unionUserId": 47446,
          "platformNo": "jianzhan",
          "parentId": 0,
          "gradparentId": 0,
          "gradparent2Id": 0,
          "gradparent3Id": 0,
          "gradparent4Id": 0,
          "guanzhu": 0,
          "jifen": 7092,
          "telNo": "11111223",
          "userLevel": 1,
          "nickname": "jzq1111111",
          "headimgurl": "http://image1.sansancloud.com/jianzhan/2017_11/21/15/53/14_323.jpg",
          "sex": 2,
          "yongjin": 0,
          "fxName": "jzq",
          "fxShenhe": 0,
          "userShenhe": 0,
          "account": 2158,
          "fxTuijianma": "FX58627",
          "loginUserName": "17805905565",
          "threeFxUserCount": 0,
          "fiveFxUserCount": 0,
          "levelOneFxUserCount": 0,
          "levelTwoFxUserCount": 0,
          "levelThreeFxUserCount": 0,
          "levelFourFxUserCount": 0,
          "levelFiveFxUserCount": 0,
          "loginUserFollowed": 0,
          "fensiUserCount": 0,
          "followUserCount": 0,
          "managerShopId": 0,
          "backOrderCount": 0,
          "backOrderTotalCount": 0,
          "todayBbsJifen": 0,
          "todayBbsRecordJifen": 0,
          "todayBbsCommentJifen": 0,
          "todayBbsRecommentJifen": 0,
          "todayTime": "",
          "qrcodeForever": 0,
          "lastestLoginIp": "210.13.192.54",
          "lastestLoginLongitude": 0,
          "lastestLoginLatitude": 0,
          "userTip": "33334",
          "lastestLocateShopId": 236,
          "lastestLocateShop": {
            "id": 236,
            "shopName": "一方建盏",
            "shopDescription": "",
            "shopLogo": "",
            "belongAreaId": 0,
            "belongUserId": 0,
            "belongShangquanId": 0,
            "shopLevelId": 0,
            "hotShop": 0,
            "shopLevelValue": 0,
            "shopTip": "",
            "checkTime": "2017-09-23 14:56:49",
            "checkUserId": 0,
            "checkState": 1,
            "setEnable": 1,
            "platformNo": "jianzhan",
            "telno": "13665075175",
            "range": 0,
            "ownerName": "",
            "favoriteCount": 0,
            "ownerQq": "",
            "ownerEmail": "",
            "deleteFlag": 0,
            "turnover": 10113.07,
            "shopContent": "",
            "adverts": [

            ],
            "productCount": 0,
            "platformShop": 0,
            "managerPlatformUserId": 49631,
            "shopScore": 10,
            "scoreNum": 4,
            "averageScore": 2,
            "averageScoreHundred": 100,
            "shopOrder": 0,
            "shopIndexPage": "",
            "orderItems": [

            ],
            "carItems": [

            ],
            "shopFavorite": 0,
            "backOrderCount": 2,
            "maxOrderPerDay": 0,
            "todayOrderCount": 0,
            "serviceOrderCount": 7,
            "printerType": 1,
            "printerPartner": "",
            "printerMachineCode": "",
            "printerApiKey": "",
            "printerMachineKey": "",
            "serviceStartTime": 0,
            "serviceEndTime": 24,
            "account": {
              "id": 38,
              "shopId": 236,
              "shopName": "一方建盏",
              "platformNo": "jianzhan",
              "account": 1541.5
            }
          },
          "loginToken": "f7f0411187f4a22c758c81ca6bbac8f8",
          "tokenExpireTime": "2018-02-16 11:06:28",
          "needSynErp": 0,
          "belongMendian": 0,
          "belongMendianName": "",
          "platformUserCode": "",
          "wxLimitSceneId": 0,
          "newRegist": 0,
          "addTime": "2017-11-08 13:11:36",
          "lastestLoginTime": "2018-01-17 11:06:28",
          "loginCount": 170,
          "unpayedCount": 0,
          "unsendedCount": 0,
          "unreceivedCount": 0,
          "uncomment": 0,
          "unfinished": 0,
          "unreadMessageCount": 0,
          "couponCount": 0,
          "favoriteProductCount": 0,
          "wxAppRefreshToken": ""
        },
        "totalCarItemCount": 1,
        "unpayedOrderCount": 0,
        "unreceivedOrderCount": 0,
        "uncommentOrderCount": 0,
        "uncommentGoodsCount": 0,
        "unsendedOrderCount": 0
      }
    }