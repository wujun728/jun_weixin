### 退货详情 :   pages/back_item_detail/index

### 使用接口

    退货页   Client.User.BackOrderItemPage ( get_back_order_item_page )
    发送退款请求  Client.User.SendBackOrderItemReq ( send_back_order_item_req )

### 链接地址

     退货页 https://mini.sansancloud.com/chainalliance/xianhua/get_back_order_item_page.html
     发送退款请求   https://mini.sansancloud.com/chainalliance/xianhua/send_back_order_item_req.html


## 退货页   Client.User.BackOrderItemPage ( get_back_order_item_page )
###  Client.User.BackOrderItemPage 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|orderItemId|订单项ID|是|-
|secretCode|口令|否|-
|platformNo|平台号|否|-

### Client.User.BackOrderItemPage 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
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
|prepayAmount|预付金额(预售订单使用)|-
|jifenDikou|订单积分抵扣|-
|itemId|产品ID|-
|shopId|归属店铺ID|-
|itemCount|产品数量|-

### Client.User.BackOrderItemPage  请求结果:

    {
      "jsonRemark": {
              beanRemark: '用户订单项表',
              belongOrderNo: '归属订单号',
              itemId: '产品ID',
              itemName: '产品名',
              shopId: '归属店铺ID',
              shopName: '店铺名',
              itemPrice: '产品价格',
              itemTagPrice: '产品标价',
              itemCount: '产品数量',
              itemIcon: '产品图标',
              buyerPayPrice: '购买人应支付价格',
              buyerZhekou: '购买人享折扣',
              buyerID: '购买人ID',
              buyerType: '购买人类型(弃用)',
              buyerLevel: '购买人等级(参考 用户等级)(用户分等级时使用)',
              yunfei: '产品运费',
              measures: '规格描述(规格产品时使用-如衣服红色L码)',
              measureCartesianId: '规格集ID(规格产品时使用)',
              waitComment: '评价状态(0 无需评价 1 待评价 2 已评价)',
              commentId: '评论ID',
              platformNo: '归属平台号',
              backItem: '退货退款 ( 0  未退款  1退款处理中  2 同意退款  3 已退款    5 拒绝退款)',
              sendStorageName: '发货店仓名(多店仓时使用)',
              sendStorageId: '发货店仓ID(多店仓时使用)',
              itemCode: '产品编码(多规格产品为规格集编码)',
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
              uploadAfterPlatform: '是否同步 至后置平台店铺0 否  1是',
              productCode: '产品编码(非多规格产品 productCode等于itemCode)'
            },
      "id": 100576,
      "belongOrderNo": "20180116151009845001",
      "itemId": 8219,
      "itemName": "香槟玫瑰北京鲜花速递同城南京杭州鲜花义乌上海宁波花店金华宁波 ",
      "itemPrice": 148,
      "itemCount": 6,
      "itemIcon": "http://image1.sansancloud.com/xianhua/2017_12/18/12/03/49_475.jpg",
      "buyerPayPrice": 148,
      "buyerZhekou": 100,
      "buyerId": 60176,
      "buyerType": 0,
      "orderNo": "20180116151009845001",
      "orderStatus": 5,
      "shippingStatus": 0,
      "payStatus": 1,
      "payType": 2,
      "buyerName": "111",
      "buyerAddress": "11111",
      "buyerTelno": "17888888888",
      "buyerBestTime": "",
      "buyerScript": "",
      "invType": 0,
      "invNeed": 0,
      "goodsAmount": 2152,
      "payAmount": 2152,
      "addTime": "2018-01-16 15:10:11",
      "confirmTime": "2018-01-16 16:21:13",
      "payTime": "2018-01-16 15:48:23",
      "invoiceNo": "",
      "kuaidi": "shunfeng",
      "kuaidiName": "顺丰快递",
      "belongShop": 257,
      "belongShopName": "福州鲜花批发",
      "platformNo": "xianhua",
      "backItem": 0,
      "leaseRecordId": 0,
      "orderType": 0,
      "buyerProvince": "北京市",
      "buyerCity": "北京市",
      "buyerArea": "东城区",
      "sendStorageName": "",
      "sendStorageId": -1,
      "InnerOrder": 0,
      "managerRemark": "",
      "itemCode": "",
      "productCode": "",
      "promotionId": "0",
      "promotionName": "",
      "orderStatusStr": "已到货",
      "wuliuPackageNo": "",
      "wuliuImportNo": "",
      "uploadAfterPlatform": 0,
      "evaluateBackAmount": 888
    }


发送退款请求  Client.User.SendBackOrderItemReq ( send_back_order_item_req )
###  Client.User.SendBackOrderItemReq 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|orderItemId|订单项ID|是|-
|backReason|退款理由|否|-

### Client.User.SendBackOrderItemReq 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|orderNo|订单Bean|-
|orderItemId|归属订单项ID|-
|productId|产品ID|-
|productName|产品名|-
|productPrice|产品价格|-
|backAmount|退款金额|-
|backStatus|退款状态(1 申请退款（用户发起申请退款）  2 确认退款（店家确认退款）  3 已退款   4 店家修改金额（当允许店家修改退款金额时启用）  5 拒绝退款  6 取消退款)|-
|platformUserLoginName|申请人登录名|-
|platformUserIcon|申请人用户头像|-
|userRemark|用户备注|-
|adminRemark|管理员备注|-
|backImageJson|用户提交产品截图|-


### Client.User.SendBackOrderItemReq  请求结果:

    {
      "errcode": "0",
      "errMsg": "success",
      "relateObj": {
        "jsonRemark": {
                beanRemark: '退货退款请求Bean',
                orderNo: '归属订单号',
                orderItemId: '归属订单项ID',
                productId: '产品ID',
                productName: '产品名',
                shopId: '归属店铺ID',
                shopName: '店铺名',
                productPrice: '产品价格',
                backAmount: '退款金额',
                backStatus: '退款状态(1 申请退款（用户发起申请退款）  2 确认退款（店家确认退款）  3 已退款   4 店家修改金额（当允许店家修改退款金额时启用）  5 拒绝退款  6 取消退款)',
                createTime: '创建时间',
                requestTime: '请求时间',
                confirmTime: '确认时间',
                backTime: '退款时间',
                changeTime: '店铺修改金额时间',
                backOrderNo: '归属订单号 与orderNo一样',
                backType: '退款方式 参考订单支付方式  (0货到付款 1支付宝 2余额支付 3微信支付 4网银支付  5线下支付  9积分支付)',
                platformUserId: '申请人平台用户ID',
                platformUserName: '申请人用户昵称',
                platformUserLoginName: '申请人登录名',
                platformUserIcon: '申请人用户头像',
                confirmUserId: '确认退款请求的用户id',
                confirmUserLoginName: '确认退款请求的用户登陆名',
                adminRemark: '管理员备注',
                userRemark: '用户备注',
                backImageJson: '用户提交产品截图',
                remark: '管理员备注',
                platformNo: '平台号',
                backRemark: '退货退款备注',
                orderPayTime: '订单支付时间',
                resendBack: '是否曾经被拒绝后再发的退款请求',
                backCount: '退货数量',
                pushToErp: '是否推送至erp(erp对接时使用)'
              }，
          "id": 230,
        "orderNo": "20180116151009845001",
        "orderItemId": 100576,
        "shopId": 257,
        "productId": 8219,
        "productName": "香槟玫瑰北京鲜花速递同城南京杭州鲜花义乌上海宁波花店金华宁波 ",
        "shopName": "福州鲜花批发",
        "productPrice": 148,
        "backAmount": 888,
        "backStatus": 1,
        "createTime": "2018-01-17 09:27:00",
        "requestTime": "2018-01-17 09:27:00",
        "backTime": "2018-01-17 09:27:00",
        "backOrderNo": "",
        "backType": 2,
        "platformUserId": 65595,
        "platformUserName": "蒋",
        "platformUserLoginName": "112728",
        "platformUserIcon": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJcvKJ4MoSX8Xqt6k84RwKoIwt9vZeGKuicia7oqRjGHqeNmYCn9U4d6lqyrOPm2LwRBA4Cu9FT7TOg/0",
        "userRemark": "",
        "backImageJson": "",
        "platformNo": "xianhua",
        "orderPayTime": "2018-01-16 15:48:23",
        "resendBack": 0,
        "backCount": 6,
        "pushToErp": 0
      }
    }