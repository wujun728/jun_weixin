### 商品列表页-第三种样式  pages/product_waimai/index

### 使用接口

    获取商品列表 Client.Get.ProductListMore ( /more_product_list.html )

    改变购物车商品数量，加入购物车 Client.User.ChangeCarItemCount（/change_shopping_car_item.html  ）

    根据选中的商品获取活动列表   Client.User.ListPromotionsByCarItems（ list_promotions_by_car_items ）

    选中的商品生成订单   Client.User.CarItemsCreateOrder（ shopping_car_list_item_create_order ）

    
### 链接地址

     获取商品列表 https://mini.sansancloud.com/chainalliance/xianhua/more_product_list.html
     改变购物车商品数量  https://mini.sansancloud.com/chainalliance/xianhua/change_shopping_car_item.html
     根据选中的商品获取活动列表 https://mini.sansancloud.com/chainalliance/xianhua/list_promotions_by_car_items.html
     选中的商品生成订单 https://mini.sansancloud.com/chainalliance/xianhua/shopping_car_list_item_create_order.html
 
## 获取商品列表 Client.Get.ProductListMore ( /more_product_list.html )
###  Client.Get.ProductListMore 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|categoryId|类型id|否|-
|belongShop|所属店铺|否|-
|typeBelongShop|所属店铺类别|否|-
|page|第几页|否|-
|showType|显示方式|否|-
|showColumn|显示几列|否|-
|categoryId|类型id|否|-
|productName|商品名称|否|-
|startPrice|最低价格|否|-
|endPrice|最高价格|否|-
|orderType|排序方式|否|-

### Client.Get.ProductListMore 返回字段说明

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


### Client.Get.ProductListMore  请求结果:

    {
      "pageSize": 20,
      "curPage": 1,
      "totalSize": 4,
      "result": [
        {
          "id": 8229,
          "imagePath": "http://image1.sansancloud.com/shuiguofenxiao/2017_12/26/12/03/29_458.jpg",
          "name": "新疆阿克苏糖心苹果",
          "tagPrice": 100,
          "price": 100,
          "price2": 0,
          "saleCount": 1,
          "category": 1225,
          "saleTime": "2017-12-12 21:57:30",
          "hotSale": 0,
          "disable": 0,
          "description": "",
          "orderNumber": "20171212215730",
          "readCount": 0,
          "stock": 1,
          "price3": 0,
          "productCode": "",
          "belongAreaId": 0,
          "belongShangquanId": 0,
          "belongShopId": 259,
          "belongAreaName": "",
          "belongShangquanName": "",
          "belongShopName": "水果分销",
          "tags": "",
          "promotion": "0",
          "platformNo": "shuiguofenxiao",
          "addTime": "2017-12-12 21:57:30",
          "minSaleCount": 1,
          "bigSmallUnitScale": 1,
          "tip": "",
          "unitShow": "个",
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
          "brandId": 0,
          "commentCount": 0,
          "yunfei": 0,
          "yunfeiTemplate": 0,
          "productType": 0,
          "presalePrice": 0,
          "distributeProfit": 20,
          "daidingPlatformUserId": 0,
          "remark": "",
          "pingfen": 0,
          "pingfenCount": 0,
          "leaseUnitTypeStr": "小时",
          "productYear": "2017",
          "attributesCombind": "",
          "leaseUnitType": 0,
          "leaseUnitAmount": 0,
          "leaseUnitExpireAmount": 0,
          "leaseNeedBackUnitCount": 1,
          "measureItem": 0,
          "saleStrategyDetails": [

          ]
        },
      ]
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


## 选中的商品生成订单   Client.User.CarItemsCreateOrder（shopping_car_list_item_create_order）
###  Client.User.CarItemsCreateOrder 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|selectedIds|选中的商品id|是|-
|shopId|所属店铺|是|-
|typeBelongShop|所属店铺类别|否|-

### Client.User.CarItemsCreateOrder 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|orderNo|订单号|需要订单号才能编辑订单
|orderItems|订单里面的商品|数组
|orderStatus|订单状态|-
|payType|支付状态|0为未支付
|payTypeStr|支付状态说明|-

### Client.User.ListPromotionsByCarItems  请求结果:
    {
        addTime:"2018-01-16 14:29:07"
        adminChangeAmount:0
        availableCoupons:[]
        backAmount:0
        belongShop:257
        belongShopName:"福州鲜花批发"
        belongStorageId:0
        buyerArea:""
        buyerBestTime:""
        buyerCity:""
        buyerId:60176
        buyerLoginName:"112728"
        buyerName:"蒋"
        buyerProvince:""
        buyerTelno:""
        chatOrder:0
        comment:0
        commentId:0
        easyStatus:0
        easyStatusStr:""
        expressNo:"-1"
        fromSource:""
        fxProfit:0
        gainJifen:0
        goodsAmount:2708
        goodsOnlyAmount:0
        id:84313
        innerOrder:0
        invNeed:0
        invType:0
        isComment:0
        jifenDikou:0
        jsonRemark:"{beanRemark:'订单Bean',orderNo:'订单编号',orderType:'订单类型(0普通订单 1到店服务到店自取订单  3预售订单 4充值订单  5租赁抵押订单 6租赁租金支付订单',chatOrder:'是否会话订单(0 否 1会话订单 >1会话聊天室roomId-参考 ProductChatRoom)',orderStatus:'订单状态(0未提交 1已提交 2确认失败 3确认成功 4已送货  5已到货 6已完成  7作废  8已退款)',shippingStatus:'送货状态(作废)',payStatus:'支付状态(0 未支付  1已支付  2已退款)',easyStatus:'订单简易状态(1待提交  2待付款  3待发货 4待收货 5待评价  6完成 7作废 8关闭 9退款  10待完成)',easyStatusStr:'订单简易状态',payType:'支付类型(0货到付款 1支付宝 2余额支付 3微信支付 4网银支付  5线下支付  9积分支付)',payTypeStr:'支付类型文字描述',thirdOrderNo:'支付第三方单号',buyerLoginName:'购买人登陆名',buyerId:'购买人用户ID',buyerName:'购买人姓名',addressId:'订单使用的地址ID(参考 ProductOrderAddress)',buyerAddress:'购买人地址',buyerTelno:'购买人电话',buyerLongitude:'购买人所在经度',buyerLatitude:'购买人所在维度',buyerProvince:'购买人省份',buyerCity:'购买人城市',buyerArea:'购买人县区',buyerBestTime:'最佳送货时间',buyerScript:'购买人备注',invPayee:'发票抬头',invType:'发票类型(0个人  1单位)',invNeed:'需要发票(0不需要 1需要)',naShuiHao:'开票人纳税号',goodsAmount:'订单金额(商品金额+运费)',goodsOnlyAmount:'商品金额',payAmount:'支付金额(应付金额 goodsAmount-youhuiAmount+adminChangeAmount)',youhuiAmount:'优惠金额',yunfeiAmount:'运费金额',adminChangeAmount:'管理员变更订单金额',backAmount:'退款金额',prepayAmount:'预付金额(预售订单使用)',jifenDikou:'订单积分抵扣',fxProfit:'分销利润',huikuanImage:'汇款截图(线下汇款订单使用)',expressNo:'订单使用的快递策略号',expressStrategyNo:'当expressNo=-1时候 expressStrategyNo根据系统设定自动选择快递策略 否则该值等于expressNo',expressStrategy:'快递策略 (参考ProductExpressStrategy)',addTime:'生成订单时间',confirmTime:'订单确认时间',payTime:'订单支付时间',receiveTime:'订单到货时间',sendTime:'订单发货时间',finishedTime:'订单完成时间',cancelTime:'订单取消时间',confirmMessage:'订单确认消息(确认成功或失败消息)',kuaidi:'快递公司编号',kuaidiName:'快递公司名',invoiceNo:'发货单号',belongShop:'归属店铺',belongShopName:'归属店铺名',useCouponId:'使用的优惠券ID',useCouponNo:'使用优惠券号',kaiHuHang:'开户行',yinHangZhanghao:'银行账号',lianxiDianhua:'联系电话',lianxiDizhi:'联系地址',isComment:'订单是否评论(0未激活评论 1待评论 2已评价)',comment:'订单是否评论(0未激活评论 1待评论 2已评价)',commentId:'评价ID',unshowStatus:'是否对用户隐藏(用户删除订单后就隐藏)',tradeType:'交易类型(APP APP下单       JSAPI 微信下单)',fromSource:'订单来源(wx  ios_app android_app pc)',pressCount:'用户催单次数',reversePressCount:'反向催单 店铺向用户催单',gainJifen:'订单获得积分数',leaseRecordId:'租赁记录ID',userTagPriceOrder:'是否使用吊牌价订单(0否 1是 订单商品都要用吊牌价)',promotionId:'归属活动ID',promotionName:'归属活动名称',leaseRecordId:'租赁记录ID(租赁订单 关联租金记录)',managerRemark:'后台备注信息',innerOrder:'内部测试订单(0否 1是)',belongStorageId:'归属店仓ID',storageName:'归属店仓名',wuliuPackageNo:'物流包号(发货打包物流时候产生物流包号)',wuliuImportNo:'物流导入号(默认与订单号相同  如果有合并同用户地址订单则与与用户信息相关)',wuliuPackageTime:'物流打包时间',pushToErp:'推送至ERP订单(0无需推送  其他状态根据订单状态推送  9999推送失败)',logs:'操作记录 (参考List<ProductLog>)',promotion:'活动Bean (参考 ProductOrderPromotion)',orderShops:'店铺归集订单项(参考 List<ProductShop>)',tempShopOrderItems:'店铺归集订单项 (参考 Map<ProductShop, List<ProductOrderItem>>)',orderItems:'订单项(参考 List<ProductOrderItem>)',orderProcessList:'订单操作记录( 弃用  参考List<ProductOrderProcess>)',logs:'操作记录 (参考List<ProductLog>)',availableCoupons:'订单可用的优惠券 (参考List<ProductCouponGotList>)',chatRoom:'关联的聊天室(参考 ProductChatRoom)',orderJifen:'订单使用积分Bean (参考OrderJifenBean)',commentBean:'订单可用的评价Bean (参考ProductComment)',platformNo:'平台号' }"
        leaseRecordId:0
        orderItems:[{,…}, {,…}, {,…}]
        orderNo:"20180116142906000001"
        orderProcessList:[]
        orderShops:[]
        orderStatus:0
        orderType:0
        payAmount:0
        payStatus:0
        payType:0
        payTypeStr:"货到付款"
        platformNo:"xianhua"
        prepayAmount:0
        pressCount:0
        promotionId:"0"
        promotionName:""
        pushToErp:0
        reversePressCount:0
        shippingStatus:0
        shop:{id: 257, shopName: "福州鲜花批发", shopDescription: "", shopLogo: "", belongAreaId: 0, belongUserId: 0,…}
        tempShopOrderItems:{}
        thirdOrderNo:""
        unshowStatus:0
        useCouponId:0
        useCouponTypeId:0
        useCouponTypeName:""
        userTagPriceOrder:0
        wuliuImportNo:""
        wuliuPackageNo:""
        youhuiAmount:0
        yunfeiAmount:0
    }