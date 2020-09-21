### 新闻列表页  pages/news_list/index

### 使用接口

    获取新闻列表 Client.Get.NewsBbsList （ /more_news_bbs_list.html ）

### 链接地址

     获取新闻列表 https://mini.sansancloud.com/chainalliance/xianhua/more_news_bbs_list.html

## 获取新闻列表 Client.Get.NewsBbsList （ /more_news_bbs_list.html ）
###  请求参数 Client.Get.NewsBbsList

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|page|页数|否| 第几页
|newsTypeId|新闻类型ID|否| 不选的话显示全部
|jsonOnly|返回数据格式|是| jsonOnly=1 返回json格式

### 返回字段说明 Client.Get.NewsBbsList

|名称|说明|备注
|:---:|:---:|:---:|
|typeId|新闻类型ID|新闻类别
|title|标题|
|imagePath|主图|-
|description|新闻描述|-
|channelDescription|页面描述|-
|typeName|类别名称|-
|publishTime|发表时间|-
|likeCount |点赞人数|-

### 请求结果: Client.Get.NewsBbsList

    {
      "pageSize": 10,
      "curPage": 1,
      "totalSize": 1,
      "result": [
        {
          "id": 27606,
          "title": "天冷了，这6种水果可以煮熟再吃效果更佳",
          "content": "",
          "publishTime": "2017-12-08 14:45:58",
          "typeId": 78,
          "imagePath": "http://image1.sansancloud.com/shuiguo/2017_12/07/09/56/33_704.jpg",
          "description": "",
          "orderNumber": "20171208144558",
          "readTime": 2,
          "fromSource": "",
          "platformNo": "shuiguo",
          "belongShopId": 0,
          "belongShopName": "",
          "commentCount": 0,
          "favoriteCount": 0,
          "newsImageJson": "",
          "setTop": 0,
          "enlighten": 0,
          "typeName": "公告",
          "publishUserId": 0,
          "publishUserName": "",
          "publishUserIcon": "",
          "publicPlatformUserId": 0,
          "happenTimeShortName": "",
          "lastCommentTimeShortName": "",
          "likeCount": 0,
          "contentWithNoImg": "",
          "contentWithImgTag": "",
          "publishUserSex": 1,
          "gainJifen": 0
        }
      ]
    }