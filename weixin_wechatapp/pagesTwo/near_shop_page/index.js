

const app = getApp()

Page({

  data: {
    animationData: {},
    setting: null, // setting   
    productData: [], // 商品数据 
    sysWidth: 320,//图片大小
    tab: '',
    /* 显示或影藏 */
    showType: false,
    show0: false,
    show1: false,
    show2: false,
    shopInfo: null,
    shopProList: null,
    proTypeState: false,
    allPro: true,
    componentState: true,
    componentIndexState: true,
    topName: {
      SearchProductName: "",//头部搜索的
    },
    nextSevenDaysList: [],
    venuesTypeList: [],
    venuesCellList:[],
    selectVenuesData:{
      venuesTypeData:{index:0,data:null},
      daysData: { index: 0, data: null },
      venuesCelleData: { index: 0, data: null }
    },
    venuesDateCellsState:false,
    haveVenuesDateCellsList:[],
    allPrice:0,
    focusTypeItem: null,
    bindProductTypeIndex: null,

    ProductshowWay: 1, // ProductshowWay列表显示方法 
    posterShopState:false,
    typeSearch: '', // typeSearch的字体 
    canRefresh: true,
    /* 购物车 */
    cart: [],
    pushItem:[],
    countGood: 0,
    countPrice: 0,


    //规格
    showGuigeType: false,
    checkedMeasureItem: 0,
    MeasureItem: null,
    measurementJson: {
      price: 0
    },  //规格价格
  },
  getChilrenPoster(e) {

    let that = this;
    that.setData({
      posterShopState: false,
    })

  },
  shareShop: function () {
    let that = this;
    this.getQrCode();
    that.setData({
      posterShopState: true,
    })
  },
  // 获取二维码
  getQrCode: function () {

    let userId = "";
  
    if (app.loginUser && app.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
    }
  
    // path=pageTab%2findex%2findex%3fAPPLY_SERVER_CHANNEL_CODE%3d'
    let postParam = {}
    postParam.SHARE_PRODUCT_DETAIL_PAGE = this.params.belongShop;
    postParam.scene = userId

    // 上面是需要的参数下面的url

    var customIndex = app.AddClientUrl("/super_shop_manager_get_mini_code.html?mini=1&path=pageTab%2findex%2findex%3fENTER_SHOP%3d" + this.params.belongShop + "%26scene%3d" + userId, postParam, 'get', '1')
    var result = customIndex.url.split("?");

    customIndex.url = result[0] + "?" + result[1]

    console.log("customIndex", customIndex.url, result[0])

    var that = this
    that.setData({
      qrCodeUrl: customIndex.url
    })
   console.log()
  },
  setAppCart: function () {
    let belongShopId = 'belongShopId_' + this.params.belongShop
    app.cart_offline[belongShopId] = this.data.pushItem
  },
  // 定位
  clickCatch: function (e) {
    console.log(this.data.shopInfo)
    let latitude = this.data.shopInfo.latitude;
    let longitude = this.data.shopInfo.longitude;
    let name = this.data.shopInfo.shopName;
    let address = this.data.shopInfo.shopLocation
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 12,
      name: name,
      address: address
    })
  },
  calling:function(e){
    console.log('====e===', e)
    let phoneNumber = e.currentTarget.dataset.phonenumber||""
    app.calling(phoneNumber)
  },
  //跳转到订单页面
  toOrderPage: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  toMy: function (e) {
    app.toMy();
  },
  /* 点击遮罩层 */
  closeZhezhao: function () {
    this.getShopListData(this.params, 2)
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
  showZheshao: function () {
    this.setData({ pushItem: this.data.pushItem })
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
  /* 点击分类大项 */
  bindTypeItem: function (event) {
    this.listPage.page = 1
    this.params.page = 1
    console.log('======1======', event.currentTarget.dataset)
    if (event.currentTarget.dataset.type === 'all') {
      console.log("-=======this.data.shopInfo=========", this.data.shopInfo);
      let belongShop = this.data.shopInfo.id;
      let shopProductType = event.currentTarget.dataset.index;
      let param = Object.assign({}, param, { belongShop: belongShop, shopProductType: shopProductType })
      this.setData({
        allPro: true
      })
      for (let i = 0; i < this.data.shopInfo.shopTypes.length; i++) {
        this.data.shopInfo.shopTypes[i].active = false
      }
      this.setData({
        shopInfo: this.data.shopInfo,
      })
      this.getShopListData(param,2)
    } else {
      let belongShop = event.currentTarget.dataset.type.belongShopId;
      let shopProductType = event.currentTarget.dataset.type.id;
      let param = Object.assign({}, param, { belongShop: belongShop, shopProductType: shopProductType })
      this.setData({
        allPro: false
      })
      for (let i = 0; i < this.data.shopInfo.shopTypes.length; i++) {
        if (this.data.shopInfo.shopTypes[i].id == event.currentTarget.dataset.type.id) {
          this.data.shopInfo.shopTypes[i].active = true
        }
        else {
          this.data.shopInfo.shopTypes[i].active = false
        }
      }
      console.log("this.data.shopInfo.shopTypes", this.data.shopInfo.shopTypes)
      this.setData({
        shopInfo: this.data.shopInfo,
      })
      this.getShopListData(param,2)
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
  subNum: function (event) {
    let productData = this.data.shopProList
    let index = event.currentTarget.dataset.id
    let focusProduct = productData[index]
    console.log(focusProduct)
    --focusProduct.inCarCount;
    this.setData({ shopProList: productData })
    this.dellProduct(focusProduct, 'sub')
  },
  addNum: function (event) {
    let productData = this.data.shopProList
    let index = event.currentTarget.dataset.id
    let focusProduct = productData[index]
    console.log(focusProduct)
    ++focusProduct.inCarCount;//添加购买数量
    this.setData({ shopProList: productData })
    this.dellProduct(focusProduct, 'add')
  },

  //删除函数
  delectFromPushItem: function (index) {
    let pushItem = this.data.pushItem
    pushItem.splice(index, 1);
    this.setData({ pushItem: this.data.pushItem })
  },
  delectFromProduct: function (product) {
    let productData = this.data.shopProList
    for (let i = 0; i < productData.length; i++) {
      if (product.id == productData[i].id) {
        productData[i].inCarCount = 0
      }
    }
    this.setData({ shopProList: productData })
  },
  dellProduct: function (focusProduct, Ptype, measureId) {
    console.log('========0=======', focusProduct)
    let productData = this.data.shopProList
    let pushItem = this.data.pushItem
    if (!measureId) {
      console.log('=====1=====')
      measureId = 0
    }
    if (!!measureId) {
      console.log('=====2=====')
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
    } else {
      console.log('=====3=====')
      if (Ptype == 'sub') {
        console.log('=====sub=====')
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
        console.log('=====add=====')
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

    console.log('===pushItem====',pushItem)
    
    this.getPriceAndCount()
    this.setData({ pushItem: pushItem })
    this.showAnimation()
    this.setAppCart();
  },
  showAnimation: function () {
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
  //做一个cart数据集和一个产品的数据集，
  //然后相互校对，一般是addNum时校对购物车里面的addCarNum时校对产品数据
  //所以cart的数据集很有必要
  //addNum的时候加入
  checkAdd: function (product, MeasureId) {
    console.log('===this.data.pushItem======',this.data.pushItem)
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
    if (!MeasureId) {
      MeasureId = 0
    }
    if (!!MeasureId) {
      for (let i = 0; i < pushItem.length; i++) {
        if (product.id == pushItem[i].id) {
          if (MeasureId == pushItem[i].measureCartensian.id) {
            result.have = 1
            result.index = i
          }
        }
      }
    } else {
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
    if (!!MeasureId) {
      for (let i = 0; i < pushItem.length; i++) {
        if (product.id == pushItem[i].id) {
          console.log('----product  相等---------')
          if (pushItem[i].count_offline == 1) {
            if (MeasureId == pushItem[i].measureCartensian.id) {
              console.log('----measureCartensian  相等---------')
              result.ifOne = 1
              result.index = i
            }
          } else {
            if (MeasureId == pushItem[i].measureCartensian.id) {
              console.log('----measureCartensian  相等---------')
              result.ifOne = 0
              result.index = i
            }
          }
        }
      }
    } else {
      for (let i = 0; i < pushItem.length; i++) {
        if (product.id == pushItem[i].id) {
          if (pushItem[i].count_offline == 1) {
            console.log('-----------1--------------')
            result.ifOne = 1
            result.index = i
          } else {
            result.ifOne = 0
            result.index = i
          }
        }
      }
    }

    return result
  },
  /* 初始化Nums  用传值方式 */
  //计算价格和数量
  getPriceAndCount: function () {
    let pushItem = this.data.pushItem
    let countPrice = 0
    let countGood = 0
    for (let i = 0; i < pushItem.length; i++) {
      countGood += pushItem[i].count_offline
      countPrice += pushItem[i].count_offline * pushItem[i].price
    }

    countPrice = countPrice.toFixed(2);
    this.setData({
      countGood: countGood,
      countPrice: countPrice
    })
    if (this.data.countGood == 0) {
      this.closeZhezhao()
    }
    /* 计算setting的type分类incart数量 */
    console.log('=====this.data.shopInfo.shopTypes=====', this.data.shopInfo.shopTypes)
    console.log('=====this.data.pushItem=====', this.data.pushItem)
    let categories = this.data.shopInfo.shopTypes
    if (this.data.shopInfo.shopTypes){
      for (let j = 0; j < categories.length; j++) {
        categories[j].hasInCartCount = 0
      }
      for (let i = 0; i < pushItem.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (pushItem[i].shopProductType == categories[j].id) {
            categories[j].hasInCartCount += pushItem[i].count_offline
          }
        }
      }
    }

    console.log('=====this.data.shopInfo.shopTypes=====',this.data.shopInfo.shopTypes)
    this.setData({ shopInfo: this.data.shopInfo })

  },

  //操作购物车
  dellCart: function (focusProduct, Ptype, measureId) {
    let productData = this.data.shopProList
    let pushItem = this.data.pushItem
    if (!measureId) {
      measureId = 0
    }
    if (!!measureId) {
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
    } else {
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
    } else {
      this.dellCart(focusCartItem, 'sub')
    }

  },

  addCartNum: function (e) {
    var that = this
    var pushItem = this.data.pushItem
    var focusCartItem = null
    var index = e.currentTarget.dataset.id
    focusCartItem = pushItem[index]
    if (!!focusCartItem.measureCartensian) {
      this.dellCart(focusCartItem, 'add', focusCartItem.measureCartensian.id)
    }
    else {
      this.dellCart(focusCartItem, 'add')
    }

  },
  /* 获取数据 */
  getShopTypeData: function (param) {
    //根据把param变成&a=1&b=2的模式
    var customIndex = app.AddClientUrl('/shop_detail_' + param.addShopId + '.html')
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("=====shopdata======", res.data)
        let dataArr = res.data.result.shopInfo
        if (!res.data.result.shopInfo) {
          that.setData({ shopInfo: null })
        } else {
          that.setData({ shopInfo: dataArr })
        }
        that.getShopListData(that.params, 2)
        wx.hideLoading()
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
  /* 获取数据 */
  getShopListData: function (param, ifAdd) {
    if (!ifAdd) {
      ifAdd = 1
    }
    console.log('====getShopListData.param======',param)
    //根据把param变成&a=1&b=2的模式
    var customIndex = app.AddClientUrl('/more_product_list.html', param)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("=====shopListdata======", res.data)
        that.listPage.pageSize = res.data.pageSize
        that.listPage.curPage = res.data.curPage
        that.listPage.totalSize = res.data.totalSize
        let dataArr = that.data.shopProList
        if (ifAdd == 2) {
          dataArr = []
        }
        if (!res.data.result || res.data.result.length == 0) {
          that.setData({ shopProList: null })
        } else {
          if (dataArr == null) { dataArr = [] }
          dataArr = dataArr.concat(res.data.result)
          that.setData({ shopProList: dataArr })
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
  /* 确认预定场馆 */
  confirmReserve:function(){
    console.log("=====confirmReserve========")
    let that=this;
    let param = that.data.selectVenuesData
    let startSeconds= [];
    let haveVenuesDateCellsList = that.data.haveVenuesDateCellsList;
    for (let i = 0; i < haveVenuesDateCellsList.length;i++){
      startSeconds.push(haveVenuesDateCellsList[i].startSecond)
    }
    if (startSeconds.length==0){
      wx.showToast({
        title: '请选择场次!',
        image: '/images/icons/tip.png',
        duration: 1000
      })
      return;
    }
    console.log("======startSeconds============", startSeconds)
    let params = { venuesId: param.venuesCelleData.data.id, venuesDateStr: param.daysData.data.oneData, startSeconds: startSeconds.join(',') }
    var customIndex = app.AddClientUrl('/create_venues_order.html', params, 'post')
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log("=====confirmReserve_res======", res.data)
        if (res.data.errcode == 0) {
          wx.navigateTo({
            url: '/pages/edit_order/index?orderNo=' + res.data.relateObj.orderNo,
          })
        }
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        app.loadFail()
      },
      complete: function () {
       
      },
    })
  },
  /* 选择场馆 */
  selecVenuesCellItemFun: function (e) {
    console.log("=====selecVenuesCellItemFun========",e)
    let that=this;
    let index = e.currentTarget.dataset.index;
    let info = e.currentTarget.dataset.info;
    let type = e.currentTarget.dataset.type;
    let startSecond = e.currentTarget.dataset.startsecond;
    let haveVenuesDateCellsList = that.data.haveVenuesDateCellsList;
    let allPrice = 0;
    let venuesCellList = that.data.venuesCellList;
    if (haveVenuesDateCellsList.length!=0){
      console.log("已有选择场次")
      if (type == 'cancel') {
        console.log("取消场次")
        for (let i = 0; i < haveVenuesDateCellsList.length; i++) {
          if (haveVenuesDateCellsList[i].startSecond == startSecond){
            haveVenuesDateCellsList.splice(i, 1)
            venuesCellList.cells[index].state = false
          }
        }
      } else {
        console.log("选择场次")
        haveVenuesDateCellsList.splice(haveVenuesDateCellsList.length, 0, { startSecond: startSecond, info: info })
        venuesCellList.cells[index].state = true
      }
    } else {
      console.log("第一次选择场次")
      haveVenuesDateCellsList.splice(haveVenuesDateCellsList.length, 0, { startSecond: startSecond, info: info })
      venuesCellList.cells[index].state = true
    }
    for (let i = 0; i < haveVenuesDateCellsList.length; i++) {
      allPrice += haveVenuesDateCellsList[i].info.cellPrice;
    }
    console.log("=====haveVenuesDateCellsList========", haveVenuesDateCellsList)
    that.setData({ haveVenuesDateCellsList: haveVenuesDateCellsList, venuesCellList: venuesCellList, allPrice: allPrice})
  },
  /* 预定场馆 */
  scheduledVenuesFun: function () {
    console.log("=====scheduledVenuesFun========")
    let that=this;
    that.setData({ venuesDateCellsState: true })
  },
  hiddenZheZhao: function () {
    console.log("=====hiddenZheZhao========")
    let that = this;
    that.setData({ venuesDateCellsState: false })
  },
  /* 获取场馆日期单元 */
  getVenuesDateCellsData: function (param) {
    console.log("=====getVenuesDateCellsData========",param)
    let params = { venuesId: param.venuesCelleData.data.id, venuesDateStr: param.daysData.data.oneData}
    var customIndex = app.AddClientUrl('/wx_get_venues_date_cells.html', params)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("=====getVenuesDateCellsData======", res.data)
        if (res.data.errcode==0){
          let venuesCellList = res.data.relateObj[0]
          for (let i = 0; i < venuesCellList.cells.length;i++){
            venuesCellList.cells[i].state = false
          }
          that.setData({ venuesCellList: venuesCellList })
          console.log("=====venuesCellList======", that.data.venuesCellList)
        }
        wx.hideLoading()
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
  selectVenuesDataFun:function(e){
    let that = this;
    console.log("====selectVenuesDataFun===", e)
    let selectVenuesData=that.data.selectVenuesData
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    let info = e.currentTarget.dataset.info;
    that.setData({ haveVenuesDateCellsList: [], allPrice: 0 })
    if (type =='venuesType'){
      console.log("===========venuesType===============")
      selectVenuesData.venuesTypeData = { index: index,data:info}
      selectVenuesData.daysData = { index: 0, data: that.data.nextSevenDaysList[0] }
      if (that.data.venuesTypeList[index].venues.length != 0) {
        selectVenuesData.venuesCelleData = { index: 0, data: that.data.venuesTypeList[index].venues[0] }
        that.getVenuesDateCellsData(selectVenuesData)
      }
    } else if (type == 'daysData') {
      console.log("===========daysData===============")
      selectVenuesData.daysData = { index: index, data: info }
      if (that.data.venuesTypeList[selectVenuesData.venuesTypeData.index].venues.length != 0) {
        // selectVenuesData.venuesCelleData = { index: 0, data: that.data.venuesTypeList[selectVenuesData.venuesTypeData.index].venues[0] }
        that.getVenuesDateCellsData(selectVenuesData)
      }
    } else {
      console.log("===========venuesCell===============")
      selectVenuesData.venuesCelleData = { index: index, data: info }
      that.getVenuesDateCellsData(selectVenuesData)
    }
    that.setData({ selectVenuesData: selectVenuesData })
    console.log("====selectVenuesDataFun===", e, selectVenuesData)
  },
  getNextSevenDays:function(){
    let that=this
    let myDate = new Date();
    let curDayData=myDate.getDay();
    let curLocaleData=myDate.toLocaleDateString(); //获取当前日期
    console.log("====getNextSevenDays===", curDayData, curLocaleData)
    for(let i=0;i<10;i++){
      console.log("=======", i + curDayData);
      let switchData;
      let oneData;
      if (i + curDayData > 6 && i + curDayData<14){
        switchData = i + curDayData-7
      } else if (i + curDayData>=14){
        switchData = i + curDayData - 14
      }else{
        switchData = i + curDayData
      }
      switch (switchData) {
        case 0:
          oneData = that.getOneDay(i)
          that.data.nextSevenDaysList.splice(that.data.nextSevenDaysList.length, 0, { weekData: i != 0 ? '周日':'今天', oneData: oneData, oneDataStr: oneData.slice(5)})
          console.log("====getOneDay=====", i, that.getOneDay(i))
          console.log("===that.data.nextSevenDaysList===", that.data.nextSevenDaysList)
          break;
        case 1:
          oneData = that.getOneDay(i)
          that.data.nextSevenDaysList.splice(that.data.nextSevenDaysList.length, 0, { weekData: i != 0 ? '周一' : '今天', oneData: oneData, oneDataStr: oneData.slice(5)})
          console.log("====getOneDay=====", i, that.getOneDay(i))
          console.log("===that.data.nextSevenDaysList===", that.data.nextSevenDaysList)
          break;
        case 2:
          oneData = that.getOneDay(i)
          that.data.nextSevenDaysList.splice(that.data.nextSevenDaysList.length, 0, { weekData: i != 0 ? '周二' : '今天', oneData: oneData, oneDataStr: oneData.slice(5)})
          console.log("====getOneDay=====", i, that.getOneDay(i))
          console.log("===that.data.nextSevenDaysList===", that.data.nextSevenDaysList)
          break;
        case 3:
          oneData = that.getOneDay(i)
          that.data.nextSevenDaysList.splice(that.data.nextSevenDaysList.length, 0, { weekData: i != 0 ? '周三' : '今天', oneData: oneData, oneDataStr: oneData.slice(5)})
          console.log("====getOneDay=====", i, that.getOneDay(i))
          console.log("===that.data.nextSevenDaysList===", that.data.nextSevenDaysList)
          break;
        case 4:
          oneData = that.getOneDay(i)
          that.data.nextSevenDaysList.splice(that.data.nextSevenDaysList.length, 0, { weekData: i != 0 ? '周四' : '今天', oneData: oneData, oneDataStr: oneData.slice(5)})
          console.log("====getOneDay=====", i, that.getOneDay(i))
          console.log("===that.data.nextSevenDaysList===", that.data.nextSevenDaysList)
          break;
        case 5:
          let oneData = that.getOneDay(i)
          that.data.nextSevenDaysList.splice(that.data.nextSevenDaysList.length, 0, { weekData: i != 0 ? '周五' : '今天', oneData: oneData, oneDataStr: oneData.slice(5)})
          console.log("====getOneDay=====", i, that.getOneDay(i))
          console.log("===that.data.nextSevenDaysList===", that.data.nextSevenDaysList)
          break;
        case 6:
          oneData = that.getOneDay(i)
          that.data.nextSevenDaysList.splice(that.data.nextSevenDaysList.length, 0, { weekData: i != 0 ? '周六' : '今天', oneData: oneData, oneDataStr: oneData.slice(5)})
          console.log("====getOneDay=====", i, that.getOneDay(i))
          console.log("===that.data.nextSevenDaysList===", that.data.nextSevenDaysList)
          break;
      } 
    }
    let selectVenuesData = that.data.selectVenuesData
    selectVenuesData.daysData = { index: 0, data: that.data.nextSevenDaysList[0] }
    that.setData({ selectVenuesData: selectVenuesData })
    that.setData({ nextSevenDaysList:that.data.nextSevenDaysList})
    that.getVenuesDateCellsData(selectVenuesData)
  },
  getOneDay:function (day){
    var dd = new Date();
    dd.setDate(dd.getDate() + day);//获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;//获取当前月份的日期 
    var d = dd.getDate() < 10 ? '0' +  dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d; 
  },
  /* 获取场馆类型数据 */
  getShopVenuesTypeData: function (param) {
    var customIndex = app.AddClientUrl('/wx_get_shop_venues_types.html', { shopId: param.addShopId})
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("=====shopVenuesTypeData======", res.data)
        let venuesTypeList = res.data.relateObj.result
        that.setData({ venuesTypeList: venuesTypeList })
        console.log("=====that.data.venuesTypeList======", that.data.venuesTypeList)
        if (venuesTypeList.length != 0) {
          let selectVenuesData = that.data.selectVenuesData
          selectVenuesData.venuesTypeData = { index: 0, data: that.data.venuesTypeList[0] }
          selectVenuesData.venuesCelleData = { index: 0, data: that.data.venuesTypeList[0].venues[0] }
          that.setData({ selectVenuesData: selectVenuesData })
          that.getNextSevenDays();
        }
        wx.hideLoading()
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
    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data, 'post')
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
          shopProList: that.data.shopProList
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
  postCarItemJson: {
    shopId: '',
    orderType: ''
  },
  //items:[{productId:1,caratesianId:0,count:1}]
  createOrder: function () {
    if (!app.checkShopOpenTime()) {
      return
    }
    if (!app.checkIfLogin()) {
      return
    }

    console.log(this.data.pushItem)
    let pushItem = this.data.pushItem
    let postParam = { postCarItemJson: { items: [] } }
    for (let i = 0; i < pushItem.length; i++) {
      let item = {
        productId: '',
        caratesianId: '0',
        count: ''
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
  creatOrder_buyNow: function (data) {
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
        if (res.data.errcode == '10001') {
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
            that.setData({ pushItem: [] })
            that.setData({ showType: false })
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
        that.setData({ showGuigeType: false })
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
    let productData = this.data.shopProList
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
    var that = this
    if (!app.setting) {
      console.log('-------------hasNoneSetting-----------')
      app.getSetting(that)
    } else {
      console.log('-------------hasSetting-----------')
      that.setData({ setting: app.setting })
      console.log(that.data.setting)
    }

    that.params.belongShop = options.addShopId;
    let belongShopId = 'belongShopId_' + options.addShopId
    that.getParac("index");
    that.getParac();
    if (app.cart_offline[belongShopId]) {
      that.setData({ pushItem: app.cart_offline[belongShopId] })
    }else{
      that.setData({ pushItem: []})
    }
    console.log("app.cart_offline", app.cart_offline)
    that.params.shopProductType = 0;
    that.getShopTypeData(options);
    that.getShopVenuesTypeData(options);
    let sendIndexData = JSON.stringify({ title: 'noTitle', url: "shop", params: { pageObjectId: that.params.belongShop, pageObjectType: 9} })
    that.setData({ sendIndexData: sendIndexData })
    let sendShopData = JSON.stringify({ title: 'noTitle', url: "shop_" + that.params.belongShop })
    that.setData({ sendShopData: sendShopData })
  },
  getParac: function (type) {
    var that = this;
    let customIndex;
    if (type == "index") {
      customIndex = app.AddClientUrl("/custom_page_shop.html", {}, 'get', '1')
     }else{
      customIndex = app.AddClientUrl("/custom_page_shop_" + this.params.belongShop + ".html", {}, 'get', '1')
     }
    //拿custom_page
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("====== res.data=========", res.data)
        wx.hideLoading()
        if (!res.data.errcode || res.data.errcode == '0') {
          if(type=="index"){
            that.setData({ componentIndexState: true})
          }else{
            that.setData({ componentState: true })
          }
        } else {
          console.log('加载失败')
          if (type == "index") {
            that.setData({ componentIndexState: false })
          } else {
            that.setData({ componentState: false })
          }
        }
      },
      fail: function (res) {
        console.log(res)
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '加载失败，点击【确定】重新加载',
          success: function (res) {

            if (res.confirm) {
              that.getParac()
            } else if (res.cancel) {
              app.toIndex()
            }
          }
        })
      }
    })
  },
  setCartInProduct: function () {
    console.log('====setCartInProduct.shopProList=====', this.data.shopProList)
    console.log('====setCartInProduct.pushItem=====', this.data.pushItem)
    let productData = this.data.shopProList
    let pushItem = this.data.pushItem
    if (productData!=null){
      for (let j = 0; j < productData.length; j++) {
        productData[j].inCarCount = 0
      }
      for (let i = 0; i < pushItem.length; i++) {
        for (let j = 0; j < productData.length; j++) {
          if (pushItem[i].id == productData[j].id) {

            productData[j].inCarCount += pushItem[i].count_offline
          }
        }
      }
      this.setData({ shopProList: productData })
    }
    if (pushItem.length!==0){
      this.getPriceAndCount()
    }
    this.setAppCart();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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


    // this.listPage.page = 1
    // this.params.page = 1
    // this.getData(this.params, 2)

    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
  /* 分享 */
  onShareAppMessage: function (res) {
      // 分享页面
    let userId = "";
    //console.log("app.loginUser.platformUser", app.loginUser.platformUser.id)
    if (app.loginUser && app.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
    }
   // console.log("app.loginUser.platformUser", app.loginUser.platformUser.id)
    // path=pageTab%2findex%2findex%3fAPPLY_SERVER_CHANNEL_CODE%3d'
    let postParam = {}
    postParam.belongShop = this.params.belongShop;
    postParam.shopName = this.data.shopInfo.shopName;
    postParam.scene = userId
     
    console.log("分享页面", postParam)
   return app.shareForFx2(app.miniIndexPage, postParam.shopName, postParam)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom2: function () {
    var that = this
    console.log("=======bottom======",this.data.canRefresh)
    if (this.data.canRefresh) {
      this.setData({ canRefresh: false })
      setTimeout(function () {
        if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
          that.listPage.page++
          that.params.page++
          that.getShopListData(that.params);
        }
      }, 300);
    }

  },

})