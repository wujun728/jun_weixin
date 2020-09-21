### 个人资料与修改 :   pages/pre_change_user_info/index

### 使用接口

    修改个人信息   Client.User.ChangeUserInfo ( change_user_info )

### 链接地址

     修改个人信息 https://mini.sansancloud.com/chainalliance/xianhua/change_user_info.html

##  修改个人信息   Client.User.ChangeUserInfo ( change_user_info )
###   Client.User.ListJifenEvent 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|headimg|头像|否|-
|nickname|昵称|否|-
|telno|电话|否|-
|userTip|个性签名|否|-
|sex|性别|否|-

###  Client.User.ChangeUserInfo 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|errcode|状态码|0为成功
|nickname|昵称|-
|headimgurl|头像|-
|telno|电话|-
|userTip|个性签名|-
|sex|性别|-
|jifen|积分|-
|sex|性别|-

###  Client.User.ChangeUserInfo 请求结果:

    {
      "errcode": "0",
      "errMsg": "success",
      "relateObj": {
        "id": 65595,
        "unionUserId": 60176,
        "miniOpenId": "o1323Lbhuzt6e6c",
        "wxUnionId": "",
        "platformNo": "xianhua",
        "parentId": 0,
        "gradparentId": 0,
        "gradparent2Id": 0,
        "gradparent3Id": 0,
        "gradparent4Id": 0,
        "guanzhu": 0,
        "jifen": 10,
        "telNo": "",
        "userLevel": 0,
        "nickname": "蒋",
        "headimgurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJcvKJ4MoSX8Xqt6k84RwKoIwt9vZeGKuicia7oqRjGHqeNmYCn9U4d6lqyrOPm2LwRBA4Cu9FT7TOg/0",
        "sex": 1,
        "yongjin": 0,
        "fxName": "112728",
        "fxShenhe": 0,
        "userShenhe": 0,
        "account": 5140,
        "fxTuijianma": "FX65595",
        "loginUserName": "112728",
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
        "lastestLoginLongitude": 0,
        "lastestLoginLatitude": 0,
        "userTip": "111",
        "lastestLocateShopId": 0,
        "loginToken": "84b85040b7a1fb361055c2302863cbf7",
        "tokenExpireTime": "2018-02-16 16:10:27",
        "needSynErp": 0,
        "belongMendian": 0,
        "belongMendianName": "",
        "platformUserCode": "",
        "wxLimitSceneId": 0,
        "newRegist": 0,
        "addTime": "2017-12-29 18:08:41",
        "lastestLoginTime": "2018-01-17 16:10:27",
        "loginCount": 125,
        "unpayedCount": 0,
        "unsendedCount": 0,
        "unreceivedCount": 0,
        "uncomment": 0,
        "unfinished": 0,
        "unreadMessageCount": 0,
        "couponCount": 0,
        "favoriteProductCount": 0,
        "wxAppRefreshToken": ""
      }
    }