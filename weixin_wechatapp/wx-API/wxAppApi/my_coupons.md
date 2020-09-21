### 优惠券 :   pages/my_coupons/index

### 使用接口

    获取优惠券列表   Client.Coupon.MyCoupons ( get_my_coupons_list )

### 链接地址

     获取优惠券列表 https://mini.sansancloud.com/chainalliance/xianhua/get_my_coupons_list.html

##  获取优惠券列表   Client.Coupon.MyCoupons ( get_my_coupons_list )
###   Client.Coupon.MyCoupons 请求参数

|名称|说明|是否必要|备注
|:---:|:---:|:---:|:---:|
|couponState|优惠券状态|是|未使用 已使用 已过期
|page|第几页|否|-

###  Client.Coupon.MyCoupons 返回字段说明

|名称|说明|备注
|:---:|:---:|:---:|
|name|优惠券名|-
|imageUrl|优惠券图像|-
|startDate|优惠开始日期|-
|endDate|优惠截止日期|-
|usedOrderNo|使用订单号|-
|remark|备注|-
|isusing|是否启用(0未启用1已启用)|-

###  Client.Coupon.MyCoupons  请求结果:

    {
      "pageSize": 16,
      "curPage": 1,
      "totalSize": 7,
      "result": [
        {
          "jsonRemark": {
                          beanRemark: '优惠券领取记录',
                          gotDate: '领取时间',
                          couponId: '优惠券ID',
                          couponStartDate: '优惠开始日期',
                          couponEndDate: '优惠截止日期',
                          gotPlatformUserId: '获得的平台用户ID',
                          gotUserId: '领取用户ID',
                          couponName: '优惠券名称',
                          gotUserName: '领取用户名',
                          isUsed: '是否使用(0未使用1已使用)',
                          usedDate: '使用日期',
                          createDate: '创建日期',
                          usedOrderNo: '使用订单号',
                          remark: '备注',
                          isusing: '是否启用(0未启用1已启用)',
                          helperId: '(弃用)',
                          showNo: '(弃用)',
                          isEnable: '(弃用)',
                          couponHelperCount: '(弃用)',
                          couponNo: '优惠券码',
                          secretCode: '优惠券码',
                          secretPassword: '优惠券密码',
                          newGot: '新获得(0新获得1之前获得)',
                          otherGot: '已被他人领取(1他人领取0否)',
                          coupon: '归属优惠券(参考ProductCoupon)',
                          platformNo: '平台号'
                        }，
          "id": 11780,
          "gotDate": "2017-11-21 00:00:00",
          "couponId": 41,
          "gotUserId": 47446,
          "couponName": "满500减50",
          "gotUserName": "jzq",
          "isUsed": 0,
          "usedDate": "2017-12-04 00:00:00",
          "createDate": "2017-11-21 00:00:00",
          "usedOrderNo": "20171204100158492001",
          "remark": "",
          "couponStartDate": "2017-10-26 00:00:00",
          "couponEndDate": "2018-10-26 00:00:00",
          "helperId": "[58627]",
          "isEnable": 1,
          "couponHelperCount": 1,
          "couponNo": "20171121154227200001",
          "platformNo": "jianzhan",
          "gotPlatformUserId": 58627,
          "coupon": {
            "jsonRemark":{
                           beanRemark: '优惠券Bean',
                           name: '优惠券名',
                           imageUrl: '优惠券图像',
                           startDate: '优惠开始日期',
                           endDate: '优惠截止日期',
                           startDateStr: '优惠开始日期',
                           endDateStr: '优惠截止日期',
                           count: '计划发放数量',
                           gotCount: '已领取数量',
                           usedCount: '使用数量',
                           couponType: '优惠券类型(1满减2满折扣金额orderAmount为0表示无条件满减折扣)',
                           typeName: '(忽略)',
                           remark: '备注',
                           orderAmount: '满足条件的订单金额',
                           youhuiAmount: '满足条件的订单优惠金额(满减券)',
                           isusing: '是否启用(0未启用1已启用)',
                           helperCount: '(弃用)',
                           couponNo: '(弃用)',
                           zhekou: '折扣百分比(满折扣券使用)',
                           publishType: '(弃用)',
                           belongShopName: '归属店铺名',
                           belongShopId: '归属店铺ID',
                           youhuiTargetProductId: '优惠产品ID(弃用)',
                           countPerUser: '每人可领数',
                           linkUrl: '优惠券关联页面',
                           useTagPrice: '使用优惠券时商品必须用吊牌价销售(1必须吊牌价0不必须)',
                           registSend: '注册送(1送0不送)',
                           platformNo: '平台号',
                           needSecret: '是否需要密码领取(0不需要1要密码2要code与密码)',
                           belongPromotionId: '归属活动ID'
                         }，
            "id": 41,
            "name": "满500减50",
            "imageUrl": "",
            "endDate": "2018-10-26 00:00:00",
            "count": 0,
            "gotCount": 5,
            "usedCount": 1,
            "couponType": 1,
            "typeName": "满减",
            "remark": "",
            "startDate": "2017-10-26 00:00:00",
            "orderAmount": 100,
            "youhuiAmount": 50,
            "isusing": 1,
            "startDateStr": "",
            "endDateStr": "",
            "helperCount": 1,
            "couponNo": "",
            "zhekou": 100,
            "publishType": 1,
            "platformNo": "jianzhan",
            "belongShopName": "",
            "belongShopId": 0,
            "youhuiTargetProductId": 0,
            "countPerUser": 1,
            "linkUrl": "custom_page_index.html",
            "gotPlatformUserId": 0,
            "registSend": 0,
            "useTagPrice": 0,
            "belongPromotionId": "0",
            "needSecret": 0
          },
          "newGot": 0,
          "otherGot": 0
        },

      ]
    }