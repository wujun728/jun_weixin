  

const app = getApp()

Page({

  data: {
    animationData:{},
    setting: null, // setting   
    productData: [], // 商品数据 
    sysWidth: 320,//图片大小
    tab:'',
    /* 显示或影藏 */
    showType: false,
    show0: false,
    show1: false,
    show2: false,
    topName: {
      SearchProductName: "",//头部搜索的
    },


    focusTypeItem: null,
    bindProductTypeIndex: null,

    ProductshowWay: 1, // ProductshowWay列表显示方法 

    typeSearch: '', // typeSearch的字体 
    canRefresh:true,
    /* 购物车 */
    cart:[],
    pushItem: [],
    countGood: 0,
    countPrice: 0,


    //规格
    showGuigeType:false,
    checkedMeasureItem: 0,
    MeasureItem: null,
    measurementJson: {
      price: 0
    },  //规格价格
  },
  //获取产品分类
  getProductType: function (categoryId) {
    var customIndex = app.AddClientUrl("/wx_get_categories_only_by_parent.html", { categoryId: categoryId || 0 })
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        wx.hideLoading()
        console.log("getProductType", res.data)
        if (res.data.errcode == 0) {
          that.setData({ productType: res.data.relateObj })
        } else {
          that.setData({ productType: that.data.productType })
        }
        that.data.productType.unshift({ id: categoryId||0, name: "全部" })
        for (let i = 0; i < that.data.productType.length; i++) {
          that.data.productType[i].colorAtive = '#888';
        }
        that.data.productType[0].colorAtive = that.data.setting.platformSetting.defaultColor;
        that.data.productType[0].active = true;
        that.setData({ productType: that.data.productType })
        console.log("that.data.productType",that.data.productType)
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  //跳转到订单页面
  linkUrl:function(e){
    console.log("===e====",e)
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  /* 点击遮罩层 */
  closeZhezhao: function () {
    this.getData(this.params, 2)
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
  showZheshao:function(){
    this.getData(this.params, 2)
    this.setData({ showType: !this.data.showType })
    let showType2 = this.data.showType
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in-out',
    })
    if (showType2){
      animation.height(250).step()
    }else{
      animation.height(0).step()
    }
    this.setData({
      animationData: animation.export()
    })
  },
  /* 点击分类大项 */
  bindTypeItem: function (event) {
    console.log(event.currentTarget.dataset.type)
    let that=this;
    for (let i = 0; i < that.data.productType.length; i++) {
      if (that.data.productType[i].id == event.currentTarget.dataset.type.id) {
        that.data.productType[i].active = true
        that.setData({ currentItem: that.data.productType[i] })
      }
      else {
        that.data.productType[i].active = false
      }
    }

    that.setData({
      productType: that.data.productType,
    })

    that.listPage.page = 1
    that.params.page = 1

    if (event.currentTarget.dataset.type.id == "all") {

      that.params.categoryId = ''
      that.getData(this.params, 2)
      that.setData({ showType: false, bindProductTypeIndex: null })

      var allItem = {
        id: ""
      }
      that.setData({
        focusTypeItem: allItem
      })
    }
    else {

      that.setData({
        focusTypeItem: event.currentTarget.dataset.type,
      })
      var focus = event.currentTarget.dataset.type

      //if (focus.children.length == 0) {

       

      that.params.categoryId = focus.id
      that.getData(this.params, 2)
      that.setData({ showType: false, bindProductTypeIndex: null })
      //}

    }

  },
  ChangeParam: function (params) {
    var returnParam = ""
    for (let i in params) {
      returnParam += "&" + i + "=" + params[i]
    }
    console.log(returnParam)
    return returnParam
  },
 
  /* 拿出价格和购物车里面的东西 */
  showPrice: function () {
    var cartDataItem = this.data.cart[0].carItems
    var pushItem = []
   /*  var countGood = 0
    var countPrice = 0 */

    for (let i = 0; i < cartDataItem.length; i++) {
      pushItem.push(cartDataItem[i])
    }
   /*  for (let i = 0; i < pushItem.length; i++) {
      countGood += parseInt(pushItem[i].count)
      countPrice += parseInt(pushItem[i].count) * pushItem[i].carItemPrice
    } */

    this.setData({
      pushItem: pushItem,
  /*     countGood: countGood,
      countPrice: countPrice */
    })
    /* console.log(pushItem)
    console.log(countGood)
    console.log(countPrice) */
  },
/* 产品的加减 */
  subNum: function (event){
    if (!app.checkIfLogin()) {
      
      return
    }

    let productData = this.data.productData
    let index = event.currentTarget.dataset.id
    let focusProduct = productData[index]
    console.log(focusProduct)
    var params = {}
    params.cartesianId = focusProduct.measureItem
    params.productId = focusProduct.id
    params.shopId = focusProduct.belongShopId
    if (focusProduct.inCarCount == 1){
      params.count = 0
      params.type = 'change'
    }else{
      params.count = 1
      params.type = 'dec'
    }
    --focusProduct.inCarCount;
    this.postParams(params)
  },
  /* 初始化Nums  用传值方式 */
  getPriceAndCount:function(){
    let params={}
    params.cartesianId = '0',
    params.productId = '0'
    this.postParams(params)
  },
  addNum: function (event){
    if (!app.checkIfLogin()) {
      
      return
    }

    let productData = this.data.productData
    let index = event.currentTarget.dataset.id
    let focusProduct = productData[index]
    console.log(focusProduct)
    ++focusProduct.inCarCount;
   // this.setData({ productData: productData})

   
    var params = {}
    params.cartesianId = focusProduct.measureItem
    params.productId = focusProduct.id
    params.shopId = focusProduct.belongShopId
    params.count = 1
    params.type = 'add'

    this.postParams(params)
  },

  /* 购物车的加减 */
  subCartNum: function (e) {
    var that = this
    var pushItem = this.data.pushItem
    var focusCartItem = null
    var index = e.currentTarget.dataset.id
    console.log(pushItem)
    focusCartItem = pushItem[index]
    let params = {
      cartesianId: '0',
      productId: '',
      shopId: '',
      count: '',
      type: '',
    }
    //focusCartItem.count--;
    
      params.cartesianId = focusCartItem.measureCartesianId
      params.productId = focusCartItem.productId
      params.shopId = focusCartItem.belongShop
      if (focusCartItem.count==1){
        params.count = 0
        params.type = 'change'
      }else{
        params.count = 1
        params.type = 'dec'
      }
    
    this.postParams(params)
  },

  addCartNum: function (e) {
    var that = this
    var pushItem = this.data.pushItem
    var focusCartItem = null
    var index = e.currentTarget.dataset.id
    
    focusCartItem = pushItem[index]
    //focusCartItem.count++;
    var params = {
      cartesianId: '0',
      productId: '',
      shopId: '',
      count: '',
      type: '',
    }
    params.cartesianId = focusCartItem.measureCartesianId
    params.productId = focusCartItem.productId
    params.shopId = focusCartItem.belongShop
    params.count = 1
    params.type = 'add'
    this.postParams(params)

  },
  /* 获取数据 */
  getData: function (param, ifAdd) {
    //根据把param变成&a=1&b=2的模式
    if (!ifAdd) {
      ifAdd = 1
    }
    var customIndex = app.AddClientUrl("/more_product_list.html", param)
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
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      },
      complete:function(){
        that.setData({ canRefresh: true })
      },
    })
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
 

  more_product_list_URL: function (params) {
    let resule = app.AddClientUrl("/more_product_list.html", params)
    return resule;
  },


  


  toProductDetail: function (event) {
    console.log("--------toProductDetail------")
    console.log(event.currentTarget.dataset.info)
    var info = event.currentTarget.dataset.info
    wx.navigateTo({
      url: '../productDetail/index?id=' + info.id + "&addShopId=" + info.belongShopId,
    })
  },
  /* 购物车加减 */
  postParams: function (data) {
    var that = this
    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data,'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        that.setData({
          countGood: res.data.totalCarItemCount,
          countPrice: res.data.totalCarItemPrice,
          productData: that.data.productData
        })
        that.getCart()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  
 /* 创建订单 */
  createOrder: function () {
    if (!app.checkShopOpenTime()) {
      return
    }
    var listPro = { 
      shopId: '',
      selectedIds: ''
    }
    
    console.log('--------下单了----------')
    if (this.data.cart.length == 0){
      return
    }
    let pushItem = this.data.cart[0].carItems
    if (pushItem.length == 0) {
      return
    }
    for (let i = 0; i < pushItem.length; i++) {
      listPro.shopId = pushItem[i].belongShop
      listPro.selectedIds += pushItem[i].id + ','
    }

    let that = this
    let customIndex = app.AddClientUrl(" /list_promotions_by_car_items.html", listPro, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('------这里应该有promotionId数组--------')
        console.log(res)

        wx.hideLoading()
        if (!!res.data.promotionId) {
          listPro.promotionId = res.data.promotionId
        } else {
          listPro.promotionId = '0'
        }
        console.log(res.data)
        console.log(listPro)
        that.createOrder22(listPro)
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })



  },
  /* 创建订单 */
  createOrder22: function (o) {
    var customIndex = app.AddClientUrl("/shopping_car_list_item_create_order.html", o, 'post')
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

        console.log("=======+++++++=======",res)
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
  /* 获取购物车 */
  getCart: function () {
    var customIndex = app.AddClientUrl("Client.User.CarItemList")
    var that = this
  
    //拿custom_page
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        
        if (res.data.errcode == '10001') {
          
            that.setData({ cart: [] })
        } else {
          
          if (!!res.data.result.length) {
            that.setData({ cart: res.data.result })
            that.showPrice()
          }
          else {
            
            that.setData({ cart: [] })
            that.setData({ pushItem:[]})    
            that.setData({ showType:false })     
          }
        }


      },
      fail: function (res) {
        
      }
    })
  },

  /* 
      规格操作
   */
  MeasureParams: [],
  //提交规格产品
  submitMeasure: function (id) {
    var that = this
    let focusProduct = this.data.MeasureItem
    let measurementJson = this.data.measurementJson
    let data = {}
    console.log(focusProduct)
    ++focusProduct.inCarCount;
    data.cartesianId = measurementJson.id
    data.productId = focusProduct.id
    data.shopId = focusProduct.belongShopId
    data.count = 1
    data.type = 'add'

    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('--------add----------')
        console.log(res.data)
        that.setData({
          countGood: res.data.totalCarItemCount,
          countPrice: res.data.totalCarItemPrice,
          productData: that.data.productData,
          showGuigeType: false,
        })
        that.showZheshao()
        that.getCart()
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },
  //获取规格价格参数
  get_measure_cartesion: function () {
    console.log(this.data.MeasureItem)
    let productId = this.data.MeasureItem.id
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
        that.setData({
          measurementJson: res.data
        })
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function () {
      },
    })
  },
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
    this.get_measure_cartesion()
  },
  //选择规格小巷的---显示
  radioChange: function (e) {
    let index = e.currentTarget.dataset.index
    let indexJson = app.getSpaceStr(index, '-')
    //console.log(indexJson)

    let focusItem = this.data.MeasureItem
    focusItem.measureTypes[indexJson.str1].checkedMeasureItem = indexJson.str2
    this.setData({ MeasureItem: focusItem })
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
    this.get_measure_cartesion()
  },

  closeGuigeZhezhao: function () {
    this.setData({ showGuigeType: false })
    this.MeasureParams = []

  },
  
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("===options=====", options)
    this.setData({ setting: app.setting })
    var that = this;
    if (options.parentCategoryId) {
      that.setData({ positionTab: options.parentCategoryId })
      options.categoryId = options.parentCategoryId
      that.getProductType(options.categoryId, that.bindTypeItem)
    } else {
      that.getProductType(options.categoryId)
    }
    for (let i in options) {
      for (let j in this.params) {
        if (i.toLowerCase() == j.toLowerCase()) { this.params[j] = options[i] }
      }
    }
    console.log(this.params)
    this.getData(this.params, 2);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCart()
    this.getPriceAndCount()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {


    this.listPage.page = 1
    this.params.page = 1
    this.getData(this.params, 2)

    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom2: function () {
    var that = this
    if (this.data.canRefresh){
      this.setData({ canRefresh:false })
      setTimeout(function () {
        if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
          that.listPage.page++
          that.params.page++
          that.getData(that.params);
        }
      }, 300);
    }
    
  },

})