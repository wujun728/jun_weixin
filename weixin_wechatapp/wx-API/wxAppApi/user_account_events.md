### 余额充值事件列表 :   pages/user_account_events/index

### 使用接口

    获取余额事件列表  Client.User.ListAccountEvent ( get_user_account_events )

### 链接地址

    获取余额事件列表  https://mini.sansancloud.com/chainalliance/xianhua/get_user_account_events.html

##  获取余额事件列表  Client.User.ListAccountEvent ( get_user_account_events )
###   Client.User.ListAccountEvent 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|page|第几页|否|-

### Client.User.ListAccountEvent  返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|eventType|事件类型  0 支出  1 收入|-
|eventAmount|事件金额￥|-
|eventTime|事件发生时间|-
|payOrderNo|支付的订单号或退款的订单号|-
|platformNo|平台号|-
|beforeAmount|事件发生前账户余额|-
|afterAmount|事件发生后账户余额|-
|rechargeRemark|充值备注|-


###  Client.User.ListAccountEvent 请求结果:

    {
      "pageSize": 16,
      "curPage": 1,
      "totalSize": 5,
      "result": [
        {
          "jsonRemark":{
                 beanRemark: '账户余额变更事件表',
                 eventType: '事件类型  0 支出  1 收入',
                 eventAmount: '事件金额￥',
                 platformUserId: '事件归属平台用户ID',
                 eventTime: '事件发生时间',
                 eventDescription: '事件描述',
                 platformNo: '平台号',
                 payOrderNo: '支付的订单号或退款的订单号',
                 beforeAmount: '事件发生前账户余额',
                 afterAmount: '事件发生后账户余额',
                 rechargeId: '充值ID(收入事件可用 参考账户充值记录表  ProductAccountRecharge)',
                 rechargeRemark: '充值备注',
                 payListId: '平台余额支付id(支出事件可用 参考账户支付记录表 ProductAccountPayList)',
                 platformUserNickName: '事件归属用户昵称'
               } ,
          "id": 611,
          "eventType": 1,
          "eventAmount": 158,
          "platformUserId": 65595,
          "eventTime": "2018-01-16 16:13:44",
          "eventDescription": "用户取消订单退款￥158.00成功,订单号:20180116155028237001",
          "platformNo": "xianhua",
          "beforeAmount": 4982,
          "afterAmount": 5140,
          "rechargeId": 0,
          "payListId": 0,
          "platformUserNickName": "蒋"
        }
      ]
    }