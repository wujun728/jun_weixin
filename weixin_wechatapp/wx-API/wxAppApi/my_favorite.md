### 我的收藏 :   pages/my_favorite/index

### 使用接口

    获取我的收藏列表   Client.Get.Favorite ( get_favorite )

### 链接地址

     获取我的收藏列表 https://mini.sansancloud.com/chainalliance/xianhua/get_favorite.html

##  获取我的收藏列表   Client.Get.Favorite ( get_favorite )
###   Client.Get.Favorite 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|favoriteType|收藏类型|是|-
|page|第几页|否|-

###  Client.Get.Favorite 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|itemId|商品id|-
|itemName|商品名称|-
|itemPrice|商品价格|-
|itemIcon|商品图像地址|-
|addTime|加入时间|-
|itemType|喜欢类型|-


###  Client.Get.Favorite  请求结果:

    {
      "pageSize": 16,
      "curPage": 1,
      "totalSize": 1,
      "result": [
        {
          "id": 2810,
          "userId": 47624,
          "itemId": 8040,
          "itemName": "卓立旗金银滴",
          "itemPrice": 4200,
          "itemIcon": "http://image1.sansancloud.com/jianzhan/upload/diyii/B33536649193925832/1.jpg",
          "addTime": "2018-01-17 14:13:29",
          "itemType": 1,
          "orderNo": 0,
          "platformNo": "jianzhan",
          "productId": 8040,
          "shopId": 0
        }
      ]
    }