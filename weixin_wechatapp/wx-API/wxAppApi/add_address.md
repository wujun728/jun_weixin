### 添加新地址 :   pages/add_address/index

### 使用接口

     添加新地址   Client.User.AddressAdd ( /add_address.html )
     修改地址   Client.User.AddressModify ( /edit_address.html )

### 链接地址

     添加新地址   https://mini.sansancloud.com/chainalliance/xianhua/add_address.html?jsonOnly=1
     修改地址   https://mini.sansancloud.com/chainalliance/xianhua/edit_address.html?jsonOnly=1

## 添加新地址   Client.User.AddressAdd ( add_address )
###  Client.User.AddressAdd  请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|contanctName|姓名|是|-
|telno|电话号码|是|-
|province|省份|是|-
|city|市|是|-
|district|区（县）|是|-
|detail|详细地址|是|-
|longitude|经度|否|-
|latitude|维度|否|-
|defaultAddress|默认地址|否|-

### Client.User.AddressAdd  返回字段说明
|名称|说明|备注
|:---:|:---:|:---:|
|errcode|返回码| 0代表成功


### Client.User.AddressAdd  请求结果:

    {
        "errcode":"0",
        "errMsg":"success",
        "relateObj":""
    }
##  修改地址   Client.User.AddressModify ( edit_address )
###  Client.User.AddressModify  请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|contanctName|姓名|是|-
|telno|电话号码|是|-
|province|省份|是|-
|city|市|是|-
|district|区（县）|是|-
|detail|详细地址|是|-
|longitude|经度|否|-
|latitude|维度|否|-
|defaultAddress|默认地址|否|-
|addressId|地址id|是|-

### Client.User.AddressModify  返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|errcode|返回码| 0代表成功


### Client.User.AddressModify 请求结果:

    {
        "errcode":"0",
        "errMsg":"success",
        "relateObj":""
    }