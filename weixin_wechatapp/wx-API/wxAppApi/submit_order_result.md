### 提交订单完成与付款页面 :   pages/submit_order_result/index

页面功能 : 付款

### 使用接口

      统一下单  Client.Weixin.UnifinedOrder ( unifined_order )
      余额支付  Client.Order.AccountPay （ order_account_pay ）

### 链接地址

    统一下单  https://mini.sansancloud.com/chainalliance/xianhua/unifined_order.html
    余额支付  https://mini.sansancloud.com/chainalliance/xianhua/order_account_pay.html

## 微信统一下单  Client.Weixin.UnifinedOrder ( unifined_order )
###   Client.Weixin.UnifinedOrder 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|openid|微信用户openid|是|-
|orderNo|订单号|是|-
|app|是否app 0 否|是|0

###  Client.Weixin.UnifinedOrder 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|appId|项目的appid|直接填入对应的接口就可以实现支付
|timeStamp|时间搓|-
|nonceStr|随机字符串|-
|package|下单获取的字符串|-
|signType|加密方法|-
|paySign|支付场景|-



### Client.Weixin.UnifinedOrder 请求结果:

    {
        "appId":"wx37b3f495891dd60c",
        "timeStamp":"1516088328",
        "nonceStr":"1538481298",
        "package":"prepay_id=wx20180116153848cd83262ecd0076706913",
        "signType" : "MD5",
        "paySign":"89B56681B685EC70BD6E11C1CDE9B5C0"
    }

## 余额支付  Client.Order.AccountPay （ order_account_pay ）
###   Client.Order.AccountPay 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|orderNo|订单号|是|-

###  Client.Weixin.UnifinedOrder 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|orderNo|订单id|-
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
|fxProfit|分销利润|-



### Client.Order.AccountPay 请求结果:

这是成功余额付款的返回数据

    {
      "errcode": "0",
      "errMsg": "success",
      "relateObj": {
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
            }，
         "id": 84385,
        "orderNo": "20180116155028237001",
        "orderStatus": 1,
        "shippingStatus": 0,
        "payStatus": 1,
        "payType": 2,
        "payTypeStr": "余额支付",
        "buyerName": "111",
        "buyerAddress": "11111",
        "buyerTelno": "17888888888",
        "buyerBestTime": "",
        "buyerScript": "",
        "invType": 0,
        "invNeed": 0,
        "buyerId": 60176,
        "goodsAmount": 158,
        "goodsOnlyAmount": 158,
        "payAmount": 158,
        "addTime": "2018-01-16 15:50:32",
        "payTime": "2018-01-16 15:51:19",
        "belongShop": 257,
        "belongShopName": "福州鲜花批发",
        "useCouponId": 0,
        "useCouponTypeId": 0,
        "useCouponTypeName": "",
        "youhuiAmount": 0,
        "buyerProvince": "北京市",
        "buyerCity": "北京市",
        "buyerArea": "东城区",
        "yunfeiAmount": 0,
        "isComment": 0,
        "platformNo": "xianhua",
        "buyerLongitude": 119.30405,
        "buyerLatitude": 26.08198,
        "addressId": 41683,
        "easyStatus": 0,
        "easyStatusStr": "",
        "backAmount": 0,
        "thirdOrderNo": "20180116155028237001",
        "orderType": 0,
        "prepayAmount": 0,
        "fxProfit": 0,
        "chatOrder": 0,
        "jifenDikou": 0,
        "unshowStatus": 0,
        "comment": 0,
        "commentId": 0,
        "tradeType": "",
        "pressCount": 0,
        "reversePressCount": 0,
        "gainJifen": 0,
        "buyerLoginName": "112728",
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

        ],
        "orderProcessList": [

        ],
        "availableCoupons": [

        ]
      }
    }

