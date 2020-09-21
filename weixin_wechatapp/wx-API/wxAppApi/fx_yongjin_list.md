### 分销佣金记录 :   pages/fx_yongjin_list/index

### 使用接口

    佣金记录  ( /get_fx_yongjin_list.html )

### 链接地址

     佣金记录 https://mini.sansancloud.com/chainalliance/xianhua/get_fx_yongjin_list.html

##  佣金记录   ( /get_fx_yongjin_list.html )
###   /get_fx_yongjin_list.html  请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|page|第几页|否|-

### /get_fx_yongjin_list.html   返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|eventType|事件类型  0 支出  1 收入|-
|eventAmount|事件金额￥|-
|eventTime|事件发生时间|-
|payOrderNo|支付的订单号或退款的订单号|-
|platformNo|平台号|-
|beforeAmount|事件发生前账户余额|-
|afterAmount|事件发生后账户余额|-
|eventDescription|事件描述|-


###  /get_fx_yongjin_list.html   请求结果:

    {
      "pageSize": 16,
      "curPage": 1,
      "totalSize": 1,
      "result": [
        {
          "id": 172,
          "eventType": 1,
          "eventAmount": 8,
          "platformUserId": 65573,
          "eventTime": "2017-12-29 16:56:13",
          "eventDescription": "订单:20171229165357430001 完成 获得佣金收入:8.00元 分销等级:2产品利润:20.00 抽成比例:40.0",
          "platformNo": "***",
          "txReqId": 0,
          "yjListId": 192,
          "beforeAmount": 0,
          "afterAmount": 8,
          "buyerPlatformUserId": 63697,
          "buyerPlatformUserName": "金龙",
          "productId": 8229,
          "productName": "新疆阿克苏糖心苹果",
          "shopId": 259,
          "shopName": "水果分销",
          "buyerFxLevel": 2,
          "productCount": 1,
          "platformUserNickName": "蒋",
          "productAmount": 100
        }
      ]
    }