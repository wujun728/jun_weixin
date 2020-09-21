### 地址 :   pages/address/index

### 使用接口

    获取用户地址列表  Client.User.AddressList ( get_login_user_address_list )
    删除地址  Client.User.AddressDelete ( delete_address )
    设为默认地址  Client.User.AddressSetDefault ( set_default_address )

### 链接地址

     获取用户地址列表 https://mini.sansancloud.com/chainalliance/xianhua/get_login_user_address_list.html
     删除地址   https://mini.sansancloud.com/chainalliance/xianhua/delete_address.html
     设为默认地址   https://mini.sansancloud.com/chainalliance/xianhua/set_default_address.html

## 获取用户地址列表   Client.User.AddressList ( get_login_user_address_list )
###  Client.User.AddressList 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|-|-|-|-

### Client.User.AddressList 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|telNo|电话|-
|contactName|联系人|-
|address|详细地址|-
|province|省|-
|city|市|-
|area|区/县|-
|longitude|坐标|-
|latitude|坐标|-
|defaultAddress|是否默认地址|-

### Client.User.AddressList  请求结果:

    {
      "result": [
        {
          "id": 41683,
          "telNo": "17888888888",
          "contactName": "111",
          "address": "11111",
          "belongUserId": 60176,
          "defaultAddress": 1,
          "province": "北京市",
          "city": "北京市",
          "area": "东城区",
          "longitude": 119.30405,
          "latitude": 26.08198,
          "json": "{\"id\":\"41683\",\"telNo\":\"17888888888\",\"contactName\":\"111\",\"address\":\"11111\",\"belongUserId\":\"60176\",\"defaultAddress\":\"1\",\"province\":\"北京市\",\"city\":\"北京市\",\"area\":\"东城区\",\"longitude\":\"119.30405\",\"latitude\":\"26.08198\"}"
        }
      ],
      "pageSize": 10000,
      "curPage": 1,
      "pageCount": 1
    }

## 删除地址  Client.User.AddressDelete ( delete_address )
###  Client.User.AddressDelete 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|addressId|地址id|是|-

### Client.User.AddressDelete 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|-|-|-


### Client.User.AddressDelete  请求结果:

    {
    "errcode":"0",
    "errMsg":"success",
    "relateObj":""
    }


## 设为默认地址  Client.User.AddressSetDefault ( set_default_address )
###  Client.User.AddressSetDefault 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|addressId|地址id|是|-

### Client.User.AddressSetDefault 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|-|-|-

### Client.User.AddressSetDefault  请求结果:

    {
    "errcode":"0",
    "errMsg":"success",
    "relateObj":""
    }
