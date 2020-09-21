### 我的积分 :   pages/user_jifen_events/index

### 使用接口

    获取我的积分列表   Client.User.ListJifenEvent ( get_user_jifen_events )

### 链接地址

    获取我的积分列表  https://mini.sansancloud.com/chainalliance/xianhua/get_user_jifen_events.html

##  获取我的积分列表   Client.User.ListJifenEvent ( get_user_jifen_events )
###   Client.User.ListJifenEvent 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|page|第几页|否|-

###  Client.User.ListJifenEvent 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|eventType|事件类型|-
|eventDescription|事件描述|-
|eventJifen|事件积分|-
|eventTime|事件时间|-
|afterJifen|事件后剩余积分|-
|beforeJifen|事件前剩余积分|-


###  Client.User.ListJifenEvent 请求结果:

    {
      "pageSize": 16,
      "curPage": 1,
      "totalSize": 8,
      "result": [
        {
          "id": 28643,
          "eventType": 0,
          "eventDescription": "订单:20171220112526074001 消费582.00元获得582积分",
          "eventJifen": 582,
          "userId": 47446,
          "eventTime": "2017-12-27 11:29:14",
          "platformUserId": 58627,
          "afterJifen": 7092,
          "beforeJifen": 6510
        }
      ]
    }