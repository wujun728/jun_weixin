
const app = getApp()

Page({

  data: {
    animationData: {}, //抽屉
    shopCount:{},
    setting: null, // setting   
    productData: [], // 商品数据 
    sysWidth: 320,//图片大小

    showType: false,
    countGood: 0,
    countPrice: 0,
    pushItem:[]
  },
  toProductDetail: function (event) {
    console.log("--------toProductDetail------")
    console.log(event.currentTarget.dataset.info)
    var info = event.currentTarget.dataset.info
    wx.navigateTo({
      url: '../productDetail/index?id=' + info.id + "&addShopId=" + info.belongShopId,
    })
  },
  //跳转到订单页面 
  toOrderPage: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  /* 点击分类大项 */
  bindTypeItem: function (event) {
    
    console.log(event.currentTarget.dataset.type)

    for (let i = 0; i < this.data.setting.platformSetting.categories.length; i++) {
      if (this.data.setting.platformSetting.categories[i].id == event.currentTarget.dataset.type.id) {
        this.data.setting.platformSetting.categories[i].active = true
      }
      else {
        this.data.setting.platformSetting.categories[i].active = false
      }
    }

    this.setData({
      setting: this.data.setting,
    })

    this.listPage.page = 1
    this.params.page = 1

    if (event.currentTarget.dataset.type.id == "all") {

      this.params.categoryId = ''
      this.getData(this.params, 2)
      this.setData({ showType: false, bindProductTypeIndex: null })

      var allItem = {
        id: ""
      }
      this.setData({
        focusTypeItem: allItem
      })
    }
    else {

      this.setData({
        focusTypeItem: event.currentTarget.dataset.type,
      })
      var focus = event.currentTarget.dataset.type
      this.params.categoryId = focus.id
      this.getData(this.params, 2)
      this.setData({ showType: false, bindProductTypeIndex: null })

    }
    
  },

  /* 获取数据 */
  getData: function (param, ifAdd) {
    //根据把param变成&a=1&b=2的模式
    if (!ifAdd) {
      ifAdd = 1
    }
    var customIndex = app.AddClientUrl("/more_product_list.html", param, 'get', '1')
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this


    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.productData

        if (ifAdd == 2) {
          dataArr = []
        }
        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ productData: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(res.data.result)
          that.setData({ productData: dataArr })
        }

        wx.hideLoading()
        that.setCartInProduct()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      },
      complete: function () {
        that.setData({ canRefresh: true })
      },
    })
  },
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /* 全部参数 */
  params: {
    categoryId: "",
    platformNo: "",
    belongShop: "",
    typeBelongShop: "",
    page: 1,
    showType: "",
    showColumn: "",
    productName: "",
    startPrice: "",
    endPrice: "",
    orderType: "",
    saleTypeId: "",
    promotionId: "",
    shopProductType: "",
    needCarCount: 1
  },
  //全局购物车同步数据
  setAppCart:function(){
    app.cart_offline = this.data.pushItem
  },

  //同步购物车数据到产品列表  --  购物车操作时
  setCartInProduct: function(){
    let productData = this.data.productData
    let pushItem = this.data.pushItem
      for (let j = 0; j < productData.length; j++) {
          productData[j].inCarCount = 0
      }
    for (let i = 0; i < pushItem.length; i++){
      for (let j = 0; j < productData.length; j++) {
        if (pushItem[i].id == productData[j].id){
          
          productData[j].inCarCount += pushItem[i].count_offline
        }
      }
    }
    this.setData({ productData: productData })
  },
  //做一个cart数据集和一个产品的数据集，
  //然后相互校对，一般是addNum时校对购物车里面的addCarNum时校对产品数据
  //所以cart的数据集很有必要
  //addNum的时候加入
  checkAdd: function (product, MeasureId){
    let pushItem = this.data.pushItem
    let result = {
      have: 0,
      index: -1
    }
    if (!pushItem) {
      let result = {
        have: 0,
        index: 0
      }
    }
    if (!MeasureId){
      MeasureId = 0
    }
    if (!!MeasureId){
      for (let i = 0; i < pushItem.length; i++) {
        if (product.id == pushItem[i].id) {
          if (MeasureId == pushItem[i].measureCartensian.id){
            result.have = 1
            result.index = i
          }
        }
      }
    }else{
      for (let i = 0; i < pushItem.length; i++) {
        if (product.id == pushItem[i].id) {

          result.have = 1
          result.index = i
        }
      }
    }
    
    
    return result
  },

  checkSub: function (product, MeasureId) {
    let pushItem = this.data.pushItem
    let result = {
      ifOne: 0,
      index: -1
    }
    if (!MeasureId) {
      MeasureId = 0
    }
    if (!!MeasureId){
      for (let i = 0; i < pushItem.length; i++) {
        if (product.id == pushItem[i].id) {
          console.log('----product  相等---------')
          if (pushItem[i].count_offline == 1) {
            if (MeasureId == pushItem[i].measureCartensian.id) {
              console.log('----measureCartensian  相等---------')
              result.ifOne = 1
              result.index = i
            }
          }else{
            if (MeasureId == pushItem[i].measureCartensian.id) {
              console.log('----measureCartensian  相等---------')
              result.ifOne = 0
              result.index = i
            }
          }
        }
      }
    }else{
      for (let i = 0; i < pushItem.length; i++) {
        if (product.id == pushItem[i].id) {
          if (pushItem[i].count_offline == 1) {
            console.log('-----------1--------------')
            result.ifOne = 1
            result.index = i
          }else{
            result.ifOne = 0
            result.index = i
          }
        }
      }
    }
    
    return result
  },
  //删除函数
  delectFromPushItem:function(index){
    let pushItem = this.data.pushItem
    pushItem.splice(index, 1);
    
  },
  delectFromProduct:function(product){
    let productData = this.data.productData
    for (let i = 0; i < productData.length; i++){
      if (product.id == productData[i].id){
        productData[i].inCarCount = 0
      }
    }
    this.setData({ productData: productData })
  },
  dellProduct: function (focusProduct,Ptype,measureId){
    let productData = this.data.productData
    let pushItem = this.data.pushItem
    if (!measureId){
      measureId = 0
    }
    if (!!measureId){
      if (Ptype == 'sub') {
        var result = this.checkSub(focusProduct, measureId)
        console.log(result)
        if (result.ifOne) {
          this.delectFromPushItem(result.index)
          this.delectFromProduct(focusProduct)
        } else {
          --pushItem[result.index].count_offline
        }
      }
      if (Ptype == 'add') {
        //检查是否在购物车里面数量为1
        let result = this.checkAdd(focusProduct, measureId)
        if (result.have) {
          //如果在那么就给他的数量加1
          ++pushItem[result.index].count_offline
        } else {
          focusProduct.count_offline = 1
          pushItem.push(focusProduct)
        }
      }
      console.log(pushItem)
      this.getPriceAndCount()
      this.setData({ pushItem: pushItem })
    }else{
      if (Ptype == 'sub') {
        //检查是否在购物车里面
        var result = this.checkSub(focusProduct)
        console.log(result)
        if (result.ifOne) {
          //如果在那么就给他删了
          //他的index有了
          this.delectFromPushItem(result.index)
        } else {
          --pushItem[result.index].count_offline
        }

      }
      if (Ptype == 'add') {
        //检查是否在购物车里面数量为1
        var result = this.checkAdd(focusProduct)
        if (result.have) {
          //如果在那么就给他的数量加1
          ++pushItem[result.index].count_offline
        } else {
          focusProduct.count_offline = 1
          pushItem.push(focusProduct)
        }
      }
    }
   
    console.log(pushItem)
    this.getPriceAndCount()
    this.setData({ pushItem: pushItem })
    this.showAnimation()
  },
  showAnimation:function(){
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in-out',
    })
    animation.scale(1.5).step()
    animation.scale(1).step()
    this.setData({
      shopCount: animation.export()
    })
  },
  subNum: function (event) {
    let productData = this.data.productData
    let index = event.currentTarget.dataset.id
    let focusProduct = productData[index]
    console.log(focusProduct)
    --focusProduct.inCarCount;
    this.setData({ productData: productData })
    this.dellProduct(focusProduct, 'sub')
  },
  addNum: function (event) {
    let productData = this.data.productData
    let index = event.currentTarget.dataset.id
    let focusProduct = productData[index]
    console.log(focusProduct)
    ++focusProduct.inCarCount;
    this.setData({ productData: productData})
    this.dellProduct(focusProduct, 'add')
  },
  //操作购物车
  dellCart: function (focusProduct, Ptype, measureId) {
    let productData = this.data.productData
    let pushItem = this.data.pushItem
    if (!measureId) {
      measureId = 0
    }
    if (!!measureId){
      if (Ptype == 'sub') {
        //检查是否在购物车里面
        var result = this.checkSub(focusProduct, measureId)
        console.log(result)
        if (result.ifOne) {
          //如果在那么就给他删了
          //他的index有了
          this.delectFromPushItem(result.index)
          this.delectFromProduct(focusProduct)
        } else {
          --pushItem[result.index].count_offline
        }

      }
      if (Ptype == 'add') {
        //检查是否在购物车里面数量为1
        var result = this.checkAdd(focusProduct, measureId)
        if (result.have) {
          //如果在那么就给他的数量加1
          ++pushItem[result.index].count_offline
        } else {
          focusProduct.count_offline = 1
          pushItem.push(focusProduct)
        }
      }
    }else{
      if (Ptype == 'sub') {
        //检查是否在购物车里面
        var result = this.checkSub(focusProduct)
        console.log(result)
        if (result.ifOne) {
          //如果在那么就给他删了
          //他的index有了
          this.delectFromPushItem(result.index)
          this.delectFromProduct(focusProduct)
        } else {
          --pushItem[result.index].count_offline
        }

      }
      if (Ptype == 'add') {
        //检查是否在购物车里面数量为1
        var result = this.checkAdd(focusProduct)
        if (result.have) {
          //如果在那么就给他的数量加1
          ++pushItem[result.index].count_offline
        } else {
          focusProduct.count_offline = 1
          pushItem.push(focusProduct)
        }
      }
    }
    
    
    console.log(pushItem)
    this.setCartInProduct()
    this.getPriceAndCount()
    this.setData({ pushItem: pushItem })
  },
  /* 购物车的加减 */
  subCartNum: function (e) {
    var that = this
    var pushItem = this.data.pushItem
    var focusCartItem = null
    var index = e.currentTarget.dataset.id
    console.log(pushItem)
    focusCartItem = pushItem[index]
    if (!!focusCartItem.measureCartensian) {
      this.dellCart(focusCartItem, 'sub', focusCartItem.measureCartensian.id)
    }else{
      this.dellCart(focusCartItem, 'sub')
    }
    
  },

  addCartNum: function (e) {
    var that = this
    var pushItem = this.data.pushItem
    var focusCartItem = null
    var index = e.currentTarget.dataset.id
    focusCartItem = pushItem[index]
    if (!!focusCartItem.measureCartensian){
      this.dellCart(focusCartItem, 'add', focusCartItem.measureCartensian.id)
    }
    else{
      this.dellCart(focusCartItem, 'add')
    }
    
  },

  //计算价格和数量
  getPriceAndCount:function(){
    let pushItem = this.data.pushItem
    let countPrice = 0
    let countGood = 0
    for (let i = 0; i < pushItem.length;i++){
      countGood += pushItem[i].count_offline
      countPrice += pushItem[i].count_offline * pushItem[i].price
    }   
    
    countPrice = countPrice.toFixed(2); 
    this.setData({
      countGood: countGood,
      countPrice: countPrice
    })
    if (this.data.countGood == 0){
      this.closeZhezhao()
    }
    /* 计算setting的type分类incart数量 */
    let setting = this.data.setting
     
    
    let categories = setting.platformSetting.categories
    for (let j = 0; j < categories.length; j++) {
      categories[j].hasInCartCount = 0
    }
    for (let i = 0; i < pushItem.length; i++){
      for (let j = 0; j < categories.length; j++){
        if (pushItem[i].category == categories[j].id) {
          categories[j].hasInCartCount += pushItem[i].count_offline
        }
      }
    }

    console.log(setting)
    this.setData({ setting: setting})
     
  },

  showZheshao: function () {
    this.setData({ pushItem: this.data.pushItem})
    this.setData({ showType: !this.data.showType })
    let showType2 = this.data.showType
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in-out',
    })
    if (showType2) {
      animation.height(250).step()
    } else {
      animation.height(0).step()
    }
    this.setData({
      animationData: animation.export()
    })
  },
  closeZhezhao: function () {
    this.setData({ showType: false })
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-out',
    })

    animation.height(0).step()

    this.setData({
      animationData: animation.export()
    })
  },
  /* 创建订单 */
  postCarItemJson: {
    shopId: '',
    orderType: ''
  },
  //items:[{productId:1,caratesianId:0,count:1}]
  createOrder:function(){
    if (!app.checkShopOpenTime()) { 
      return
    }
    if (!app.checkIfLogin()) {
      return
    }

    console.log(this.data.pushItem)
    let pushItem = this.data.pushItem
    let postParam = { postCarItemJson: { items:[]} }
    for (let i = 0; i < pushItem.length; i++){
      let item = {
        productId:'',
        caratesianId:'0',
        count:''
      }
      item.productId = pushItem[i].id
      if (!!pushItem[i].measureCartensian) {
        
        item.cartesianId = pushItem[i].measureCartensian.id
      }
      postParam.shopId = pushItem[i].belongShopId
      postParam.orderType = '0'
      item.count = pushItem[i].count_offline
      postParam.postCarItemJson.items.push(item)
    } 
    postParam.postCarItemJson = JSON.stringify(postParam.postCarItemJson)
    console.log(postParam)
    this.creatOrder_buyNow(postParam)
  },
  creatOrder_buyNow:function(data){
    var customIndex = app.AddClientUrl("/buy_now.html", data, 'post')
    var that = this
    // wx.showLoading({
    //   title: 'loading',
    //   mask: true
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if(res.data.errcode == '10001'){
          app.checkIfLogin()
          return
        }
        if (!!res.data.orderNo) {
          wx.navigateTo({
            url: '/pages/edit_order/index?orderNo=' + res.data.orderNo,
          })
        } else {
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }

      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  /****************/
  onLoad: function (options) {
    var that = this
    if (!app.setting) {
      console.log('-------------hasNoneSetting-----------')
      app.getSetting(that)
    } else {
      console.log('-------------hasSetting-----------')
      this.setData({ setting: app.setting })
      console.log(this.data.setting)
    }

    this.getData(this.params, 2);
    this.setData({
      sysWidth: app.globalData.sysWidth
    });
    this.setData({ pushItem: app.cart_offline })
  },

  onReady: function () {
    //this.getCart()
    //this.getPriceAndCount()
  },

  onShow: function () {
    
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },
  onPullDownRefresh: function () {
    
  },
  onReachBottom: function () {
    
  },
  onReachBottom2: function () {
    var that = this
    if (this.data.canRefresh) {
      this.setData({ canRefresh: false })
      setTimeout(function () {
        if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
          that.listPage.page++
          that.params.page++
          that.getData(that.params);
        }
      }, 300);
    }

  },


  /* 
     规格操作
  */
  MeasureParams: [],
  /* 初始化 选规格 */
  chooseMeasureItem: function (event) {
    let productData = this.data.productData
    let index = event.currentTarget.dataset.id
    let focusProduct = productData[index]
    for (let i = 0; i < focusProduct.measureTypes.length; i++) {
      focusProduct.measureTypes[i].checkedMeasureItem = 0
      //初始化选择的数据
      let param = {}
      param.name = focusProduct.measureTypes[i].name
      param.value = focusProduct.measureTypes[i].productAssignMeasure[0].id

      this.MeasureParams.push(param)

    }
    this.setData({
      showGuigeType: true,
      MeasureItem: focusProduct
    })
    this.get_measure_cartesion(focusProduct)
  },
  //提交规格产品  -- 加入购物车
  submitMeasure: function (id) {
    var that = this
    let focusProduct = this.data.MeasureItem
    let measurementJson = this.data.measurementJson
    focusProduct.measureCartensian = measurementJson
    console.log('------------submit------------')
    console.log(focusProduct)
    console.log(measurementJson)
    
    for (let i = 0; i < this.data.productData.length; i++){
      if (this.data.productData[i].id == focusProduct.id){
        ++this.data.productData[i].inCarCount 
      }
    }
    this.setData({ productData: this.data.productData })

    this.dellProduct(focusProduct, 'add', focusProduct.measureCartensian.id)
    this.get_measure_cartesion(focusProduct)
  },
  subMeasureNum:function(e){
    let that = this
    let pushItem = this.data.pushItem
    let productData = this.data.productData
    let mesureJson = e.currentTarget.dataset.id
    let focusProduct = null
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id == mesureJson.itemId) {
        focusProduct = productData[i]
        --productData[i].inCarCount
      }
    }
    this.setData({ productData: productData })
    this.dellProduct(focusProduct, 'sub', mesureJson.id)
    this.get_measure_cartesion(focusProduct)
  },
  addMeasureNum:function(e){
    let that = this
    let pushItem = this.data.pushItem
    let productData = this.data.productData
    let mesureJson = e.currentTarget.dataset.id
    let focusProduct = null
    for (let i = 0; i < productData.length; i++){
      if (productData[i].id == mesureJson.itemId){
        focusProduct = productData[i]
        ++productData[i].inCarCount 
      }
    }
    this.setData({ productData: productData })
    this.dellProduct(focusProduct, 'add', mesureJson.id)
    this.get_measure_cartesion(focusProduct)
  },
  //获取规格价格参数
  get_measure_cartesion: function (MeasureItem) {
    //console.log(this.data.MeasureItem)
    //let MeasureItem = this.data.MeasureItem
    let pushItem = this.data.pushItem
    let productId = MeasureItem.id
    let postStr = ''
    for (let i = 0; i < this.MeasureParams.length; i++) {
      postStr += this.MeasureParams[i].value + ','
    }
    let param = {}
    param.productId = productId
    param.measureIds = postStr
    let customIndex = app.AddClientUrl("/get_measure_cartesion.html", param)

    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        
        let measurementJson = res.data
        {
          console.log('----------------MeasureItem')
          console.log(MeasureItem)

          for (let i = 0; i < pushItem.length; i++ ){
            if (pushItem[i].id == MeasureItem.id ){
              if (pushItem[i].measureCartensian.id == measurementJson.id){
                measurementJson.count_offline = pushItem[i].count_offline
              }
            }
          }

        }
        that.setData({
          measurementJson: measurementJson
        })
        //that.getCount
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function () {
      },
    })
  },

  //选择规格小巷的---显示
  radioChange: function (e) {
    let index = e.currentTarget.dataset.index
    let indexJson = app.getSpaceStr(index, '-')
    //console.log(indexJson)

    let focusItem = this.data.MeasureItem
    focusItem.measureTypes[indexJson.str1].checkedMeasureItem = indexJson.str2
    console.log(focusItem)
    this.setData({ MeasureItem: focusItem })
    this.get_measure_cartesion(focusItem)
  },
  //选择规格小巷---获取数据
  chooseMeasure: function (e) {
    console.log(e.detail.value)
    let chooseMeasureJson = app.getSpaceStr(e.detail.value, '-')
    console.log(chooseMeasureJson)

    for (let i = 0; i < this.MeasureParams.length; i++) {
      if (this.MeasureParams[i].name == chooseMeasureJson.str1) {
        this.MeasureParams[i].value = chooseMeasureJson.str2
      }
    }
    
  },

  closeGuigeZhezhao: function () {
    this.setData({ showGuigeType: false })
    this.MeasureParams = []

  },




})