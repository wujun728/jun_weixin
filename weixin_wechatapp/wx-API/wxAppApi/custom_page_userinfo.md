### 个人信息页（我的）  pages/custom_page_userinfo/index

### 使用接口

   获取页面配置信息 custom_page_:id （ /custom_page_:id.html ）

### 链接地址

     获取页面配置信息 https://mini.sansancloud.com/chainalliance/xianhua/custom_page_userinfo.html

###  请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|jsonOnly|返回数据格式|是| jsonOnly=1 返回json格式

### 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|jsonRemark|json备注|字段说明
|beanRemark|自定义页面表|
|channelName|页面名称(只允许英文数字结合)|-
|channelTitle|页面标题|-
|channelDescription|页面描述|-
|channelKeywords|页面关键词|-
|platformNo|平台号|-
|partials |装饰|装饰为前端重点
|functionType |页面是单独页面还是页面的某个模块 | 0页面 1模块

### 请求结果:

    {
      "jsonRemark": "{
          beanRemark:'自定义页面表',
          channelName:'页面名称(只允许英文数字结合)',
          channelTitle:'页面标题
          channelDescription:'页面描述',
          channelKeywords:'页面关键词',
          channelTemplate:'页面使用模板',
          pageType:'页面类型(弃用)',
          index:'是否主页 (弃用  0 否 1 是)',
          belongShopId:'归属店铺ID(0 平台页面  )',
          platformNo:'平台号',
          belongShopName:'归属店铺名',
          functionType:'页面是单独页面还是页面的某个模块  0页面 1模块',
          terminalType:'终端类型(弃用)',
          partials:'装饰
          参考 List<ProductChannelPartial>'
      }",
      "id": 834,
      "channelName": "index",
      "channelTitle": "首页-水果批发分销",
      "channelDescription": "",
      "channelKeywords": "",
      "channelTemplate": "default",
      "channelImage": "",
      "pageType": 0,
      "platformNo": "shuiguo",
      "belongShopId": 0,
      "belongShopName": "",
      "terminalType": 0,
      "functionType": 0,
      "moduleMap": {

      },
      "partials": [
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4173,
          "belongPageId": 834,
          "partialType": 7,
          "orderNo": 5,
          "jsonData": "{\"id\":4173,\"height\":0.426,\"images\":[{\"title\":\"\",\"description\":\"\",\"linkUrl\":\"\",\"loginCheck\":\"noCheck\",\"imageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/11/21/54_447.jpg\",\"height\":200,\"targetType\":\"section\",\"location\":0,\"showUserInfo\":0,\"clickUserLink\":\"\"},{\"title\":\"\",\"description\":\"\",\"linkUrl\":\"\",\"loginCheck\":\"noCheck\",\"imageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/11/21/54_447.jpg\",\"height\":200,\"targetType\":\"section\",\"location\":0,\"showUserInfo\":0,\"clickUserLink\":\"\"},{\"title\":\"\",\"description\":\"\",\"linkUrl\":\"\",\"loginCheck\":\"noCheck\",\"imageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/11/21/54_447.jpg\",\"height\":200,\"targetType\":\"section\",\"location\":0,\"showUserInfo\":0,\"clickUserLink\":\"\"},{\"title\":\"\",\"description\":\"\",\"linkUrl\":\"\",\"loginCheck\":\"noCheck\",\"imageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/11/21/54_447.jpg\",\"height\":200,\"targetType\":\"section\",\"location\":0,\"showUserInfo\":0,\"clickUserLink\":\"\"}]}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4245,
          "belongPageId": 834,
          "partialType": 4,
          "orderNo": 7,
          "jsonData": "{\"headIconType\":0,\"headIcon\":\"\",\"rightIconType\":0,\"rightContent\":\"\",\"title\":\"\",\"showSearch\":1,\"subTitle\":\"\",\"linkUrl\":\"\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"align\":\"left\",\"titleSize\":18,\"titleColor\":\"\",\"subTitleSize\":12,\"subTitleColor\":\"\",\"bgColor\":\"\",\"bgImage\":\"\"}",
          "remark": "sou",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4175,
          "belongPageId": 834,
          "partialType": 8,
          "orderNo": 8,
          "jsonData": "{\"column\":4,\"row\":2,\"iconType\":2,\"showType\":0,\"padding\":15,\"cells\":[{\"text\":\"全部\",\"color\":\"\",\"linkUrl\":\"search_product.html?showType\\u003d1\\u0026forceSearch\\u003d1\",\"loginCheck\":\"noCheck\",\"fontSize\":12,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/29/33_528.jpg\",\"bgColor\":\"#FFFFFF\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"\"},{\"text\":\"当季热销\",\"color\":\"\",\"linkUrl\":\"search_product.html?showType\\u003d1\\u0026forceSearch\\u003d1\\u0026productTypeId\\u003d1144\",\"loginCheck\":\"noCheck\",\"fontSize\":12,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/29/45_785.jpg\",\"bgColor\":\"#FFFFFF\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"\"},{\"text\":\"国产水果\",\"color\":\"\",\"linkUrl\":\"search_product.html?productTypeId\\u003d1145\\u0026showType\\u003d1\\u0026forceSearch\\u003d1\",\"loginCheck\":\"noCheck\",\"fontSize\":12,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/29/54_931.jpg\",\"bgColor\":\"#FFFFFF\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"\"},{\"text\":\"进口水果\",\"color\":\"\",\"linkUrl\":\"search_product.html?productTypeId\\u003d1143\\u0026showType\\u003d1\\u0026forceSearch\\u003d1\",\"loginCheck\":\"noCheck\",\"fontSize\":12,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/29/59_210.jpg\",\"bgColor\":\"#FFFFFF\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"\"},{\"text\":\"有机水果\",\"color\":\"\",\"linkUrl\":\"search_product.html?productTypeId\\u003d1147\\u0026showType\\u003d1\\u0026forceSearch\\u003d1\",\"loginCheck\":\"noCheck\",\"fontSize\":12,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/30/05_593.jpg\",\"bgColor\":\"#FFFFFF\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"\"},{\"text\":\"优选干果\",\"color\":\"\",\"linkUrl\":\"search_product.html?productTypeId\\u003d1146\\u0026showType\\u003d1\\u0026forceSearch\\u003d1\",\"loginCheck\":\"noCheck\",\"fontSize\":12,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/29/37_907.jpg\",\"bgColor\":\"#FFFFFF\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"\"},{\"text\":\"联系我们\",\"color\":\"\",\"linkUrl\":\"search_product.html?productTypeId\\u003d1142\\u0026showType\\u003d1\\u0026forceSearch\\u003d1\",\"loginCheck\":\"noCheck\",\"fontSize\":12,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/29/41_845.jpg\",\"bgColor\":\"#FFFFFF\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"\"},{\"text\":\"敬请期待\",\"color\":\"\",\"linkUrl\":\"search_product.html?productTypeId\\u003d1142\\u0026showType\\u003d1\\u0026forceSearch\\u003d1\",\"loginCheck\":\"noCheck\",\"fontSize\":12,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/28/12_092.jpg\",\"bgColor\":\"#FFFFFF\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"\"}]}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4244,
          "belongPageId": 834,
          "partialType": 3,
          "orderNo": 10,
          "jsonData": "{\"color\":\"#f9f9f9\",\"height\":10}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4176,
          "belongPageId": 834,
          "partialType": 5,
          "orderNo": 11,
          "jsonData": "{\"text\":\"极致鲜果体验 同城闪速送达\",\"color\":\"#FF0000\",\"linkUrl\":\"news_list.html?newsTypeId\\u003d77\",\"loginCheck\":\"noCheck\",\"fontSize\":14,\"align\":\"left\",\"targetType\":\"section\",\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/13/53/13_835.jpg\",\"bgColor\":\"\",\"title2\":\"\",\"title2FontSize\":12,\"title2FontColor\":\"#777777\"}",
          "remark": "",
          "wapTemplate": "./views/platform_template/jianzhan/partials/theme1/text_link.hbs",
          "iosTemplate": "text_link_gonggao",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4177,
          "belongPageId": 834,
          "partialType": 4,
          "orderNo": 12,
          "jsonData": "{\"headIconType\":0,\"headIcon\":\"\",\"rightIconType\":0,\"rightContent\":\"\",\"title\":\"店家推荐\",\"showSearch\":0,\"subTitle\":\"BEST\",\"linkUrl\":\"\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"align\":\"center\",\"titleSize\":18,\"titleColor\":\"\",\"subTitleSize\":18,\"subTitleColor\":\"#FF9C34\",\"bgColor\":\"#FFFFFF\",\"bgImage\":\"\"}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4178,
          "belongPageId": 834,
          "partialType": 9,
          "orderNo": 14,
          "jsonData": "{\"model\":1,\"column\":2,\"borderSize\":1,\"gridHeight\":200,\"imageWidthBili\":98.0,\"imageHeightBili\":100.0,\"showView\":\"\",\"dataInterface\":\"com.sswl.partialview.datainterfaces.SaleProductDataGenarator\",\"interfaceMethod\":\"getSaleProductData\",\"methodArgs\":\"-101,4\",\"borderColor\":\"#f9f9f9\",\"items\":[{\"model\":3,\"title\":\"进口新鲜水果智利进口车厘子/斤\",\"linkUrl\":\"product_detail_8154.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/56/33_704.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥60.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"新鲜水果墨西哥进口牛油果\",\"linkUrl\":\"product_detail_8155.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/57/09_259.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥35.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"红枣\",\"linkUrl\":\"product_detail_8164.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_11/29/11/29/58_543.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥25.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"火参果\",\"linkUrl\":\"product_detail_8156.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/10/00/43_705.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥5.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"}]}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4240,
          "belongPageId": 834,
          "partialType": 4,
          "orderNo": 15,
          "jsonData": "{\"headIconType\":0,\"headIcon\":\"\",\"rightIconType\":0,\"rightContent\":\"\",\"title\":\"热销\",\"showSearch\":0,\"subTitle\":\"TOP\",\"linkUrl\":\"\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"align\":\"center\",\"titleSize\":18,\"titleColor\":\"\",\"subTitleSize\":18,\"subTitleColor\":\"#CC3468\",\"bgColor\":\"#f9f9f9\",\"bgImage\":\"\"}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4241,
          "belongPageId": 834,
          "partialType": 9,
          "orderNo": 16,
          "jsonData": "{\"model\":1,\"column\":2,\"borderSize\":1,\"gridHeight\":200,\"imageWidthBili\":98.0,\"imageHeightBili\":100.0,\"showView\":\"\",\"dataInterface\":\"com.sswl.partialview.datainterfaces.SaleProductDataGenarator\",\"interfaceMethod\":\"getSaleProductData\",\"methodArgs\":\"-101,4\",\"borderColor\":\"#f9f9f9\",\"items\":[{\"model\":3,\"title\":\"进口新鲜水果智利进口车厘子/斤\",\"linkUrl\":\"product_detail_8154.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/56/33_704.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥60.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"新鲜水果墨西哥进口牛油果\",\"linkUrl\":\"product_detail_8155.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/57/09_259.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥35.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"红枣\",\"linkUrl\":\"product_detail_8164.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_11/29/11/29/58_543.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥25.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"火参果\",\"linkUrl\":\"product_detail_8156.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/10/00/43_705.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥5.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"}]}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4242,
          "belongPageId": 834,
          "partialType": 4,
          "orderNo": 17,
          "jsonData": "{\"headIconType\":0,\"headIcon\":\"\",\"rightIconType\":0,\"rightContent\":\"\",\"title\":\"新品\",\"showSearch\":0,\"subTitle\":\"NEW\",\"linkUrl\":\"\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"align\":\"center\",\"titleSize\":18,\"titleColor\":\"\",\"subTitleSize\":18,\"subTitleColor\":\"#00B6D0\",\"bgColor\":\"#f9f9f9\",\"bgImage\":\"\"}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4243,
          "belongPageId": 834,
          "partialType": 9,
          "orderNo": 18,
          "jsonData": "{\"model\":1,\"column\":2,\"borderSize\":1,\"gridHeight\":200,\"imageWidthBili\":98.0,\"imageHeightBili\":100.0,\"showView\":\"\",\"dataInterface\":\"com.sswl.partialview.datainterfaces.SaleProductDataGenarator\",\"interfaceMethod\":\"getSaleProductData\",\"methodArgs\":\"-101,4\",\"borderColor\":\"#f9f9f9\",\"items\":[{\"model\":3,\"title\":\"进口新鲜水果智利进口车厘子/斤\",\"linkUrl\":\"product_detail_8154.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/56/33_704.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥60.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"新鲜水果墨西哥进口牛油果\",\"linkUrl\":\"product_detail_8155.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/09/57/09_259.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥35.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"红枣\",\"linkUrl\":\"product_detail_8164.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_11/29/11/29/58_543.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥25.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"},{\"model\":3,\"title\":\"火参果\",\"linkUrl\":\"product_detail_8156.html\",\"targetType\":\"section\",\"loginCheck\":\"noCheck\",\"iconModel\":2,\"iconPath\":\"http://image1.sansancloud.com/shuiguo/2017_12/07/10/00/43_705.jpg\",\"bgColor\":\"\",\"titleColor\":\"\",\"rightArrow\":0,\"subTitle\":\"\",\"subTitleColor\":\"\",\"subTitle2\":\"￥5.00\",\"subTitleColor2\":\"#FF0000\",\"rightModel\":0,\"rightImage\":\"\",\"rightBottomText\":\"\",\"rightBottomTextColor\":\"\",\"leftBottomText\":\"\",\"leftBottomTextColor\":\"\",\"rightTopText\":\"\",\"rightTopTextColor\":\"\"}]}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        },
        {
          "jsonRemark": "{beanRemark:'页面装饰项',belongPageId:'归属页面ID(参考 ProductChannelPage)',innerPageIndex:'内页索引(Tab页面的位置索引)partialType:'装饰类型  1 富文本  2  辅助线  3 空白辅助 4 标题  5 文本导航链接  6图片导航链接  7、图片广告轮播 8、grid 导航 9、详细列表 10、grid列表 11、底部TAB  12、头部TITLE 13、TabPage',orderNo:'页内排序',jsonData:'装饰json数据',remark:'备注',wapTemplate:'wap模板',iosTemplate:'APP模板',platformNo:'平台号',androidTemplate:'小程序模板'}",
          "id": 4272,
          "belongPageId": 834,
          "partialType": 11,
          "orderNo": 19,
          "jsonData": "{\"tabCount\":4,\"pageType\":0,\"tabs\":[{\"title\":\"首页\",\"imageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/08/10/13/19_769.jpg\",\"hoverImageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/08/10/13/23_767.jpg\",\"imageSize\":20,\"pageName\":\"index\",\"linkUrl\":\"\",\"loginCheck\":\"noCheck\",\"targetType\":\"section\"},{\"title\":\"产品\",\"imageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/08/10/13/59_601.jpg\",\"hoverImageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/08/10/14/04_445.jpg\",\"imageSize\":20,\"pageName\":\"userinfo\",\"linkUrl\":\"search_product.html?showType\\u003d1\\u0026forceSearch\\u003d1\",\"loginCheck\":\"noCheck\",\"targetType\":\"section\"},{\"title\":\"购物车\",\"imageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/08/10/14/37_228.jpg\",\"hoverImageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/08/10/14/42_372.jpg\",\"imageSize\":20,\"pageName\":\"userinfo\",\"linkUrl\":\"shopping_car_list.html\",\"loginCheck\":\"loginCheck\",\"targetType\":\"section\"},{\"title\":\"我的\",\"imageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/08/10/15/47_804.jpg\",\"hoverImageUrl\":\"http://image1.sansancloud.com/shuiguo/2017_12/08/10/15/52_914.jpg\",\"imageSize\":20,\"pageName\":\"userinfo\",\"linkUrl\":\"\",\"loginCheck\":\"loginCheck\",\"targetType\":\"section\"}],\"bgColor\":\"\"}",
          "remark": "",
          "wapTemplate": "",
          "iosTemplate": "",
          "androidTemplate": ""
        }
      ]
    }