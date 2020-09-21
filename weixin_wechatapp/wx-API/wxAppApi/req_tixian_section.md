### 申请提现 :   pages/req_tixian_section/index

### 使用接口

    申请提现   ( /req_tixian.html )

### 链接地址

    申请提现  https://mini.sansancloud.com/chainalliance/xianhua/req_tixian.html
  
##  申请提现   ( /req_tixian.html )
###  /req_tixian.html 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|tixianAmount|提现金额|是|-

### /req_tixian.html  返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|requestAmount|提现金额|-
|eventAmount|事件金额￥|-
|requestStatus|提现进度|-
|addTime|申请提现时间|-
|shenheUserId|审核人|-
|platformNo|平台号|-

### /req_tixian.html 请求结果:

    {
       "id": 25,
       "unionUserId": 60154,
       "platformUserId": 65573,
       "requestAmount": 0.5,
       "requestStatus": 0,
       "addTime": "2018-01-17 17:21:49",
       "shenheUserId": 0,
       "fangkuanStatus": 0,
       "platformNo": "shuiguofenxiao"
     }