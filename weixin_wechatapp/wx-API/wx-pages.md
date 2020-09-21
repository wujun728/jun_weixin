# 微信小程序
## 微信小程序电商源码：外卖小程序，电商小程序，门店类小程序，展示类小程序，批发商城小程序。

#### 项目介绍

	1.此项目是一套完整的电商系统，并且兼容各种电商场景可以很好的运用在各个领域。
	2.包含页面数43页，组件数14
	3.开源前端代码供大家学习，并且有许多漂亮的页面模板。

#### 页面架构与说明

    进入页 : pages/index/index
    首页 : custom_page_index
    新闻页 : news_list  news_detail
    版权说明 : custom_page_copyright
    我的 : custom_page_userinfo
    列表页 : search_product
    三级列表 : search_product2
    列表页2 : product_tree_list
    列表页3 : product_waimai
    列表页4 : product_waimai_offline
    二级列表 : product_type2
    商品详情 : productDetail
    订单列表 : order_list
    订单详细 : order_detail
    编辑订单 : edit_order
    提交订单完成与付款页面 : submit_order_result
    退货列表 : back_item_list
    退货详情 : back_item_detail
    评价订单 : order_shop_comment
    大师推荐 : brand_list
    大师推荐详细 : brand_detail
    购物车 : shopping_car_list
    登录 : login
    注册 : regist
    用户协议 : regist_xieyi
    优惠券 : my_coupons
    获取优惠券 : available_coupons
    收藏与喜欢 : my_favorite
    积分 	user_jifen_events
    个人资料 : pre_change_user_info
    我的消息 : message_counter2
    地址 : address
    添加新地址 : add_address
    我的足迹 : user_visit_items
    余额充值列表 : user_account_events
    余额充值页面 : user_recharge
    商品管理 : shop_manager_products
    分销中心 : fx_center
    分销二维码 : fx_qrcode
    推广3级用户 : fx_users
    佣金记录 : fx_yongjin_list
    提现记录 : tixian_list
    申请提现 : req_tixian_section




## 页面详情说明
#### 后台接口地址 120.27.155.56:1111  （TIP -- 需要查看返回数据说明直接访问选择接口查看）



#### 进入页 : pages/index/index

    页面功能：页面主要处理进入动画或者加载前操作，
    使用方式：放在app.json中pages的第一项
    页面主要处理函数：onload --> 判定扫码状态并且指定当前的项目名称
                    app.getSetting()
    使用接口： 无（暂时 - 可以自定义）
              Client.GetPlatformSetting - get_platform_setting
    返回的json说明: 全局字段定义。 商品分类字段也在里面


####  首页 : custom_page_index

    页面功能：首页展示，
    页面主要处理函数: getParac --> 获取此页面后台配置信息
                     getPartials --> 强转json
                     tolinkUrl --> 页面跳转方式
    使用接口： custom_page_:id
    参数说明： jsonOnly=1（表示返回的数据格式为json）
    返回的json说明: "{beanRemark:'自定义页面表',channelName:'页面名称(只允许英文数字结合)',channelTitle:'页面标题channelDescription:'页面描述',channelKeywords:'页面关键词',channelTemplate:'页面使用模板',pageType:'页面类型(弃用)',index:'是否主页 (弃用  0 否 1 是)',belongShopId:'归属店铺ID(0 平台页面  )',platformNo:'平台号',belongShopName:'归属店铺名',functionType:'页面是单独页面还是页面的某个模块  0页面 1模块',terminalType:'终端类型(弃用)',partials:'装饰  参考 List<ProductChannelPartial>' }"


#### 新闻列表页 : news_list

    页面功能 : 新闻页 - 或者推广页
    页面主要处理函数: getNewsData --> 获取新闻列表内容
                     getCusPage --> 获取此页面后台配置信息
                     getPartials --> 强转json
    使用接口： Client.Get.NewsBbsList - more_news_bbs_list
    参数说明： page( 列表页专用 -- 表示将要获取的页面  1代表第一页 2代表第二页 )
              newsTypeId ( 新闻类型ID,后台可以查看 )
    返回的json说明:
        数组单项包含字段：-->
        belongShopId:0
        belongShopName:""
        commentCount:0
        content:""
        contentWithImgTag:""
        contentWithNoImg:""
        description:""
        enlighten:0
        favoriteCount:0
        fromSource:""
        gainJifen:0
        happenTimeShortName:""
        id:28261
        imagePath:"http://image1.sansancloud.com/xianhua/2017_12/18/11/54/41_358.jpg"
        lastCommentTimeShortName:""
        likeCount:0
        newsImageJson:""
        orderNumber:"20180115105331"
        platformNo:"xianhua"
        publicPlatformUserId:0
        publishTime:"2018-01-15 10:53:31"
        publishUserIcon:""
        publishUserId:0
        publishUserName:""
        publishUserSex:1
        readTime:1
        setTop:0
        title:"111"
        typeId:93
        typeName:"sss"

#### 新闻详情页 : news_detail

    页面功能 : 新闻详情页
    页面主要处理函数: getNewsData --> 获取新闻列表内容
                     getCusPage --> 获取此页面后台配置信息
                     getPartials --> 强转json
    使用接口： Client.Bbs.NewsDetail - get_news_bbs_detail
    参数说明： newsId( 新闻ID )
    返回的json说明: contentWithImgTag  --> 富文本，直接解析这个就行了


#### 版权说明 : custom_page

    页面功能 : custom_page页
    页面主要处理函数: getCustomPage --> 获取此页面后台配置信息
    使用接口： custom_page_:id
    参数说明： jsonOnly=1（表示返回的数据格式为json）
    返回的json说明: "{beanRemark:'自定义页面表',channelName:'页面名称(只允许英文数字结合)',channelTitle:'页面标题channelDescription:'页面描述',channelKeywords:'页面关键词',channelTemplate:'页面使用模板',pageType:'页面类型(弃用)',index:'是否主页 (弃用  0 否 1 是)',belongShopId:'归属店铺ID(0 平台页面  )',platformNo:'平台号',belongShopName:'归属店铺名',functionType:'页面是单独页面还是页面的某个模块  0页面 1模块',terminalType:'终端类型(弃用)',partials:'装饰  参考 List<ProductChannelPartial>' }"

#### 版权说明 : custom_page_copyright

    页面功能 : 版权说明页
    页面主要处理函数: getCustomPage --> 获取此页面后台配置信息
    使用接口： custom_page_:id
    参数说明： jsonOnly=1（表示返回的数据格式为json）
    返回的json说明: "{beanRemark:'自定义页面表',channelName:'页面名称(只允许英文数字结合)',channelTitle:'页面标题channelDescription:'页面描述',channelKeywords:'页面关键词',channelTemplate:'页面使用模板',pageType:'页面类型(弃用)',index:'是否主页 (弃用  0 否 1 是)',belongShopId:'归属店铺ID(0 平台页面  )',platformNo:'平台号',belongShopName:'归属店铺名',functionType:'页面是单独页面还是页面的某个模块  0页面 1模块',terminalType:'终端类型(弃用)',partials:'装饰  参考 List<ProductChannelPartial>' }"


#### 我的 : custom_page_userinfo

    页面功能 : 我的
    页面主要处理函数: getData --> 获取此页面后台配置信息
    使用接口： custom_page_:id
    参数说明： jsonOnly=1（表示返回的数据格式为json）
    返回的json说明: "{beanRemark:'自定义页面表',channelName:'页面名称(只允许英文数字结合)',channelTitle:'页面标题channelDescription:'页面描述',channelKeywords:'页面关键词',channelTemplate:'页面使用模板',pageType:'页面类型(弃用)',index:'是否主页 (弃用  0 否 1 是)',belongShopId:'归属店铺ID(0 平台页面  )',platformNo:'平台号',belongShopName:'归属店铺名',functionType:'页面是单独页面还是页面的某个模块  0页面 1模块',terminalType:'终端类型(弃用)',partials:'装饰  参考 List<ProductChannelPartial>' }"


#### 列表页 : search_product

    页面功能 : 商品列表页面 （含商品查询）
    页面主要处理函数: getData --> 获取商品列表信息

    使用接口：Client.Get.ProductListMore ( more_product_list )
    参数说明：
              categoryId:  类型id
              belongShop: 所属店铺
              typeBelongShop: 所属店铺类别
              page: 第几页
              showType: 显示方式
              showColumn: 显示几列
              productName: 商品名称
              startPrice: 最低价格
              endPrice: 最高价格
              orderType: 排序方式

    返回的json说明: 商品的json数据数组 -->
      "{beanRemark:'产品Bean',imagePath:'产品缩略图',name:'产品名',tagPrice:'产品标价',price:'产品售价',price2:'价格2(弃用)',price3:'价格3(弃用)',saleCount:'销售数量',category:'产品分类',saleTime:'开售日期',hotSale:'热销(弃用)',saleStrategy:'销售策略号',disable:'是否上架 0上架    1 下架',linkUrl:'弃用',productCode:'产品编码',description:'描述',orderNumber:'编码',readCount:'访问次数',stock:'库存',belongAreaId:'弃用',belongShangquanId:'弃用',belongShopId:'上传店铺ID',belongAreaName:'弃用',belongShangquanName:'弃用',belongShopName:'上传店铺名',tags:'商品标签',promotion:'参与主活动',shopProductType:'店铺分类（与主分类不同 店铺自己对产品的分类）',phoneImg:'弃用',addTime:'添加时间',minSaleCount:'最少购买数',bigSmallUnitScale:'大小单位比例（弃用）',tip:'tip说明 弃用',unitShow:'单位名称（弃用）',remarkNumber:'备注号(后端使用 前端忽略)',categoryParent:'产品归类父类id',categoryGradparent:'产品归类祖先分类ID',newSale:'新品 (弃用)',brandId:'归属品牌id',brandName:'品牌名',brandNameEn:'品牌英文名',brandNameShort:'品牌缩写',commentCount:'评论次数',yunfei:'运费(弃用 现在使用平台设定的运费模板)',yunfeiTemplate:'运费模板id(弃用 使用平台默认设置的运费模板)',productType:'产品类型 0普通产品  1到店服务类产品 2展示类产品 3预收类产品 5租赁类产品',presalePrice:'预售价格(预售类产品可用)',distributeProfit:'产品分配利润（在二级分润系统使用）',daidingPlatformUserId:'待定平台用户id（忽略）',daidingTime:'待定时间',daidingUserLoginName:'待定用户登录名',daidingUserNickName:'待定用户昵称',remark:'备注（前端忽略 后端使用）',pingfen:'产品评分',pingfenCount:'产品参与评分数量',leaseUnitTypeStr:'租赁单位类型字符表示',leaseUnitType:'租赁单位类型 0小时 1天 2周 3月 4年 （周单位弃用）',productYear:'产品年份',attributesCombind:'属性归集 ',leaseUnitAmount:'租赁单位金额 ',leaseUnitExpireAmount:'租赁逾期单位金额 ',leaseNeedBackUnitCount:'租赁应还单位时长  如值为 10表示10个单位内应归还 单位参考  leaseUnitType ',measureItem:'是否多规格商品 0否 1是 表示有规格 如 红色 L码',saleStrategyDetails:'销售策略详情',measureTypes:'分配规格类型',promotionBean:'参与活动Bean',attrs:'属性列表',platformNo:'平台号' }"

#### 三级列表 : search_product2

    页面功能 : 三级导航 ，查询
    页面主要处理函数: getData --> 获取商品列表信息
                    toAdverLink --> 广告图跳转
    使用接口：无
    参数说明：
    返回的json说明:

#### 列表页2 : product_tree_list

    页面功能 : 商品列表页面，类别查询，加入购物车
    页面主要处理函数: getData --> 获取商品列表信息
                    postParams --> 加减购物车内容
    使用接口：Client.Get.ProductListMore ( more_product_list )
             Client.User.ChangeCarItemCount（change_shopping_car_item）
    参数说明： 1.Client.Get.ProductListMore
                  categoryId:  类型id
                  belongShop: 所属店铺
                  typeBelongShop: 所属店铺类别
                  page: 第几页
                  showType: 显示方式
                  showColumn: 显示几列
                  productName: 商品名称
                  startPrice: 最低价格
                  endPrice: 最高价格
                  orderType: 排序方式
              2.Client.User.ChangeCarItemCount
                  productId:  商品ID
                  shopId: 所属店铺
                  count: 数量
                  cartesionId: 规格集ID
                  type: 类型(add dec change)
    返回的json说明: 1.Client.Get.ProductListMore
                      商品的json数据
                   2.Client.User.ChangeCarItemCount
                      加减商品成功后的json

#### 列表页3 : product_waimai

    页面功能 : 商品列表页面，类别查询，加入购物车，购物车加减，创建订单
    页面主要处理函数: getData --> 获取商品列表信息
                    postParams --> 加减购物车内容
                    createOrder --> 创建订单
    使用接口：Client.Get.ProductListMore ( more_product_list )
             Client.User.ChangeCarItemCount（change_shopping_car_item）
             Client.User.ListPromotionsByCarItems（list_promotions_by_car_items）
             Client.User.CarItemsCreateOrder（shopping_car_list_item_create_order）
    参数说明： 1.Client.Get.ProductListMore
                  categoryId:  类型id
                  belongShop: 所属店铺
                  typeBelongShop: 所属店铺类别
                  page: 第几页
                  showType: 显示方式
                  showColumn: 显示几列
                  productName: 商品名称
                  startPrice: 最低价格
                  endPrice: 最高价格
                  orderType: 排序方式
              2.Client.User.ChangeCarItemCount
                  productId:  商品ID
                  shopId: 所属店铺
                  count: 数量
                  cartesionId: 规格集ID
                  type: 类型(add dec change)
              3.Client.User.ListPromotionsByCarItems
                  shopId:  所属店铺
                  selectedIds: 选中的商品
              4.Client.User.CarItemsCreateOrder
                  shopId:  所属店铺
                  selectedIds: 选中的商品

    返回的json说明: 1.Client.Get.ProductListMore
                      商品的json数据
                   2.Client.User.ChangeCarItemCount
                      加减商品成功后的json
                   3.Client.User.ListPromotionsByCarItems
                      这里应该有promotionId数组
                   4.Client.User.CarItemsCreateOrder
                      预下单后返回的订单号

#### 列表页4 : product_waimai_offline

    页面功能 : 商品列表页面，类别查询，加入购物车，购物车加减，创建订单（加减购物车和商品后存放本地，不经过服务器，更加流畅）
    页面主要处理函数: getData --> 获取商品列表信息
                    postParams --> 加减购物车内容
                    createOrder --> 创建订单
    使用接口：Client.Get.ProductListMore ( more_product_list )
              Client.User.ListPromotionsByCarItems（list_promotions_by_car_items）
              Client.User.CarItemsCreateOrder（shopping_car_list_item_create_order）
    参数说明： 1.Client.Get.ProductListMore
                  categoryId:  类型id
                  belongShop: 所属店铺
                  typeBelongShop: 所属店铺类别
                  page: 第几页
                  showType: 显示方式
                  showColumn: 显示几列
                  productName: 商品名称
                  startPrice: 最低价格
                  endPrice: 最高价格
                  orderType: 排序方式
              2.Client.User.ListPromotionsByCarItems
                  shopId:  所属店铺
                  selectedIds: 选中的商品
              3.Client.User.CarItemsCreateOrder
                  shopId:  所属店铺
                  selectedIds: 选中的商品

    返回的json说明: 1.Client.Get.ProductListMore
                      商品的json数据
                   2.Client.User.ListPromotionsByCarItems
                      这里应该有promotionId数组
                   3.Client.User.CarItemsCreateOrder
                      预下单后返回的订单号

#### 二级列表 : product_type2

    页面功能 : 二级列表
    页面主要处理函数: getData --> 获取商品列表信息
                    toAdverLink --> 广告图跳转
    使用接口：无
    参数说明：
    返回的json说明:

#### 商品详情 : productDetail

    页面功能 : 商品详情展示，加入购物车，联系客服，立即购买，收藏，查看商品评论
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

    使用接口： Client.User.RemoveFavorite ( remove_favorite )
              Client.User.AddToFavorite （ add_to_favorite ）
              Client.Order.CommentList （ get_product_comment_list ）
              Client.User.BuyNow （ buy_now ）
              Client.User.ChangeCarItemCount （ change_shopping_car_item ）
              Client.Product.GetMeasureCartesion （ get_measure_cartesion ）

    参数说明：1. Client.User.RemoveFavorite
                  favoriteType:  收藏类型
                  itemId: 取消收藏对象Id
              2.Client.User.AddToFavorite
                  favoriteType:  收藏类型
                  itemId: 收藏对象Id
              3.Client.Order.CommentList
                  productId:  产品ID
                  shopId:  店铺ID
              4.Client.User.BuyNow
                  productId:  产品ID
                  shopId:  店铺ID
                  productId:  产品ID
                  orderType:  订单类型 0 普通订单 1 服务类订单 3 预售  4充值  5租赁 6租赁消费支付
                  itemCount:  产品数量
              5.Client.User.ChangeCarItemCount
                  productId:  产品ID
                  shopId:  店铺ID
                  type:  类型(add dec change)
                  cartesionId: 规格集ID
                  count:  数量

              6.Client.Product.GetMeasureCartesion
                  productId:  产品ID
                  measureIds:  规格集ID

    返回的json说明:1. Client.User.RemoveFavorite
                     删除收藏
                  2.Client.User.AddToFavorite
                      加入收藏
                  3.Client.Order.CommentList
                      商品评论
                  4.Client.User.BuyNow
                      立即购买
                  5.Client.User.ChangeCarItemCount
                      加减商品数量
                  6.Client.Product.GetMeasureCartesion
                      规格集

#### 订单列表 : order_list

    页面功能 : 订单的一系列操作-查看订单详细，编辑订单，取消订单，删除订单，去支付，订单到货，评价
    页面主要处理函数: getOrderList --> 获取订单列表信息
                    lookMore --> 查看订单详细
                    editOrder --> 编辑订单
                    cancelOrder --> 取消订单
                    delectOrder --> 删除订单
                    pingjiaOrder --> 订单评价
                    arriverOrder --> 订单到货

    使用接口：Client.Order.OrderList ( get_order_list )
             Client.Order.OrderReceived （order_received）
             Client.Order.OrderUnshow （order_unshow）
             Client.Order.CancelOrder （cancel_order）

    参数说明： 1.Client.Order.OrderList
                  easyStatus:  订单状态
                  orderNo: 订单号
                  page: 第几页
              2.Client.Order.OrderReceived
                  orderNo:  订单号
              3.Client.Order.OrderUnshow
                  orderNo:  订单号
              4.Client.Order.CancelOrder
                  orderNo:  订单号
    返回的json说明: 1.Client.Order.OrderList
                      订单的json数据数组
                    2.Client.Order.OrderReceived
                        成功提示
                    3.Client.Order.OrderUnshow
                        成功提示
                    4.Client.Order.CancelOrder
                        成功提示


#### 订单详细 : order_detail

    页面功能 : 查看订单详细
    页面主要处理函数: getOrderDetail --> 获取订单详细信息
    使用接口：Client.Order.GetOrderDetail ( get_order_detail )
    参数说明： 1.Client.Order.GetOrderDetail
                  gotCouponListId:  领取优惠券id
                  orderNo: 订单号
    返回的json说明: 1.Client.Order.GetOrderDetail
                  当前订单的数据json


#### 编辑订单 : edit_order

    页面功能 : 编辑订单-添加地址，使用优惠券，使用积分抵扣，确认订单
    页面主要处理函数: showOtherArr --> 获取地址列表
                    toaddress_new --> 添加新地址
                    chooseNewAddr --> 选择地址
                    payWayChange --> 支付方式
                    getavailableCouponsArr --> 选择优惠券
                    getEditOrderDetail --> 获取订单详情
                    submitOrder --> 确认订单

    使用接口：Client.User.AddressList ( get_login_user_address_list )
             Client.Order.GetEditOrderDetail （ get_edit_order_detail ）
             Client.Order.SubmitOrder （ submit_order ）

    参数说明： 1.Client.User.AddressList
              2. Client.Order.GetEditOrderDetail
                  orderNo:  订单号
                  gotCouponListId : 用户领取优惠券id
                  expressNo : 快递策略号 -1 系统自动选择    0 不要策略到店自取
              3.Client.Order.SubmitOrder
                  orderNo:  订单号
                  addressId:  地址ID
                  buyerScript:  留言
                  payType:  支付类型
                  jifenDikou:  积分抵扣
    返回的json说明:  1.Client.User.AddressList
                        已添加的地址数组
                    2. Client.Order.GetEditOrderDetail
                        下单的详细信息
                    3.Client.Order.SubmitOrder
                       下单成功的返回数据 - 待付款



#### 提交订单完成与付款页面 : submit_order_result

    页面功能 : 付款
    页面主要处理函数: payByYue --> 余额支付
                    payByWechat --> 微信支付 --  统一下单

    使用接口：Client.Weixin.UnifinedOrder ( unifined_order )
             Client.Order.AccountPay （ order_account_pay ）

    参数说明： 1.Client.Weixin.UnifinedOrder
                  orderNo:  订单号
                  openid : 微信用户openid
                  app : 是否app 0 否  1 是
              2. Client.Order.AccountPay
                  orderNo:  订单号

    返回的json说明:  1.Client.Weixin.UnifinedOrder
                        返回统一下单的几大字符串
                        ---
                          'timeStamp': wechatPayStr.timeStamp,
                          'nonceStr': wechatPayStr.nonceStr,
                          'package': wechatPayStr.package,
                          'signType': wechatPayStr.signType,
                          'paySign': wechatPayStr.paySign,

                    2. Client.Order.AccountPay
                        余额支付，返回余额支付成功失败信息

#### 退货列表 : back_item_list

    页面功能 : 退货列表
    页面主要处理函数: getOrderList --> 获取订单列表
                    tuikuan --> 去退款页面
    使用接口： Client.User.BackItemList ( get_back_item_list )
    参数说明： 1. Client.User.BackItemList
                  platformNo:  平台号
                  secretCode : 口令
                  page : 页数

    返回的json说明:  1. Client.User.BackItemList
                        可退款的订单列表

#### 退货详情 : back_item_detail

    页面功能 : 退货页面
    页面主要处理函数: sureBackItem --> 确认退货
                    get_back_order_item_page --> 获取退款订单信息
    使用接口： Client.User.SendBackOrderItemReq ( send_back_order_item_req )
              Client.User.BackOrderItemPage ( get_back_order_item_page )
    参数说明： 1. Client.User.SendBackOrderItemReq
                  orderItemId:  订单项ID
                  backReason : 退款理由
              1. Client.User.BackOrderItemPage
                  orderItemId:  订单项ID
                  secretCode : 口令
                  platformNo : 平台号
    返回的json说明:  1. Client.User.SendBackOrderItemReq
                        发起退货-成功|失败 信息
                    2. Client.User.BackOrderItemPage
                        退货项信息

#### 评价订单 : order_shop_comment

    页面功能 : 评价页面
    页面主要处理函数: addCommitImage --> 添加商品评论图片
                    addCommitScrollToData --> 把分数加到orderItem属性里面
                    productScroll --> 商品评分
                    commitProduct --> 商品评价
                    readyCommit_shop --> 准备评价店铺
                    getItem --> 获取被评价的订单数据

    使用接口： Client.Order.GetOrderDetail ( get_order_detail )
              Client.Order.CommentOrder ( comment_order )
              Client.Order.CommentOrder ( comment_order )
    参数说明： 1. Client.Order.GetOrderDetail
                  orderNo:  订单号
                  gotCouponListId : 领取优惠券id
              2. Client.Order.CommentOrder
                  orderNo:  订单号
                  shopId : 店铺ID
                  productId : 产品ID
                  commentContent:  评论
                  commentImages : 评论图片
                  niming : 匿名
                  pingfen:  评分
              3. Client.Order.CommentOrder
                  orderNo:  订单号
                  shopId : 店铺ID
                  shangpinfuhedu : 商品符合度
                  dianjiafuwutaidu:  店家服务态度
                  wuliufahuosudu : 物流发货速度
    返回的json说明:  1. Client.Order.GetOrderDetail
                         获取被评价的订单信息
                    2. Client.Order.CommentOrder
                        商品评价，
                    3. Client.Order.CommentOrder
                        店铺评价


#### 品牌列表 : brand_list

    页面功能 : 推荐列表，关注推荐信息，取消关注
    页面主要处理函数: guanzhuDaShi --> 关注
                    removeGuanzhuDaShi --> 取消关注
                    getData --> 获取推荐列表数据

    使用接口： Client.Brand.GetBrandList ( get_brand_list )
              Client.User.AddToFavorite ( add_to_favorite )
              Client.User.RemoveFavorite ( remove_favorite )
    参数说明： 1. Client.Brand.GetBrandList
                  page:  页数
                  brandName : 品牌名
              2. Client.User.AddToFavorite
                  favoriteType:  收藏类型
                  itemId : 收藏对象Id
              3. Client.User.RemoveFavorite
                  favoriteType:  收藏类型
                  itemId : 收藏对象Id

    返回的json说明:  1. Client.Brand.GetBrandList
                         获取推荐品牌列表
                    2. Client.User.AddToFavorite
                        加入收藏
                    3. Client.User.RemoveFavorite
                        取消收藏


#### 推荐品牌详细 : brand_detail

    页面功能 : 推荐品牌详细，关注推荐品牌，取消关注
    页面主要处理函数: guanzhuDaShi --> 关注
                    removeGuanzhuDaShi --> 取消关注
                    getData --> 获取推荐详情数据

    使用接口： Client.Brand.GetBrandDetail ( get_brand_detail )
              Client.User.AddToFavorite ( add_to_favorite )
              Client.User.RemoveFavorite ( remove_favorite )
    参数说明： 1. Client.Brand.GetBrandDetail
                  brandId : 品牌id
              2. Client.User.AddToFavorite
                  favoriteType:  收藏类型
                  itemId : 收藏对象Id
              3. Client.User.RemoveFavorite
                  favoriteType:  收藏类型
                  itemId : 收藏对象Id

    返回的json说明:  1. Client.Brand.GetBrandList
                         获取推荐品牌详情
                    2. Client.User.AddToFavorite
                        加入收藏
                    3. Client.User.RemoveFavorite
                        取消收藏

#### 购物车 : shopping_car_list

    页面功能 : 加载购物车，添加商品数量，减，移除，清空，准备下单
    页面主要处理函数: getCart --> 获取购物车列表
                    postParams --> 加减购物车内容
    使用接口：Client.User.CarItemList  ( /get_shopping_car_list_item.html )
             Client.User.ChangeCarItemCount （ change_shopping_car_item ）
             Client.User.CarItemdDelete （ delete_shopping_car_list_item ）
             Client.User.ListPromotionsByCarItems （ list_promotions_by_car_items ）
             Client.User.CarItemsCreateOrder （ shopping_car_list_item_create_order ） 选种商品生成订单

    参数说明： 1.Client.User.CarItemList
              2.Client.User.ChangeCarItemCount
                  productId:  商品ID
                  shopId: 所属店铺
                  count: 数量
                  cartesionId: 规格集ID
                  type: 类型(add dec change)
              3.Client.User.CarItemdDelete
                  shopId: 所属店铺
                  selectedIds: 选中ID 以逗号分隔开
                  type: 类型(all selected shopall)

              4.Client.User.ListPromotionsByCarItems
                  selectedIds:  选中ID 以逗号分隔开
                  shopId: 所属店铺
              5.Client.User.CarItemsCreateOrder
                  selectedIds:  选中ID 以逗号分隔开
                  shopId: 所属店铺
                  promotionId:活动id

    返回的json说明:  1.Client.User.CarItemList
                        获取购物车信息
                    2.Client.User.ChangeCarItemCount
                        加减购物车数量
                    3.Client.User.CarItemdDelete
                        删除购物车商品或清空
                    4.Client.User.ListPromotionsByCarItems
                        准备下单，获取优惠商品信息
                    5.Client.User.CarItemsCreateOrder
                        去下单

#### 登录 : login

    页面功能 : 登录
    页面主要处理函数: loginIn --> 账号登录
                    wxLogin --> 微信登录
    使用接口：Client.User.Login  ( /login.html )
             Client.User.WxMiniCodeLogin （ wx_mini_code_login ）

    参数说明： 1.Client.User.Login
                  loginType:  登录类型0 普通  1 微信  2 短信验证码
                  telno: 绑定手机号码
                  verifyCode: 验证码
                  username: 用户名
                  password: 密码
              2.Client.User.WxMiniCodeLogin


    返回的json说明:  1.Client.User.Login
                        登录账号的个人信息
                    2.Client.User.WxMiniCodeLogin
                        登录账号的个人信息


#### 注册 : regist

    页面功能 : 注册
    页面主要处理函数: signUp --> 注册
    使用接口：Client.User.Regist2  ( /regist2.html )

    参数说明： 1.Client.User.Regist2
                  username: 用户名
                  password: 密码
                  password2: 密码2
                  nickname: 昵称


    返回的json说明:  1.Client.User.Login
                      登录账号的个人信息


#### 用户协议 : regist_xieyi

    页面功能 : 用户协议
    页面主要处理函数:
    使用接口：app.setting.platformSetting.agreement
    参数说明：
    返回的json说明:


#### 优惠券 : my_coupons

    页面功能 : 我领取的优惠券列表 - 未使用 已使用 已过期
    页面主要处理函数: getMyCouponsList --> 获取我领取的优惠券列表

    使用接口： Client.Coupon.MyCoupons ( get_my_coupons_list )
    参数说明： 1. Client.Coupon.MyCoupons
                  page:  页数
                  couponState : 优惠券状态

    返回的json说明:  1. Client.Coupon.MyCoupons
                         列表数组

#### 获取优惠券 : available_coupons

    页面功能 : 领取优惠券
    页面主要处理函数: GotCoupon --> 领取优惠券
                    getNewCouponsList --> 获取领取优惠券列表

    使用接口： Client.Coupon.GainCoupon ( gain_coupon )
              Client.Coupon.AvailableCoupons ( get_available_coupons )
    参数说明： 1. Client.Coupon.GainCoupo
                  couponId : 优惠券ID
                  couponSecretCode : 优惠券码
                  couponSecretPassword : 优惠券密码
              2. Client.Coupon.AvailableCoupons
                  page:  页数


    返回的json说明:  1. Client.Coupon.GainCoupo
                        领取成功信息
                    2. Client.Coupon.AvailableCoupons
                        获取领取优惠券列表

#### 收藏与喜欢 : my_favorite

    页面功能 : 我的收藏
    页面主要处理函数: getUserVisitList --> 获取我收藏与喜欢列表
    使用接口： Client.Get.Favorite ( get_favorite )
    参数说明： 1. Client.Coupon.MyCoupons
                  page:  页数
                  favoriteType : 收藏类型

    返回的json说明:  1. Client.Coupon.MyCoupons
                         列表数组

#### 积分 	user_jifen_events

    页面功能 : 积分事件列表展示
    页面主要处理函数: getJifenList --> 获取我的积分事件列表
    使用接口： Client.User.ListJifenEvent ( get_user_jifen_events )
    参数说明： 1. Client.User.ListJifenEvent
                  page:  页数
    返回的json说明:  1. Client.User.ListJifenEvent
                         列表数组

#### 个人资料与修改 : pre_change_user_info

    页面功能 : 个人资料与修改
    页面主要处理函数: changeUserInfo --> 修改
    使用接口： Client.User.ChangeUserInfo ( change_user_info )
    参数说明： 1. Client.User.ChangeUserInfo
                  headimg:  头像
                  nickname:  昵称
                  telno:  电话
                  userTip:  个性签名
                  sex:  性别
    返回的json说明:  1. Client.User.ChangeUserInfo
                         个人信息数据


#### 我的消息 : message_counter2

    页面功能 : 我的消息
    页面主要处理函数:
    使用接口：
    参数说明：
    返回的json说明:


#### 地址 : address

    页面功能 : 添加地址，编辑地址，删除地址，地址列表，设为默认地址
    页面主要处理函数: getAddr --> 地址列表
                     addNewAddr --> 新增
                     deleteAddr --> 删除
                     writeAddr --> 编辑修改
                    setDefaultAddr --> 设为默认地址
    使用接口： Client.User.AddressList ( get_login_user_address_list )
              Client.User.AddressDelete ( delete_address )
              Client.User.AddressSetDefault ( set_default_address )
    参数说明：  1. Client.User.AddressList
               2. Client.User.AddressDelete
                  addressId:  地址id
               3. Client.User.AddressSetDefault
                  addressId:  地址id
    返回的json说明:  1. Client.User.AddressList
                         地址列表
                    2. Client.User.AddressDelete
                          删除地址
                    3. Client.User.AddressSetDefault
                         成功信息

#### 添加新地址 : add_address

    页面功能 : 添加新地址，编辑修改地址
    页面主要处理函数: subMitArrFrom --> 确认修改
    使用接口： Client.User.AddressAdd ( add_address )
              Client.User.AddressModify ( edit_address )

    参数说明：  1. Client.User.AddressAdd
                    contanctName:  姓名
                    telno:  电话号码
                    province:  省份
                    city:  市
                    district:  区（县）
                    detail:  详细地址
                    longitude:  经度
                    latitude:  维度
                    defaultAddress:  默认地址
               2. Client.User.AddressModify
                    contanctName:  姓名
                    telno:  电话号码
                    province:  省份
                    city:  市
                    district:  区（县）
                    detail:  详细地址
                    longitude:  经度
                    latitude:  维度
                    defaultAddress:  默认地址
                    addressId:  地址id
    返回的json说明:  1. Client.User.AddressAdd
                         地址信息
                    2. Client.User.AddressModify
                          地址信息

#### 我的足迹 : user_visit_items

    页面功能 : 积分事件列表展示
    页面主要处理函数: getUserVisitList --> 获取我的足迹列表
    使用接口： Client.User.GetVisitItems ( get_user_visit_items )
    参数说明： 1. Client.User.GetVisitItems
                  page:  页数
                  visitType:  访问类型 1 产品 2 店铺 3 新闻 4 用户
    返回的json说明:  1. Client.User.GetVisitItems
                         列表数组


#### 余额充值列表 : user_account_events

    页面功能 : 余额事件列表展示
    页面主要处理函数: getData --> 获取我的余额事件列表
    使用接口： Client.User.ListAccountEvent ( get_user_account_events )
    参数说明： 1. Client.User.ListAccountEvent
                    page:  页数
    返回的json说明:  1. Client.User.ListAccountEvent
                         列表数组


#### 余额充值页面 : user_recharge

    页面功能 : 余额充值
    页面主要处理函数: subMitButn --> 确认充值
    使用接口： Client.User.CreateRechargeOrder ( create_recharge_order )
    参数说明： 1. Client.User.CreateRechargeOrder
                    payType:  支付方式
                    rechargeAmount:  充值金额
    返回的json说明:  1. Client.User.CreateRechargeOrder
                         成功提示

#### 商品管理 : shop_manager_products

    页面功能 : 商品管理
    页面主要处理函数:
    使用接口：
    参数说明：
    返回的json说明:

#### 分销中心 : fx_center

    页面功能 : 分销中心页面
    页面主要处理函数: get_fx_center --> 获取分销中心个人数据
    使用接口：  ( /fx_center.html )
    参数说明： 1. /fx_center.html
                    canFx:  有没有分销资格
                    jsonOnly： 返回json
    返回的json说明:  1. /fx_center.html
                        返回个人分销数据佣金记录等


#### 分销二维码 : fx_qrcode

    页面功能 : 分销二维码获取
    页面主要处理函数: get_qrcode --> 获取二维码图片和链接地址等
    使用接口：  ( /get_qrcode.html )
    参数说明： 1. /get_qrcode.html
                    jsonOnly： 返回json
    返回的json说明:  1. /get_qrcode.html
                         返回个人二维码图片和链接地址等

#### 推广3级用户 : fx_users

    页面功能 : 推广用户
    页面主要处理函数: get_fx_users --> 获取推广3级用户
    使用接口：  ( /get_fx_tg_users.html )
    参数说明： 1. /get_fx_tg_users.html
                    fxLevel: 用户等级
    返回的json说明:  1. /get_fx_tg_users.html
                         你的下fxLevel级的数据，最多3级

#### 佣金记录 : fx_yongjin_list

    页面功能 : 佣金记录
    页面主要处理函数: getData --> 获取佣金记录数据
    使用接口：  ( /get_fx_yongjin_list.html )
    参数说明： 1. /get_fx_yongjin_list.html
                    page: 页
    返回的json说明:  1. /get_fx_yongjin_list.html
                         佣金事件记录。提现和收入

#### 提现记录 : tixian_list

    页面功能 : 佣金记录
    页面主要处理函数: getData --> 获取提现记录数据
    使用接口：  ( /get_tixian_list.html )
    参数说明： 1. /get_tixian_list.html
                    page: 页
    返回的json说明:  1. /get_tixian_list.html
                         提现事件记录。提现

#### 申请提现 : req_tixian_section

    页面功能 : 佣金记录
    页面主要处理函数: subMitButn --> 确认提现
    使用接口：  ( /req_tixian.html )
    参数说明： 1. /req_tixian.html
                    tixianAmount: 提现金额
    返回的json说明:  1. /req_tixian.html
                         成功返回数据
