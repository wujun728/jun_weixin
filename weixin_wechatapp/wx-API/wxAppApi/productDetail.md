### 商品详情  pages/productDetail/index

### 页面功能 : 商品详情展示，加入购物车，联系客服，立即购买，收藏，查看商品评论

    页面主要处理函数: getData --> 获取订单详细信息
                    removeFavourite --> 删除收藏
                    lookDerection --> 查看图文详情
                    getCommitData --> 查看评价
                    readyPay2 --> 准备下单
                    createOrder22 --> 创建订单
                    addtocart --> 加入购物车
                    submitMeasure --> 提交规格产品
                    get_measure_cartesion --> 获取规格价格参数
                    chooseMeasureItem --> 初始化 选规格
                    chooseMeasure --> 选择规格小巷---获取数据

### 使用接口

      获取商品详情    product_detail.html
      加入收藏   Client.User.AddToFavorite （ /add_to_favorite.html ）
      删除收藏   Client.User.RemoveFavorite ( /remove_favorite.html )
      获取商品评论  Client.Order.CommentList （ /get_product_comment_list.html ）
      立即购买   Client.User.BuyNow （ /buy_now.html ）
      加入购物车   Client.User.ChangeCarItemCount （ /change_shopping_car_item.html ）
      获取规格集   Client.Product.GetMeasureCartesion （ /get_measure_cartesion.html ）


### 链接地址

     获取商品详情 https://mini.sansancloud.com/chainalliance/xianhua/product_detail.html
     加入收藏 https://mini.sansancloud.com/chainalliance/xianhua/remove_favorite.html
     删除收藏 https://mini.sansancloud.com/chainalliance/xianhua/change_user_info.html
     获取商品评论 https://mini.sansancloud.com/chainalliance/xianhua/get_product_comment_list.html
     立即购买 https://mini.sansancloud.com/chainalliance/xianhua/buy_now.html
     加入购物车 https://mini.sansancloud.com/chainalliance/xianhua/change_shopping_car_item.html
     获取规格集 https://mini.sansancloud.com/chainalliance/xianhua/get_measure_cartesion.html

## 获取商品详情    product_detail.html
###   product_detail:id.html 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|productId|商品id|是|-
|addshopId|店铺id|是|-

### product_detail.html 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|imagePath|产品缩略图|-
|name|产品名|-
|tagPrice|产品标价|-
|price|产品售价|-
|saleCount|销售数量|-
|category|产品分类|-
|description|描述|-
|minSaleCount |最少购买数|-
|pingfen |评分|-
|saleStrategyDetails |销售策略详情|-
|stock |库存|-
|measureItem |是否多规格商品|-
|measureTypes |分配规格类型|-
|brandId |归属品牌id|-
|promotionBean |参与活动Bean|-
|attrs |属性列表|-


### product_detail.html 请求结果:

    {
      "productInfo": {
        "jsonRemark":
            {
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
        "id": "9182",
        "productId": 8220,
        "itemSaleCount": 0,
        "itemScore": 0,
        "hotItem": 0,
        "attrId": 1,
        "imagePath": "http://image1.sansancloud.com/xianhua/2017_12/18/12/02/11_095.jpg",
        "name": "手提花篮玫瑰绣球混搭开业花篮鲜花速递同城杭州上海重庆生日花店 ",
        "tagPrice": 228,
        "price": 228,
        "price2": 0,
        "saleCount": 0,
        "commentCount": 0,
        "saleTime": "2017-12-11 15:12:37",
        "hotSale": 0,
        "disable": "0",
        "description": "",
        "orderNumber": "20171211152613",
        "readCount": 0,
        "stock": 10,
        "hgZhekou": 100,
        "lgZhekou": 100,
        "hzZhekou": 100,
        "lzZhekou": 100,
        "fxyZhekou": 100,
        "bdZhekou": 100,
        "category": 1172,
        "categoryParent": 0,
        "categoryGradparent": 0,
        "categoryBean": {
          "id": 1172,
          "name": "花篮",
          "url": "",
          "parentId": 0,
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
        "newSale": 0,
        "attribute": "",
        "brandId": 0,
        "belongAreaId": 0,
        "belongShangquanId": 0,
        "belongShangquanName": "",
        "belongShopId": 257,
        "belongShopName": "福州鲜花批发",
        "tags": "",
        "platformNo": "xianhua",
        "promotion": "0",
        "yunfei": 0,
        "productType": 0,
        "presalePrice": 0,
        "commentTotal": {
          "totalPingfen": 0,
          "totalShangpinfuhedu": 0,
          "totalDianjiafuwutaidu": 0,
          "totalWuliufahuosudu": 0,
          "totalPeisongyuanfuwutaidu": 0,
          "commentCount": 0
        },
        "favorite": 0,
        "minSaleCount": 1,
        "bigSmallUnitScale": 1,
        "tip": "",
        "daidingPlatformUserId": 0,
        "unitShow": "件",
        "belongShopBean": {
          "id": 257,
          "shopName": "福州鲜花批发",
          "shopDescription": "",
          "shopLogo": "",
          "belongAreaId": 0,
          "belongUserId": 0,
          "belongShangquanId": 0,
          "shopLevelId": 0,
          "hotShop": 0,
          "shopLevelValue": 0,
          "shopTip": "",
          "checkTime": "2017-12-11 10:39:26",
          "checkUserId": 0,
          "checkState": 1,
          "setEnable": 1,
          "platformNo": "xianhua",
          "telno": "",
          "range": 0,
          "ownerName": "",
          "favoriteCount": 0,
          "ownerQq": "",
          "ownerEmail": "",
          "deleteFlag": 0,
          "turnover": 12586,
          "shopContent": "",
          "adverts": [

          ],
          "productCount": 0,
          "platformShop": 0,
          "shopScore": 0,
          "scoreNum": 0,
          "averageScore": 0,
          "averageScoreHundred": 60,
          "shopOrder": 0,
          "shopIndexPage": "",
          "orderItems": [

          ],
          "carItems": [

          ],
          "shopFavorite": 0,
          "backOrderCount": 0,
          "maxOrderPerDay": 0,
          "todayOrderCount": 0,
          "serviceOrderCount": 0,
          "printerType": 1,
          "printerPartner": "",
          "printerMachineCode": "",
          "printerApiKey": "",
          "printerMachineKey": "",
          "serviceStartTime": 0,
          "serviceEndTime": 24,
          "account": {
            "id": 0,
            "shopId": 257,
            "shopName": "福州鲜花批发",
            "platformNo": "xianhua",
            "account": 0
          }
        },
        "leaseUnitType": 0,
        "leaseUnitTypeStr": "小时",
        "leaseUnitAmount": 0,
        "leaseUnitExpireAmount": 0,
        "leaseNeedBackUnitCount": 1,
        "checkState": 0,
        "setEnable": 0,
        "price3": 0,
        "productCode": "",
        "saleStrategyDetails": [

        ]
      },
      "images": [
        {
          "imagePath": "http://image1.sansancloud.com/xianhua/2017_12/18/12/02/11_095.jpg"
        }
      ],
      "attrs": [

      ],
      "description": {
        "id": 6549,
        "itemId": 8220,
        "description": "<p><img src=\"https://img.alicdn.com/imgextra/i1/2981134470/TB2yKhIbMZjyKJjy0FhXXcdlFXa_!!2981134470.jpg\" class=\"img-ks-lazyload\" align=\"absmiddle\"/><img src=\"https://img.alicdn.com/imgextra/i1/2981134470/TB24fC1c03nyKJjSZFEXXXTTFXa_!!2981134470.jpg\" class=\"img-ks-lazyload\" align=\"absmiddle\"/><img src=\"https://img.alicdn.com/imgextra/i4/2981134470/TB2amyAbHAPyuJjy0FjXXXhfFXa_!!2981134470.jpg\" class=\"img-ks-lazyload\" align=\"absmiddle\"/><img src=\"https://img.alicdn.com/imgextra/i3/2981134470/TB2Av91c03nyKJjSZFEXXXTTFXa_!!2981134470.jpg\" class=\"img-ks-lazyload\" align=\"absmiddle\"/><img src=\"https://img.alicdn.com/imgextra/i4/2981134470/TB2whqKc0MnyKJjSZPhXXaeZVXa_!!2981134470.jpg\" class=\"img-ks-lazyload\" align=\"absmiddle\"/></p><p><br/></p>",
        "images": [
          "https://img.alicdn.com/imgextra/i1/2981134470/TB2yKhIbMZjyKJjy0FhXXcdlFXa_!!2981134470.jpg",
          "https://img.alicdn.com/imgextra/i1/2981134470/TB24fC1c03nyKJjSZFEXXXTTFXa_!!2981134470.jpg",
          "https://img.alicdn.com/imgextra/i4/2981134470/TB2amyAbHAPyuJjy0FjXXXhfFXa_!!2981134470.jpg",
          "https://img.alicdn.com/imgextra/i3/2981134470/TB2Av91c03nyKJjSZFEXXXTTFXa_!!2981134470.jpg",
          "https://img.alicdn.com/imgextra/i4/2981134470/TB2whqKc0MnyKJjSZPhXXaeZVXa_!!2981134470.jpg"
        ]
      },
      "measures": [

      ],
      "shopDetail": {
        "id": 257,
        "shopName": "福州鲜花批发",
        "shopDescription": "",
        "shopLogo": "",
        "belongAreaId": 0,
        "belongUserId": 0,
        "belongShangquanId": 0,
        "shopLevelId": 0,
        "hotShop": 0,
        "shopLevelValue": 0,
        "shopTip": "",
        "checkTime": "2017-12-11 10:39:26",
        "checkUserId": 0,
        "checkState": 1,
        "setEnable": 1,
        "platformNo": "xianhua",
        "telno": "",
        "range": 0,
        "ownerName": "",
        "favoriteCount": 0,
        "ownerQq": "",
        "ownerEmail": "",
        "deleteFlag": 0,
        "turnover": 12586,
        "shopContent": "",
        "adverts": [

        ],
        "productCount": 0,
        "platformShop": 0,
        "shopScore": 0,
        "scoreNum": 0,
        "averageScore": 0,
        "averageScoreHundred": 60,
        "shopOrder": 0,
        "shopIndexPage": "",
        "orderItems": [

        ],
        "carItems": [

        ],
        "shopFavorite": 0,
        "backOrderCount": 0,
        "maxOrderPerDay": 0,
        "todayOrderCount": 0,
        "serviceOrderCount": 0,
        "printerType": 1,
        "printerPartner": "",
        "printerMachineCode": "",
        "printerApiKey": "",
        "printerMachineKey": "",
        "serviceStartTime": 0,
        "serviceEndTime": 24,
        "account": {
          "id": 0,
          "shopId": 257,
          "shopName": "福州鲜花批发",
          "platformNo": "xianhua",
          "account": 0
        }
      }
    }

## 改变购物车商品数量，加入购物车 Client.User.ChangeCarItemCount（/change_shopping_car_item.html  ）
###  Client.User.ChangeCarItemCount 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|productId|商品ID|是|-
|shopId|所属店铺|是|-
|count|数量|是|-
|cartesionId|规格集ID|否|默认无规格|-
|type|类型(add dec change)|是|-

### Client.User.ChangeCarItemCount 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|productId|商品id|-
|count|数量|-
|belongShop|店铺id|-
|carItemPrice|价格|-
|totalCarItemCount|购物车总数量|-
|totalCarItemPrice|购物车总价格|-
|item|商品的信息|-


### Client.User.ChangeCarItemCount  请求结果:

    {
        addDate:"2018-01-16 10:03:57"
        belongShop:257
        belongUserId:"60176"
        carItemPrice:278
        carItemYunfei:0
        count:2
        id:33777
        item:{
            addTime:"2017-12-11 15:16:21"
            attributesCombind:""
            bdZhekou:100
            belongAreaId:0
            belongAreaName:""
            belongShangquanId:0
            belongShangquanName:""
            belongShopId:257
            belongShopName:"福州鲜花批发"
            bigSmallUnitScale:1
            brandId:0
            category:1172
            categoryGradparent:0
            categoryParent:0
            commentCount:0
            daidingPlatformUserId:0
            description:""
            disable:0
            distributeProfit:0
            fxyZhekou:100
            hgZhekou:100
            hotSale:0
            hzZhekou:100
            id:8221
            imagePath:"http://image1.sansancloud.com/xianhua/2017_12/18/11/59/30_891.jpg"
            inCarCount:0
            jsonRemark:"{beanRemark:'产品Bean',imagePath:'产品缩略图',name:'产品名',tagPrice:'产品标价',price:'产品售价',price2:'价格2(弃用)',price3:'价格3(弃用)',saleCount:'销售数量',category:'产品分类',saleTime:'开售日期',hotSale:'热销(弃用)',saleStrategy:'销售策略号',disable:'是否上架 0上架    1 下架',linkUrl:'弃用',productCode:'产品编码',description:'描述',orderNumber:'编码',readCount:'访问次数',stock:'库存',belongAreaId:'弃用',belongShangquanId:'弃用',belongShopId:'上传店铺ID',belongAreaName:'弃用',belongShangquanName:'弃用',belongShopName:'上传店铺名',tags:'商品标签',promotion:'参与主活动',shopProductType:'店铺分类（与主分类不同 店铺自己对产品的分类）',phoneImg:'弃用',addTime:'添加时间',minSaleCount:'最少购买数',bigSmallUnitScale:'大小单位比例（弃用）',tip:'tip说明 弃用',unitShow:'单位名称（弃用）',remarkNumber:'备注号(后端使用 前端忽略)',categoryParent:'产品归类父类id',categoryGradparent:'产品归类祖先分类ID',newSale:'新品 (弃用)',brandId:'归属品牌id',brandName:'品牌名',brandNameEn:'品牌英文名',brandNameShort:'品牌缩写',commentCount:'评论次数',yunfei:'运费(弃用 现在使用平台设定的运费模板)',yunfeiTemplate:'运费模板id(弃用 使用平台默认设置的运费模板)',productType:'产品类型 0普通产品  1到店服务类产品 2展示类产品 3预收类产品 5租赁类产品',presalePrice:'预售价格(预售类产品可用)',distributeProfit:'产品分配利润（在二级分润系统使用）',daidingPlatformUserId:'待定平台用户id（忽略）',daidingTime:'待定时间',daidingUserLoginName:'待定用户登录名',daidingUserNickName:'待定用户昵称',remark:'备注（前端忽略 后端使用）',pingfen:'产品评分',pingfenCount:'产品参与评分数量',leaseUnitTypeStr:'租赁单位类型字符表示',leaseUnitType:'租赁单位类型 0小时 1天 2周 3月 4年 （周单位弃用）',productYear:'产品年份',attributesCombind:'属性归集 ',leaseUnitAmount:'租赁单位金额 ',leaseUnitExpireAmount:'租赁逾期单位金额 ',leaseNeedBackUnitCount:'租赁应还单位时长  如值为 10表示10个单位内应归还 单位参考  leaseUnitType ',measureItem:'是否多规格商品 0否 1是 表示有规格 如 红色 L码',saleStrategyDetails:'销售策略详情',measureTypes:'分配规格类型',promotionBean:'参与活动Bean',attrs:'属性列表',platformNo:'平台号' }"
            leaseNeedBackUnitCount:1
            leaseUnitAmount:0
            leaseUnitExpireAmount:0
            leaseUnitType:0
            leaseUnitTypeStr:"小时"
            lgZhekou:100
            lzZhekou:100
            measureItem:0
            minSaleCount:1
            name:"手提花篮玫瑰绣球混搭花篮鲜花速递同城贵阳合肥金华济南生日花店"
            newSale:0
            orderNumber:"20171211152614"
            pingfen:0
            pingfenCount:0
            platformNo:"xianhua"
            presalePrice:0
            price:278
            price2:0
            price3:0
            productCode:""
            productType:0
            productYear:"2017"
            promotion:"0"
            readCount:0
            remark:""
            saleCount:0
            saleStrategyDetails:[]
            saleTime:"2017-12-11 15:16:21"
            stock:10
            tagPrice:278
            tags:""
            tip:""
            unitShow:"件"
            yunfei:0
            yunfeiTemplate:0
        }
        measureCartesianId:0
        platformNo:"xianhua"
        productId:"8221"
        stock:10
        totalCarItemCount:16
        totalCarItemPrice:2708
        zhekou:100
    }

## 根据选中的商品获取活动列表   Client.User.ListPromotionsByCarItems（list_promotions_by_car_items）
###  Client.User.ListPromotionsByCarItems 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|selectedIds|选中的商品id|是|-
|shopId|所属店铺|是|-
|typeBelongShop|所属店铺类别|否|-

### Client.Get.ProductListMore 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|youhuiAmount|优惠总金额|-
|zhekou|折扣|-
|productCount|产品数量|-

### Client.User.ListPromotionsByCarItems  请求结果:

    [
        {
          giftCount :  0
          id  :  0
          name  :  "非活动商品"
          orderAmount  :  0
          platformNo  :  "xianhua"
          productCount  :  1
          promotionStatus  :  0
          promotionType  :  0
          startDate  :  "2018-01-16 14:29:05"
          youhuiAmount  :  0
          zhekou  :  1
        }
    ]




##  加入收藏   Client.User.AddToFavorite （ /add_to_favorite.html ）
###   Client.User.AddToFavorite 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|favoriteType|收藏类型|是|-
|itemId|收藏对象Id|是|-

### Client.User.AddToFavorite 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|errcode|返回码|0代表success

### Client.User.AddToFavorite 请求结果:

    {
        "errcode":"0",
        "errMsg":"success",
        "relateObj":""
    }

##   删除收藏   Client.User.RemoveFavorite ( /remove_favorite.html )
###   Client.User.RemoveFavorite 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|favoriteType|收藏类型|是|-
|itemId|取消收藏对象Id|是|-

### Client.User.RemoveFavorite 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|errcode|返回码|0代表success

### Client.User.RemoveFavorite 请求结果:

    {
        "errcode":"0",
        "errMsg":"success",
        "relateObj":""
    }

##   获取商品评论  Client.Order.CommentList （ /get_product_comment_list.html ）
###   Client.Order.CommentList 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|productId|产品ID|是|-
|shopId|店铺ID|是|-

###  Client.Order.CommentList 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|comment|评价的产品ID|-
|shopId|评价的店铺ID|-
|commentTime|评价时间|-
|commentPlatformUserId|评价的平台用户ID|-
|commentImagesJson|评价的图片JSON|-
|productName|评价的商品名|-
|productImage|评价的商品图|-
|shopName|评价的店铺名|-
|shopImage|评价的店铺logo|-
|niming|匿名评价(0不匿名1匿名)|-
|pingfen|整体评分(012345表示五个星012表示不满意满意非常满意)|-
|shangpinfuhedu|商品符合度12345|-
|dianjiafuwutaidu|店家服务态度12345|-
|wuliufahuosudu|物流发货速度12345|-
|peisongyuanfuwutaidu|配送员态度12345|-
|commentWithImgTag|含图像的评论|-
|commentWithNoImg|文字评论|-
|commentUserName|评论的用户昵称|-
|commentUserIcon|评论的用户头像|-
|jifen|评论获取的积分|-


###  Client.Order.CommentList 请求结果:

    {
      "pageSize": 16,
      "curPage": 1,
      "totalSize": 2,
      "result": [
        {
          "jsonRemark":
          {
                beanRemark: '用户商品店铺评价表',
                comment: '评价内容',
                productId: '评价的产品ID
                shopId:'评价的店铺ID',
                 commentTime:'评价时间',
                 commentPlatformUserId:'评价的平台用户ID',
                 commentImagesJson:'评价的图片JSON',
                 productName:'评价的商品名',
                 productImage:'评价的商品图',
                 shopName:'评价的店铺名',
                 shopImage:'评价的店铺logo',
                 niming:'匿名评价(0不匿名1匿名)',
                 pingfen:'整体评分(012345表示五个星012表示不满意满意非常满意)',
                 shangpinfuhedu:'商品符合度12345',
                 dianjiafuwutaidu:'店家服务态度12345',
                 wuliufahuosudu:'物流发货速度12345',
                 peisongyuanfuwutaidu:'配送员态度12345',
                 belongOrderNo:'归属订单编号',
                 newComment:'(忽略)',
                 commentWithImgTag:'含图像的评论',
                 commentWithNoImg:'文字评论',
                 commentUserName:'评论的用户昵称',
                 commentUserIcon:'评论的用户头像',
                 platformNo:'平台号',
                 jifen:'评论获取的积分'
             },
           "id": 581,
          "comment": "啊啊啊啊啊啊啊啊啊啊",
          "productId": 8156,
          "shopId": 250,
          "commentTime": "2017-12-13 13:27:31",
          "commentPlatformUserId": 62692,
          "commentImagesJson": "http://tmp/wx42d98cf6cb1a1316.o6zAJs7Y_Vaz5cf-sA2Me4RLuMKI.ad8178cff2d422d8fa368c57b3a3232b.jpg,http://tmp/wx42d98cf6cb1a1316.o6zAJs7Y_Vaz5cf-sA2Me4RLuMKI.d7b61c2a1596a325beb58f2cbde6523b.jpg",
          "productName": "火参果",
          "productImage": "http://image1.sansancloud.com/shuiguo/2017_12/07/10/00/43_705.jpg",
          "shopName": "shuiguo",
          "shopImage": "",
          "niming": 0,
          "pingfen": 5,
          "shangpinfuhedu": 0,
          "dianjiafuwutaidu": 0,
          "wuliufahuosudu": 0,
          "peisongyuanfuwutaidu": 0,
          "platformNo": "shuiguo",
          "belongOrderNo": "20171213132537717001",
          "newComment": 0,
          "commentWithImgTag": "啊啊啊啊啊啊啊啊啊啊",
          "commentWithNoImg": "啊啊啊啊啊啊啊啊啊啊",
          "commentUserName": "jzq1111111",
          "commentUserIcon": "http://image1.sansancloud.com/jianzhan/2017_11/21/15/53/14_323.jpg",
          "monthDay": "12月13日",
          "jifen": 0
        },
        {
          "jsonRemark": "{beanRemark:'用户商品店铺评价表',comment:'评价内容',productId:'评价的产品IDshopId:'评价的店铺ID', commentTime:'评价时间',commentPlatformUserId:'评价的平台用户ID',commentImagesJson:'评价的图片JSON',productName:'评价的商品名',productImage:'评价的商品图',shopName:'评价的店铺名',shopImage:'评价的店铺logo',niming:'匿名评价(0 不匿名 1匿名)',pingfen:'整体评分(0 ,1 2 3 4 5 表示 五个星          0  1 2  表示 不满意 满意 非常满意)',shangpinfuhedu:'商品符合度  1 2 3 4 5 ',dianjiafuwutaidu:'店家服务态度 1 2 3 4 5 ',wuliufahuosudu:'物流发货速度 1 2 3 4 5 ',peisongyuanfuwutaidu:'配送员态度 1 2 3 4 5 ',belongOrderNo:'归属订单编号',newComment:'(忽略)',commentWithImgTag:'含图像的评论',commentWithNoImg:'文字评论',commentUserName:'评论的用户昵称',commentUserIcon:'评论的用户头像',platformNo:'平台号',jifen:'评论获取的积分'}",
          "id": 566,
          "comment": "yyyyyyyyyyyy",
          "productId": 8156,
          "shopId": 250,
          "commentTime": "2017-12-08 10:45:47",
          "commentPlatformUserId": 62692,
          "commentImagesJson": "",
          "productName": "火参果",
          "productImage": "http://image1.sansancloud.com/shuiguo/2017_12/07/10/00/43_705.jpg",
          "shopName": "shuiguo",
          "shopImage": "",
          "niming": 0,
          "pingfen": 2,
          "shangpinfuhedu": 0,
          "dianjiafuwutaidu": 0,
          "wuliufahuosudu": 0,
          "peisongyuanfuwutaidu": 0,
          "platformNo": "shuiguo",
          "belongOrderNo": "20171208103705784001",
          "newComment": 0,
          "commentWithImgTag": "yyyyyyyyyyyy",
          "commentWithNoImg": "yyyyyyyyyyyy",
          "commentUserName": "jzq1111111",
          "commentUserIcon": "http://image1.sansancloud.com/jianzhan/2017_11/21/15/53/14_323.jpg",
          "monthDay": "12月08日",
          "jifen": 0
        }
      ]
    }

## 立即购买   Client.User.BuyNow （ /buy_now.html ）

###   Client.User.BuyNow 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|productId|产品ID|是|-
|shopId|店铺ID|是|-
|orderType|订单类型 0 普通订单 1 服务类订单 3 预售  4充值  5租赁 6租赁消费支付|是|-
|itemCount|产品数量|是|-

###  Client.User.BuyNow 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|jsonRemark|返回数据备注|-
|orderNo|订单Bean|-
|orderType|订单类型(0普通订单 1到店服务到店自取订单  3预售订单 4充值订单  5租赁抵押订单 6租赁租金支付订|-
|orderStatus|订单状态(0未提交 1已提交 2确认失败 3确认成功 4已送货  5已到货 6已完成  7作废  8已退款)|-
|payStatus|支付状态(0 未支付  1已支付  2已退款)|-
|easyStatus|订单简易状态(1待提交  2待付款  3待发货 4待收货 5待评价  6完成 7作废 8关闭 9退款  10待完成)|-
|buyerName|购买人姓名|-
|goodsAmount|订单金额(商品金额+运费)|-
|goodsOnlyAmount|支付金额(应付金额 goodsAmount-youhuiAmount+adminChangeAmount)|-
|youhuiAmount|优惠金额|-
|yunfeiAmount|运费金额|-
|jifenDikou|订单积分抵扣|-


###  Client.User.BuyNow 请求结果:

    {
      "jsonRemark":
          {
            beanRemark: '订单Bean',
            orderNo: '订单编号',
            orderType: '订单类型(0普通订单 1到店服务到店自取订单  3预售订单 4充值订单  5租赁抵押订单 6租赁租金支付订单',
            chatOrder: '是否会话订单(0 否 1会话订单 >1会话聊天室roomId-参考 ProductChatRoom)',
            orderStatus: '订单状态(0未提交 1已提交 2确认失败 3确认成功 4已送货  5已到货 6已完成  7作废  8已退款)',
            shippingStatus: '送货状态(作废)',
            payStatus: '支付状态(0 未支付  1已支付  2已退款)',
            easyStatus: '订单简易状态(1待提交  2待付款  3待发货 4待收货 5待评价  6完成 7作废 8关闭 9退款  10待完成)',
            easyStatusStr: '订单简易状态',
            payType: '支付类型(0货到付款 1支付宝 2余额支付 3微信支付 4网银支付  5线下支付  9积分支付)',
            payTypeStr: '支付类型文字描述',
            thirdOrderNo: '支付第三方单号',
            buyerLoginName: '购买人登陆名',
            buyerId: '购买人用户ID',
            buyerName: '购买人姓名',
            addressId: '订单使用的地址ID(参考 ProductOrderAddress)',
            buyerAddress: '购买人地址',
            buyerTelno: '购买人电话',
            buyerLongitude: '购买人所在经度',
            buyerLatitude: '购买人所在维度',
            buyerProvince: '购买人省份',
            buyerCity: '购买人城市',
            buyerArea: '购买人县区',
            buyerBestTime: '最佳送货时间',
            buyerScript: '购买人备注',
            invPayee: '发票抬头',
            invType: '发票类型(0个人  1单位)',
            invNeed: '需要发票(0不需要 1需要)',
            naShuiHao: '开票人纳税号',
            goodsAmount: '订单金额(商品金额+运费)',
            goodsOnlyAmount: '商品金额',
            payAmount: '支付金额(应付金额 goodsAmount-youhuiAmount+adminChangeAmount)',
            youhuiAmount: '优惠金额',
            yunfeiAmount: '运费金额',
            adminChangeAmount: '管理员变更订单金额',
            backAmount: '退款金额',
            prepayAmount: '预付金额(预售订单使用)',
            jifenDikou: '订单积分抵扣',
            fxProfit: '分销利润',
            huikuanImage: '汇款截图(线下汇款订单使用)',
            expressNo: '订单使用的快递策略号',
            expressStrategyNo: '当expressNo=-1时候 expressStrategyNo根据系统设定自动选择快递策略 否则该值等于expressNo',
            expressStrategy: '快递策略 (参考ProductExpressStrategy)',
            addTime: '生成订单时间',
            confirmTime: '订单确认时间',
            payTime: '订单支付时间',
            receiveTime: '订单到货时间',
            sendTime: '订单发货时间',
            finishedTime: '订单完成时间',
            cancelTime: '订单取消时间',
            confirmMessage: '订单确认消息(确认成功或失败消息)',
            kuaidi: '快递公司编号',
            kuaidiName: '快递公司名',
            invoiceNo: '发货单号',
            belongShop: '归属店铺',
            belongShopName: '归属店铺名',
            useCouponId: '使用的优惠券ID',
            useCouponNo: '使用优惠券号',
            kaiHuHang: '开户行',
            yinHangZhanghao: '银行账号',
            lianxiDianhua: '联系电话',
            lianxiDizhi: '联系地址',
            isComment: '订单是否评论(0未激活评论 1待评论 2已评价)',
            comment: '订单是否评论(0未激活评论 1待评论 2已评价)',
            commentId: '评价ID',
            unshowStatus: '是否对用户隐藏(用户删除订单后就隐藏)',
            tradeType: '交易类型(APP APP下单       JSAPI 微信下单)',
            fromSource: '订单来源(wx  ios_app android_app pc)',
            pressCount: '用户催单次数',
            reversePressCount: '反向催单 店铺向用户催单',
            gainJifen: '订单获得积分数',
            leaseRecordId: '租赁记录ID',
            userTagPriceOrder: '是否使用吊牌价订单(0否 1是 订单商品都要用吊牌价)',
            promotionId: '归属活动ID',
            promotionName: '归属活动名称',
            leaseRecordId: '租赁记录ID(租赁订单 关联租金记录)',
            managerRemark: '后台备注信息',
            innerOrder: '内部测试订单(0否 1是)',
            belongStorageId: '归属店仓ID',
            storageName: '归属店仓名',
            wuliuPackageNo: '物流包号(发货打包物流时候产生物流包号)',
            wuliuImportNo: '物流导入号(默认与订单号相同  如果有合并同用户地址订单则与与用户信息相关)',
            wuliuPackageTime: '物流打包时间',
            pushToErp: '推送至ERP订单(0无需推送  其他状态根据订单状态推送  9999推送失败)',
            logs: '操作记录 (参考List<ProductLog>)',
            promotion: '活动Bean (参考 ProductOrderPromotion)',
            orderShops: '店铺归集订单项(参考 List<ProductShop>)',
            tempShopOrderItems: '店铺归集订单项 (参考 Map<ProductShop, List<ProductOrderItem>>)',
            orderItems: '订单项(参考 List<ProductOrderItem>)',
            orderProcessList: '订单操作记录( 弃用  参考List<ProductOrderProcess>)',
            logs: '操作记录 (参考List<ProductLog>)',
            availableCoupons: '订单可用的优惠券 (参考List<ProductCouponGotList>)',
            chatRoom: '关联的聊天室(参考 ProductChatRoom)',
            orderJifen: '订单使用积分Bean (参考OrderJifenBean)',
            commentBean: '订单可用的评价Bean (参考ProductComment)',
            platformNo: '平台号'
          },
       "id": 84439,
      "orderNo": "20180116173506091001",
      "orderStatus": 0,
      "shippingStatus": 0,
      "payStatus": 0,
      "payType": 0,
      "payTypeStr": "货到付款",
      "buyerName": "zzj",
      "buyerAddress": "asdascsd ",
      "buyerTelno": "18975646352",
      "buyerBestTime": "",
      "invType": 0,
      "invNeed": 0,
      "buyerId": 47624,
      "goodsAmount": 5,
      "goodsOnlyAmount": 0,
      "payAmount": 0,
      "addTime": "2018-01-16 17:35:06",
      "belongShop": 250,
      "belongShopName": "shuiguo",
      "useCouponId": 0,
      "useCouponTypeId": 0,
      "useCouponTypeName": "",
      "youhuiAmount": 0,
      "buyerProvince": "山西省",
      "buyerCity": "阳泉市",
      "buyerArea": "郊区",
      "yunfeiAmount": 0,
      "isComment": 0,
      "platformNo": "shuiguo",
      "shop": {
        "id": 250,
        "shopName": "shuiguo",
        "shopDescription": "",
        "shopLogo": "",
        "belongAreaId": 0,
        "belongUserId": 0,
        "belongShangquanId": 0,
        "shopLevelId": 0,
        "hotShop": 0,
        "shopLevelValue": 0,
        "shopTip": "",
        "checkTime": "2017-11-27 14:20:40",
        "checkUserId": 0,
        "checkState": 1,
        "setEnable": 1,
        "platformNo": "shuiguo",
        "telno": "",
        "range": 0,
        "ownerName": "",
        "favoriteCount": 0,
        "ownerQq": "",
        "ownerEmail": "",
        "deleteFlag": 0,
        "turnover": 2506,
        "shopContent": "",
        "adverts": [

        ],
        "productCount": 0,
        "platformShop": 0,
        "shopScore": 8,
        "scoreNum": 11,
        "averageScore": 0.7272727272727273,
        "averageScoreHundred": 36.36,
        "shopOrder": 0,
        "shopIndexPage": "",
        "orderItems": [
          {
            "jsonRemark": "{beanRemark:'用户订单项表',belongOrderNo:'归属订单号',itemId:'产品ID',itemName:'产品名',shopId:'归属店铺ID',shopName:'店铺名',itemPrice:'产品价格',itemTagPrice:'产品标价',itemCount:'产品数量',itemIcon:'产品图标',buyerPayPrice:'购买人应支付价格',buyerZhekou:'购买人享折扣',buyerID:'购买人ID',buyerType:'购买人类型(弃用)',buyerLevel:'购买人等级(参考 用户等级)(用户分等级时使用)',yunfei:'产品运费',measures:'规格描述(规格产品时使用-如衣服红色L码)', measureCartesianId :'规格集ID(规格产品时使用)',waitComment:'评价状态(0 无需评价 1 待评价 2 已评价)',commentId:'评论ID',platformNo:'归属平台号',backItem:'退货退款 ( 0  未退款  1退款处理中  2 同意退款  3 已退款    5 拒绝退款)',sendStorageName:'发货店仓名(多店仓时使用)',sendStorageId:'发货店仓ID(多店仓时使用)',itemCode:'产品编码(多规格产品为规格集编码)',uploadAfterPlatform:'是否同步 至后置平台店铺0 否  1是',productCode:'产品编码(非多规格产品 productCode等于itemCode)'}",
            "id": 100685,
            "belongOrderNo": "20180116173506091001",
            "itemId": 8156,
            "itemName": "火参果",
            "shopId": 250,
            "shopName": "shuiguo",
            "itemPrice": 5,
            "itemTagPrice": 8,
            "itemCount": 1,
            "itemIcon": "http://image1.sansancloud.com/shuiguo/2017_12/07/10/00/43_705.jpg",
            "buyerPayPrice": 5,
            "buyerZhekou": 100,
            "buyerId": 47624,
            "buyerType": 0,
            "yunfei": 0,
            "waitComment": 0,
            "commentId": 0,
            "platformNo": "shuiguo",
            "backItem": 0,
            "sendStorageId": 0,
            "itemCode": "",
            "productCode": "",
            "uploadAfterPlatform": 0
          }
        ],
        "carItems": [

        ],
        "shopFavorite": 0,
        "backOrderCount": 0,
        "maxOrderPerDay": 0,
        "todayOrderCount": 0,
        "serviceOrderCount": 17,
        "printerType": 1,
        "printerPartner": "",
        "printerMachineCode": "",
        "printerApiKey": "",
        "printerMachineKey": "",
        "serviceStartTime": 0,
        "serviceEndTime": 24,
        "account": {
          "id": 40,
          "shopId": 250,
          "shopName": "shuiguo",
          "platformNo": "shuiguo",
          "account": 0
        }
      },
      "buyerLongitude": 0,
      "buyerLatitude": 0,
      "addressId": 31722,
      "easyStatus": 0,
      "easyStatusStr": "",
      "backAmount": 0,
      "thirdOrderNo": "",
      "orderType": 0,
      "prepayAmount": 0,
      "fxProfit": 0,
      "chatOrder": 0,
      "jifenDikou": 0,
      "unshowStatus": 0,
      "comment": 0,
      "commentId": 0,
      "pressCount": 0,
      "reversePressCount": 0,
      "gainJifen": 0,
      "buyerLoginName": "18911111111",
      "leaseRecordId": 0,
      "userTagPriceOrder": 0,
      "promotionId": "0",
      "adminChangeAmount": 0,
      "expressNo": "-1",
      "innerOrder": 0,
      "belongStorageId": 0,
      "promotionName": "",
      "wuliuPackageNo": "",
      "wuliuImportNo": "",
      "pushToErp": 0,
      "fromSource": "",
      "orderShops": [

      ],
      "tempShopOrderItems": {

      },
      "orderItems": [
        {
          "jsonRemark": "{beanRemark:'用户订单项表',belongOrderNo:'归属订单号',itemId:'产品ID',itemName:'产品名',shopId:'归属店铺ID',shopName:'店铺名',itemPrice:'产品价格',itemTagPrice:'产品标价',itemCount:'产品数量',itemIcon:'产品图标',buyerPayPrice:'购买人应支付价格',buyerZhekou:'购买人享折扣',buyerID:'购买人ID',buyerType:'购买人类型(弃用)',buyerLevel:'购买人等级(参考 用户等级)(用户分等级时使用)',yunfei:'产品运费',measures:'规格描述(规格产品时使用-如衣服红色L码)', measureCartesianId :'规格集ID(规格产品时使用)',waitComment:'评价状态(0 无需评价 1 待评价 2 已评价)',commentId:'评论ID',platformNo:'归属平台号',backItem:'退货退款 ( 0  未退款  1退款处理中  2 同意退款  3 已退款    5 拒绝退款)',sendStorageName:'发货店仓名(多店仓时使用)',sendStorageId:'发货店仓ID(多店仓时使用)',itemCode:'产品编码(多规格产品为规格集编码)',uploadAfterPlatform:'是否同步 至后置平台店铺0 否  1是',productCode:'产品编码(非多规格产品 productCode等于itemCode)'}",
          "id": 100685,
          "belongOrderNo": "20180116173506091001",
          "itemId": 8156,
          "itemName": "火参果",
          "shopId": 250,
          "shopName": "shuiguo",
          "itemPrice": 5,
          "itemTagPrice": 8,
          "itemCount": 1,
          "itemIcon": "http://image1.sansancloud.com/shuiguo/2017_12/07/10/00/43_705.jpg",
          "buyerPayPrice": 5,
          "buyerZhekou": 100,
          "buyerId": 47624,
          "buyerType": 0,
          "yunfei": 0,
          "waitComment": 0,
          "commentId": 0,
          "platformNo": "shuiguo",
          "backItem": 0,
          "sendStorageId": 0,
          "itemCode": "",
          "productCode": "",
          "uploadAfterPlatform": 0
        }
      ],
      "orderProcessList": [

      ],
      "availableCoupons": [

      ]
    }

## 获取规格集   Client.Product.GetMeasureCartesion （ /get_measure_cartesion.html ）


###    Client.Product.GetMeasureCartesion  请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|productId|产品ID|是|-
|measureIds|规格集ID|是|-

###   Client.Product.GetMeasureCartesion  返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|jsonRemark|返回数据备注|-
|measureIdCartesian|规格id集合|-
|stock|规格库存|-
|tagPrice|规格标价|-
|price|规格售价|-
|price2|价格2|-
|minSaleCount|最少购买数量|-
|distributeProfit|分配利润(分销时候可利润分配)|-
|description|描述|-
|itemId|产品ID|-
|itemName|产品名|-
|productBarCode|规格编码|-


###   Client.Product.GetMeasureCartesion  请求结果:

    {
      "jsonRemark": {
                      beanRemark: '规格集Bean',
                      measureIdCartesian: '规格id集合',
                      stock: '规格库存',
                      tagPrice: '规格标价',
                      price: '规格售价',
                      price2: '价格2',
                      price3: '价格3',
                      presalePrice: '预售价(预售商品使用)',
                      distributeProfit: '分配利润(分销时候可利润分配)',
                      minSaleCount: '最少购买数量',
                      description: '描述',
                      remarkNumber: '备注编号',
                      itemId: '产品ID',
                      itemName: '产品名',
                      productCode: '产品编码',
                      productBarCode: '规格编码',
                      measuresShow: '规格展示',
                      synchroStock: '同步比例(对接库存时使用)',
                      synchroTime: '同步时间(对接库存时使用)',
                      yunfeiTemplate: '运费模板(暂未实现)',
                      platformNo: '平台号'
                    },
       "id": 16131,
      "measureIdCartesian": "15:740\n17:745\n",
      "stock": 30,
      "tagPrice": 100,
      "price": 100,
      "price2": 0,
      "price3": 0,
      "presalePrice": 0,
      "distributeProfit": 0,
      "minSaleCount": 1,
      "description": "未定义",
      "productBarCode": "",
      "remarkNumber": "",
      "itemId": 8164,
      "itemName": "红枣",
      "platformNo": "shuiguo",
      "productCode": "",
      "synchroStock": 1,
      "measurements": [
        {
          "jsonRemark": "{beanRemark:'规格Bean',measureTypeName:'规格分类名',measureName:'规格名',measureIcon:'规格图案',measureShowType:'规格显示方式(弃用)',measureTypeId:'规格类型ID',measureCode:'规格编码',remarkNumber:'备注编号',platformNo:'平台号' }",
          "id": 740,
          "measureTypeName": "颜色",
          "measureName": "红色",
          "measureShowType": 0,
          "platformNo": "shuiguo",
          "measureTypeId": 15,
          "measureCode": ""
        },
        {
          "jsonRemark": "{beanRemark:'规格Bean',measureTypeName:'规格分类名',measureName:'规格名',measureIcon:'规格图案',measureShowType:'规格显示方式(弃用)',measureTypeId:'规格类型ID',measureCode:'规格编码',remarkNumber:'备注编号',platformNo:'平台号' }",
          "id": 745,
          "measureTypeName": "份数",
          "measureName": "大份",
          "measureShowType": 0,
          "platformNo": "shuiguo",
          "measureTypeId": 17,
          "measureCode": ""
        }
      ],
      "available": false,
      "exist": true,
      "yunfei": 0,
      "yunfeiTemplate": 0,
      "relateId": ""
    }