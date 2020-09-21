### 我的足迹 :   pages/user_visit_items/index

### 使用接口

    获取我的足迹  Client.User.GetVisitItems ( get_user_visit_items )

### 链接地址

    获取我的足迹  https://mini.sansancloud.com/chainalliance/xianhua/get_user_visit_items.html

##  获取我的足迹  Client.User.GetVisitItems ( get_user_visit_items )
###   Client.User.GetVisitItems  请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|visitType|访问类型 1 产品 2 店铺 3 新闻 4 用户|否|默认为产品
|page|第几页|否|-

### Client.User.GetVisitItems 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|visitItemId|商品id|-
|itemName|商品名称|-
|itemIcon|商品图像地址|-
|visitCount|访问次数|-
|lastestVisitTime|最后访问时间|-
|belongShopId|店铺id|-


###  Client.User.GetVisitItems  请求结果:

    {
      "pageSize": 16,
      "curPage": 1,
      "totalSize": 6,
      "result": [
        {
          "id": 58572,
          "itemType": 1,
          "visitItemId": "8328",
          "lastestVisitTime": "2018-01-17 16:06:23",
          "visitCount": 1,
          "itemName": "苁丛 睡萌花盒系列 永生花礼盒进口玫瑰花情人节礼品盒生日礼物 ",
          "itemDescription": "",
          "itemIcon": "http://image1.sansancloud.com/xianhua/2018_01/16/15/30/47_600.jpg",
          "platformNo": "xianhua",
          "platformUserId": 65595,
          "belongShopId": 257,
          "platformUserName": "蒋",
          "typeStr": "商品",
          "actionStr": "访问"
        }
      ]
    }