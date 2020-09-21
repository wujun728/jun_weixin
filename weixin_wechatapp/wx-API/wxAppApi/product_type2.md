### 二级分类列表   pages/search_product2/index

### 使用接口

   获取全局设置  Client.GetPlatformSetting （ /get_platform_setting.html ）
    
### 链接地址

     获取全局设置 https://mini.sansancloud.com/chainalliance/xianhua/get_platform_setting.html
  
### 主要功能

    主要为2级类别导航，用到的数据为 Client.GetPlatformSetting （ /get_platform_setting.html ）
    里面的 categories 商品分类，支持多级

    点击分类 - 跳转到商品查询页面

### 页面主要处理函数:

    getData --> 获取商品列表信息
    toAdverLink --> 广告图跳转

### 返回字段说明

    |名称|说明|备注
    |:---:|:---:|:---:|
    |id|分类id|就是categorieId
    |name|分类名|-
    |iconImage|分类图标|-
    |children|子分类|数据格式跟父级分类一样
    |adverImg|广告图|-
    |adverLink|广告图跳转|-

### json 查看

    "categories": [
              {
                "id": 1176,
                "name": "永生花",
                "url": "",
                "parentId": 0,
                "children": [

                ],
                "listTemplate": "",
                "detailTemplate": "",
                "iconImage": "http://image1.sansancloud.com/xianhua/2017_12/11/11/27/43_271.jpg",
                "description": "",
                "orderNo": 0,
                "platformNo": "xianhua",
                "showMenu": 0,
                "adverLink": ", ",
                "adverImg": ", ",
                "categoryCode": ""
              },
              {
                "id": 1175,
                "name": "绿植盆载",
                "url": "",
                "parentId": 0,
                "children": [

                ],
                "listTemplate": "",
                "detailTemplate": "",
                "iconImage": "http://image1.sansancloud.com/xianhua/2017_12/11/11/25/37_536.jpg",
                "description": "",
                "orderNo": 0,
                "platformNo": "xianhua",
                "showMenu": 0,
                "adverLink": ", ",
                "adverImg": ", ",
                "categoryCode": ""
              },
              {
                "id": 1174,
                "name": "礼盒花",
                "url": "",
                "parentId": 0,
                "children": [

                ],
                "listTemplate": "",
                "detailTemplate": "",
                "iconImage": "http://image1.sansancloud.com/xianhua/2017_12/11/11/24/03_918.jpg",
                "description": "",
                "orderNo": 0,
                "platformNo": "xianhua",
                "showMenu": 0,
                "adverLink": ", ",
                "adverImg": ", ",
                "categoryCode": ""
              },
              {
                "id": 1173,
                "name": "会议花",
                "url": "",
                "parentId": 0,
                "children": [

                ],
                "listTemplate": "",
                "detailTemplate": "",
                "iconImage": "http://image1.sansancloud.com/xianhua/2017_12/11/11/22/32_010.jpg",
                "description": "",
                "orderNo": 0,
                "platformNo": "xianhua",
                "showMenu": 0,
                "adverLink": ", ",
                "adverImg": ", ",
                "categoryCode": ""
              },
              {
                "id": 1172,
                "name": "花篮",
                "url": "",
                "parentId": 0,
                "children": [

                ],
                "listTemplate": "",
                "detailTemplate": "",
                "iconImage": "http://image1.sansancloud.com/xianhua/2017_12/11/11/21/09_821.jpg",
                "description": "",
                "orderNo": 0,
                "platformNo": "xianhua",
                "showMenu": 0,
                "adverLink": ", ",
                "adverImg": ", ",
                "categoryCode": ""
              },
              {
                "id": 1171,
                "name": "鲜花",
                "url": "",
                "parentId": 0,
                "children": [

                ],
                "listTemplate": "",
                "detailTemplate": "",
                "iconImage": "http://image1.sansancloud.com/xianhua/2017_12/11/11/00/51_296.jpg",
                "description": "",
                "orderNo": 0,
                "platformNo": "xianhua",
                "showMenu": 0,
                "adverLink": ", ",
                "adverImg": ", ",
                "categoryCode": ""
              }
            ],
            "categoryList": [
              {
                "key": 1176,
                "value": "永生花"
              },
              {
                "key": 1175,
                "value": "绿植盆载"
              },
              {
                "key": 1174,
                "value": "礼盒花"
              },
              {
                "key": 1173,
                "value": "会议花"
              },
              {
                "key": 1172,
                "value": "花篮"
              },
              {
                "key": 1171,
                "value": "鲜花"
              }
     ],