### 品牌详细 :   pages/brand_detail/index

### 使用接口

    获取品牌详情    Client.Brand.GetBrandDetail ( get_brand_detail )
    关注品牌    Client.User.AddToFavorite ( add_to_favorite )
    取消关注    Client.User.RemoveFavorite ( remove_favorite )

### 链接地址

     获取品牌详情 https://mini.sansancloud.com/chainalliance/xianhua/get_brand_detail.html
     关注品牌 https://mini.sansancloud.com/chainalliance/xianhua/add_to_favorite.html
     取消关注 https://mini.sansancloud.com/chainalliance/xianhua/remove_favorite.html

##  获取品牌详情    Client.Brand.GetBrandDetail ( get_brand_detail )
###  Client.Brand.GetBrandDetail 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|brandId|品牌id|是|-

### Client.Brand.GetBrandDetail 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|brandName|商标名|-
|brandNameEn|商标英文名|-
|brandNameShort|商标缩写|-
|brandIcon|商标图片地址|-
|id|商标id|-
|brandDescription|商标描述|-
|brandItems|该商标的商品|-
|imagePath|该商标的商品的图片|-
|name|该商标的商品的名字|-
### Client.Brand.GetBrandDetail  请求结果:

    {
      "errcode": "0",
      "errMsg": "success",
      "relateObj": {
        "jsonRemark": {
                        beanRemark: '商品品牌表',
                        brandName: '商标名',
                        brandNameEn: '商标英文名',
                        brandNameShort: '商标缩写',
                        brandIcon: '商标图片地址',
                        brandTypeId: '商标分类ID(弃用)',
                        brandTypeName: '商标分类名(弃用)',
                        platformNo: '平台号',
                        brandDescription: '商标描述'
                      },
         "id": 17,
        "brandName": "孙建兴",
        "brandNameEn": "sunjianxing",
        "brandNameShort": "sjx",
        "brandIcon": "http://image1.sansancloud.com/jianzhan/2017_09/24/15/32/10_998.jpg",
        "platformNo": "jianzhan",
        "brandDescription": "回展。",
        "brandItems": [
          {
            "jsonRemark": {
                            beanRemark: '产品Bean',
                            imagePath: '产品缩略图',
                            name: '产品名',
                            tagPrice: '产品标价',
                            price: '产品售价',
                            price2: '价格2(弃用)',
                            price3: '价格3(弃用)',
                            saleCount: '销售数量',
                            category: '产品分类',
                            saleTime: '开售日期',
                            hotSale: '热销(弃用)',
                            saleStrategy: '销售策略号',
                            disable: '是否上架 0上架    1 下架',
                            linkUrl: '弃用',
                            productCode: '产品编码',
                            description: '描述',
                            orderNumber: '编码',
                            readCount: '访问次数',
                            stock: '库存',
                            belongAreaId: '弃用',
                            belongShangquanId: '弃用',
                            belongShopId: '上传店铺ID',
                            belongAreaName: '弃用',
                            belongShangquanName: '弃用',
                            belongShopName: '上传店铺名',
                            tags: '商品标签',
                            promotion: '参与主活动',
                            shopProductType: '店铺分类（与主分类不同 店铺自己对产品的分类）',
                            phoneImg: '弃用',
                            addTime: '添加时间',
                            minSaleCount: '最少购买数',
                            bigSmallUnitScale: '大小单位比例（弃用）',
                            tip: 'tip说明 弃用',
                            unitShow: '单位名称（弃用）',
                            remarkNumber: '备注号(后端使用 前端忽略)',
                            categoryParent: '产品归类父类id',
                            categoryGradparent: '产品归类祖先分类ID',
                            newSale: '新品 (弃用)',
                            brandId: '归属品牌id',
                            brandName: '品牌名',
                            brandNameEn: '品牌英文名',
                            brandNameShort: '品牌缩写',
                            commentCount: '评论次数',
                            yunfei: '运费(弃用 现在使用平台设定的运费模板)',
                            yunfeiTemplate: '运费模板id(弃用 使用平台默认设置的运费模板)',
                            productType: '产品类型 0普通产品  1到店服务类产品 2展示类产品 3预收类产品 5租赁类产品',
                            presalePrice: '预售价格(预售类产品可用)',
                            distributeProfit: '产品分配利润（在二级分润系统使用）',
                            daidingPlatformUserId: '待定平台用户id（忽略）',
                            daidingTime: '待定时间',
                            daidingUserLoginName: '待定用户登录名',
                            daidingUserNickName: '待定用户昵称',
                            remark: '备注（前端忽略 后端使用）',
                            pingfen: '产品评分',
                            pingfenCount: '产品参与评分数量',
                            leaseUnitTypeStr: '租赁单位类型字符表示',
                            leaseUnitType: '租赁单位类型 0小时 1天 2周 3月 4年 （周单位弃用）',
                            productYear: '产品年份',
                            attributesCombind: '属性归集 ',
                            leaseUnitAmount: '租赁单位金额 ',
                            leaseUnitExpireAmount: '租赁逾期单位金额 ',
                            leaseNeedBackUnitCount: '租赁应还单位时长  如值为 10表示10个单位内应归还 单位参考  leaseUnitType ',
                            measureItem: '是否多规格商品 0否 1是 表示有规格 如 红色 L码',
                            saleStrategyDetails: '销售策略详情',
                            measureTypes: '分配规格类型',
                            promotionBean: '参与活动Bean',
                            attrs: '属性列表',
                            platformNo: '平台号'
                          },
            id": 8030,
            "imagePath": "http://image1.sansancloud.com/jianzhan/upload/diyii/B33032649193000022/1.jpg",
            "name": "窑变银毫 国大师孙建兴制",
            "tagPrice": 11600,
            "price": 11600,
            "price2": 0,
            "saleCount": 0,
            "category": 973,
            "hotSale": 0,
            "disable": 0,
            "description": "毫纹条达。盏心一抹蓝色 外围毫纹满满自然挂釉一滴",
            "orderNumber": "20171102123942",
            "readCount": 0,
            "stock": 1,
            "price3": 0,
            "productCode": "B33032649193000022",
            "belongAreaId": 0,
            "belongShangquanId": 0,
            "belongShopId": 236,
            "belongAreaName": "",
            "belongShangquanName": "",
            "belongShopName": "一方建盏",
            "tags": "",
            "promotion": "0",
            "platformNo": "jianzhan",
            "addTime": "2017-11-02 12:39:42",
            "minSaleCount": 1,
            "bigSmallUnitScale": 1,
            "inCarCount": 0,
            "hgZhekou": 100,
            "lgZhekou": 100,
            "hzZhekou": 100,
            "lzZhekou": 100,
            "fxyZhekou": 100,
            "bdZhekou": 100,
            "categoryParent": 0,
            "categoryGradparent": 0,
            "newSale": 0,
            "brandId": 17,
            "brandName": "孙建兴",
            "commentCount": 0,
            "yunfei": 0,
            "yunfeiTemplate": 0,
            "productType": 0,
            "presalePrice": 0,
            "distributeProfit": 0,
            "daidingPlatformUserId": 0,
            "pingfen": 0,
            "pingfenCount": 0,
            "leaseUnitTypeStr": "小时",
            "attributesCombind": "[口径-8cm*4.5cm][器型-束口][斑纹-兔毫]",
            "leaseUnitType": 0,
            "leaseUnitAmount": 0,
            "leaseUnitExpireAmount": 0,
            "leaseNeedBackUnitCount": 1,
            "measureItem": 0,
            "saleStrategyDetails": [

            ]
          }
        ],
        "platformUserId": 0,
        "guanzhu": 1
      }
    }

##  关注品牌    Client.User.AddToFavorite ( add_to_favorite )
###  Client.User.AddToFavorite 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|favoriteType|收藏类型|是|-
|itemId|收藏对象Id|是|-

### Client.User.AddToFavorite 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|errcode|0|请求成功

### Client.User.AddToFavorite  请求结果:

    {
        "errcode":"0",
        "errMsg":"success",
        "relateObj":""
    }

 ##  取消关注品牌   Client.User.RemoveFavorite ( remove_favorite )
 ###  Client.User.RemoveFavorite 请求参数

 |名称|说明|是否必要|备注
 |:---:|:---:|:---:|:---:|
 |favoriteType|收藏类型|是|-
 |itemId|收藏对象Id|是|-

 ### Client.User.RemoveFavorite 返回字段说明

 |名称|说明|备注
 |:---:|:---:|:---:|
 |errcode|0|请求成功

 ### Client.User.RemoveFavorite  请求结果:

     {
         "errcode":"0",
         "errMsg":"success",
         "relateObj":""
     }