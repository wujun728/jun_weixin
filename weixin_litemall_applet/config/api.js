// var _api_root = 'http://localhost:8085';
let _api_root = 'http://www.yjlive.cn:8085/api/';

// qq 1439226817

var api = {
  /**
   * 接口名称
   */
  index: {
    appletLogin_by_weixin:_api_root + 'applet/login_by_weixin', 		// 登录(手机号:phone 密码:password)
    login: _api_root +'single/home/login', 		// 登录(手机号:phone 密码:password)
    simpleReg: _api_root +'single/home/simpleReg', 		// 登录(手机号:phone 密码:password)
    home: _api_root +'single/home/content',
    updatePassword: _api_root +'single/home/updatePassword',
    loginByCode: _api_root +'single/home/loginByCode', // 手机和验证码登录
    reg: _api_root +'single/home/reg', // 注册
    sendCodes: _api_root +'single/home/sms/codes', // 获取验证码
  },
  member: {
    storeList: _api_root +'single/user/store/list', 		// 查询学校列表
    storeDetail: _api_root +'single/user/storeDetail', 		// 查询拼团商品详情信息
    schoolList: _api_root +'single/user/school/list', 		// 查询学校列表
    schoolDetail:_api_root + 'single/user/schoolDetail', 		// 查询拼团商品详情信息
    getAreaByPid: _api_root +'single/user/getAreaByPid', // 根据pid查询区域
    bindSchool: _api_root +'single/user/bindSchool', // 会员绑定学校
    bindArea: _api_root +'single/user/bindArea', // 会员绑定区域

  },
  goods: {
    groupGoodsDetail: _api_root +'single/pms/goodsGroup/detail', 		// 查询拼团商品详情信息
    groupGoodsList: _api_root +'single/pms/groupGoods/list', // 查询拼团商品列表
    groupHotGoodsList: _api_root +'single/pms/groupHotGoods/list', // 查询生效拼团商品列表
    giftDetail: _api_root +'single/pms/gift/detail', 		// 查询商品详情信息
    giftList: _api_root +'single/pms/gift/list', // 查询商品列表
    typeGiftList:  _api_root +'single/pms/typeGiftList',//查询商品类型下的商品列表
    addView: _api_root +'single/pms/addView', 		// 查询商品详情信息
    viewList: _api_root +'single/pms/viewList', // 查询商品列表

    goodsDetail:_api_root + 'single/pms/goods/detail', 		// 查询商品详情信息
    goodsList: _api_root +'single/pms/goods/list', // 查询商品列表
    categoryList: _api_root +'single/pms/productCategory/list', // 查询商品分类列表
    createGoods: _api_root +'single/pms/createGoods', //创建商品
    brandList: _api_root +'single/pms/brand/list', // 根据条件查询所有品牌表列表
    consultList: _api_root +'single/pms/consult/list', // 取某个商品的评价
    categoryAndGoodsList: _api_root +'single/pms/categoryAndGoodsList/list', // 查询商品分类列表(带商品)
    typeGoodsList: _api_root +'single/pms/typeGoodsList',//查询商品类型下的商品列表
    typeList: _api_root +'single/pms/typeList',//查询商品类型下的商品列表

    recommendBrand: _api_root +'single/pms/recommendBrand/list', // 查询首页推荐品牌
    newProductList: _api_root +'single/pms/newProductList/list', //查询首页新品
    hotProductList: _api_root +'single/pms/hotProductList/list', // 查询热销商品
    listCollect: _api_root +'collection/listCollect', // 显示关注列表
    deleteCollect: _api_root +'collection/delete', // 删除收藏中的某个商品
    favoriteSave: _api_root +'collection/favoriteSave', // 添加/商品收藏
    listAddress: _api_root +'address/list', // 显示所有收货地址
    deleteAddress: _api_root +'address/delete', // 删除
    addressSave: _api_root +'address/save', // 添加
    setDefaultAddress: _api_root +'address/address-set-default', // 设为默认地址

  },
  order: {
    addGroup: _api_root +'single/oms/addGroup', // 发起拼团
    acceptGroup: _api_root +'single/oms/acceptGroup', // 提交拼团
    orderList: _api_root +'single/oms/order/list', 		// 查询订单列表
    orderDetail: _api_root +'single/oms/detail', 		// 查询订单列表
    preOrder: _api_root +'single/oms/submitPreview', // 预览订单
    closeOrder: _api_root +'single/oms/closeOrder', // 关闭订单
    bookOrder: _api_root +'single/oms/generateOrder',//  生成订单
    addCart: _api_root +'cart/addCart', // 添加商品到购物车
    cartList: _api_root +'cart/list', 		// 获取某个会员的购物车列表
    promotionCartList: _api_root +'cart/list/promotion', 		// 获取某个会员的购物车列表,包括促销信息
    updateQuantity: _api_root +'cart/update/quantity', //修改购物车中某个商品的数量
    deleteCart: _api_root +'cart/delete', // 删除购物车中的某个商品
    clearCart: _api_root +'cart/clear', // 清空购物车
    jifenPay: _api_root +'pay/jifenPay', // 余额支付
    balancePay: _api_root +'pay/balancePay', // 余额支付
    weixinAppletPay: _api_root +'pay/weixinAppletPay', // 微信小程序支付
    aliPay: _api_root +'pay/aliPay', // 支付宝支付

  },
  cms: {
    subjectList: _api_root +'single/cms/subject/list', 		//  查询文章列表
    subjectCategoryList: _api_root +'single/cms/subjectCategory/list', 		//  查询文章分类列表
    subjectCommentList: _api_root +'single/cms/subjectComment/list', 		//  查询文章评论列表
    recommendSubjectList: _api_root +'single/cms/recommendSubjectList/list',  //查询首页推荐文章
    topicList: _api_root +'single/cms/topic/list', 		//  查询专题列表
    topicDetail: _api_root +'single/cms/topic/detail', 		// 专题详情
    subjectDetail: _api_root +'single/cms/subject/detail', 		// 文章详情
    createSubject: _api_root +'single/cms/createSubject', 		// 创建文章
  },

};
module.exports = api;