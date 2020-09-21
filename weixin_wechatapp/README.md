# 微信小程序
## 微信小程序电商源码：外卖小程序，电商小程序，门店类小程序，展示类小程序，批发商城小程序。

#### 项目介绍

	1.此项目是一套完整的电商系统，并且兼容各种电商场景可以很好的运用在各个领域。
	2.包含页面数43页，组件数14
	3.开源前端代码供大家学习，并且有许多漂亮的页面模板。
	
### QQ交流群 — 25013930
### 公司官网 - http://www.fz33.net  官网
### 管理后台效果图（部分图）

|登录入口：http://www.sansancloud.com/manager/#/login|试用账号：yanshi 密码：yanshi123
|:----|:----:|
|![file-list](http://image1.sansancloud.com/xianhua/2018_5/23/14/20/51_340.jpg)|![file-list](http://image1.sansancloud.com/xianhua/2018_5/23/14/20/52_398.jpg)
|![file-list](http://image1.sansancloud.com/xianhua/2018_5/23/14/21/0_82.jpg)|![file-list](http://image1.sansancloud.com/xianhua/2018_5/23/14/28/13_356.jpg)
### 效果图---扫码查看

|扫码预览|扫码预览|扫码预览
|:----|:----:|:----:|
|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/35_352.jpg)|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/32_400.jpg)|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/28_056.jpg)
|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/24_644.jpg)|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/20_988.jpg)|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/18_084.jpg)
|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/14_797.jpg)|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/08_877.jpg)|![file-list](http://image1.sansancloud.com/naicha/2017_12/30/15/06/11_411.jpg)

### 更改项目 - 关键字 clientNo

    1.naicha
    2.xianhua
    3.xingbake
    4.zhubaoxiao
    5.zhubaoxiao
    6.majiangshangcheng
    7.jiafang
    8.huazhuan
    9.riyong
    10.muying
    11.hongjiu
    12.fuzhuan
    13.shuiguo
    14.haixianpifa
    15.其他自定义...
    -Tip 打开 app.js 文件，找到 clientNo 可换成任意以下的字段，即可切换项目
    
#### 功能介绍

	1. 5种订单列表页面，并且可配置多种展示模型
	2. 购物车
	3. 订单
	4. 优惠券
	5. 富文本解析
	6. 微信支付
	7. 余额支付
	8. 修改资料
	9. 其他

#### 页面文档，见 wxApp.md
|文档页|文档说明|文档地址|
|:----|:----:|:----:|
|wxApp.md|页面所用的所有接口和数据格式和说明，并且新增返回json说明和示例|[地址](wx-API/wxApp.md)
|一般错误.md|新增常见错误类型和解决方法|[地址](wx-API/一般错误.md)

#### 页面说明

	首页 : custom_page_index
	新闻页 : news_list  news_detail
	版权说明 : custom_page_copyright
	我的 : custom_page_userinfo

	列表页 : search_product
	三级列表 : search_product2
	列表页2 : product_tree_list
	列表页3 : product_waimai 
	二级列表 : product_type2

	订单列表 : order_list.html?easyStatus=0
	订单详细 : order_detail
	编辑订单 : edit_order
	提交订单 : submit_order -->  submit_order_result
	退货列表 : back_item_list
	退货详情 : back_item_detail
	评价订单 : order_shop_comment    
	
	品牌 : brand_list
	品牌详细 : brand_detail
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

    - Tip 更换页面，在app.json里面设置路径即可
