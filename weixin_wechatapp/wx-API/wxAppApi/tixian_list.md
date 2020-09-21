### 提现记录 :   pages/tixian_list/index

### 使用接口

    获取提现记录列表  ( /get_tixian_list.html )

### 链接地址

    获取提现记录列表  https://mini.sansancloud.com/chainalliance/xianhua/get_tixian_list.html

##  获取提现记录列表  ( /get_tixian_list.html )
###   /get_tixian_list.html 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|page|第几页|否|-

### /get_tixian_list.html  返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|requestAmount|提现金额|-
|eventAmount|事件金额￥|-
|requestStatus|提现进度|-
|addTime|申请提现时间|-
|shenheUserId|审核人|-
|platformNo|平台号|-


###  /get_tixian_list.html 请求结果:

    {
       "pageSize": 16,
       "curPage": 1,
       "totalSize": 7,
       "result": [
         {
           "id": 24,
           "unionUserId": 60154,
           "platformUserId": 65573,
           "requestAmount": 0.1,
           "requestStatus": 0,
           "addTime": "2017-12-29 17:39:33",
           "shenheUserId": 0,
           "fangkuanStatus": 0,
           "platformNo": "shuiguofenxiao"
         }
       ]
     }