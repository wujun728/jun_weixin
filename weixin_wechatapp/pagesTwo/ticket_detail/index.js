var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    setting: null, // setting 
    productData: null, // 商品数据 
    cart: null,
    countGood: 0,
    sysWidth: 320,//图片大小
    showCount: false,
    saleStrategyState: false,
    measuresState: false,
    positionState: false,
    attrsState: false,
    byNowParams: {},
    targs: [],
    posterState: false,
    pintuanPopupState: false,
    proId: '',
    shopId: '',
    bindway: 'cart',  //点击的是加入购物车或者立即购买
    showState: 0,
    commitList: [],
    measurementJson: null,
    qrCodeUrl: "",
    haveMeasuresState: false,
    selectTypeData: null,
    swiperIndex: 1,
    totalImg: 0,
    pintuanId: 0,
    pintuanState: false,
    promotionState: false,
    pintuanListData: [],
    color: '',
    secondColor: "",
    clientNo: '',
    minCount: '1',
    sendIndexData: {},
    buyType: 'normal'
  },

  /* 删除收藏 */
  removeFavourite: function (e) {
    var that = this
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    var postData = {
      itemId: '',
      favoriteType: '1'
    }
    let productData = this.data.productData

    postData.itemId = e.currentTarget.dataset.itemid

    var customIndex = app.AddClientUrl("/remove_favorite.html", postData, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          productData.productInfo.favorite = 0
          that.setData({ productData: productData })
          wx.showToast({
            title: '已取消收藏！',
            image: '/images/icons/tip.png',
            duration: 1000
          })
          console.log('000---' + that.data.productData.productInfo.favorite)
        }
      },
      fail: function (res) {

        app.loadFail()
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  /* 加入收藏 */
  addToFavourite: function (e) {
    var that = this
    var postData = {
      itemId: '',
      favoriteType: '1'
    }
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    let productData = this.data.productData

    postData.itemId = e.currentTarget.dataset.itemid
    console.log(postData)

    var customIndex = app.AddClientUrl("/add_to_favorite.html", postData, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          productData.productInfo.favorite = 1
          that.setData({ productData: productData })
          wx.showToast({
            title: '已收藏！',
            icon: 'success',
            duration: 1000
          })
          console.log('111---' + that.data.productData.productInfo.favorite)
        }

      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  // 定位
  clickCatch: function (e) {
    console.log(this.data.productData.productInfo)
    let latitude = this.data.productData.productInfo.latitude;
    let longitude = this.data.productData.productInfo.longitude;
    let name = this.data.productData.productInfo.name;
    let address = this.data.productData.productInfo.location;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 12,
      name: name,
      address: address
    })
  },
  getData: function (options) {
    let param = {}
    let that = this
    if (!options) {
      param = that.dataFOr_getData
    } else {
      param = options
    }
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    console.log('==param===', param)
    let postParam = {}
    postParam.productId = param.id || param.productId
    postParam.addShopId = param.addShopId||236
    let customIndex = app.AddClientUrl("/product_detail.html", postParam)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res)
        if (res.data.productInfo.errcode == -1) {
          wx.showToast({
            title: res.data.productInfo.relateObj,
            image: '/images/icons/tip.png',
            duration: 1000
          })
          return
        }
        that.setData({ pintuanState: false })
        console.log('--------------getData-------------')
        res.data.productInfo.promotion = Number(res.data.productInfo.promotion)
        if (res.data.productInfo && res.data.productInfo.promotionBean) {
          that.setData({ promotionState: true })
          if (res.data.productInfo.promotionBean.promotionStatus == 2) {
            that.setData({ color: '#888', secondColor: '#fff' })
          }
        }
        if (res.data.images) {
          that.setData({ totalImg: res.data.images.length })
        }
        if (res.data.productInfo && res.data.productInfo.tags) {
          let tagsStr = res.data.productInfo.tags
          let tagsStr2 = tagsStr.replace(/\[/g, '');
          let tagArr = tagsStr2.split(']')
          tagArr.length--;
          that.setData({
            targs: tagArr
          })
          console.log('targs', that.data.targs)
        }
        if (res.data.productInfo.tagPrice > res.data.productInfo.price) {
          let discount = ((Number(res.data.productInfo.price) / Number(res.data.productInfo.tagPrice)) * 10).toFixed(1);
          res.data.productInfo.discount = discount
        }
        that.setData({ productData: res.data })
        if (res.data.description && res.data.description.description) {
          WxParse.wxParse('article', 'html', res.data.description.description, that, 10);
          console.log('====article====', that.data.article)
        }
        if (res.data.productInfo.saleStrategy && res.data.productInfo.saleStrategy != 0) {
          that.setData({ saleStrategyState: true })
          console.log('====saleStrategyState====', that.data.saleStrategyState)
        }
        if (res.data.measuresState && res.data.measuresState.length != 0) {
          that.setData({ measuresState: true })
          console.log('====measuresState====', that.data.measuresState)
        }
        if (res.data.productInfo.latitude && res.data.productInfo.latitude != 0) {
          that.setData({ positionState: true })
          console.log('====positionState====', that.data.positionState)
        }
        if (res.data.attrs && res.data.attrs.length != 0) {
          that.setData({ attrsState: true })
          console.log('====attrsState====', that.data.attrsState)
        }
        if (!!res.data.productInfo) {
          let info = res.data.productInfo
          let postPatam = {}
          //var paramStr = 'page=1&productId=' + info.productId+'&shopId=' + info.belongShopId
          postPatam.page = 1
          postPatam.productId = info.productId
          postPatam.shopId = info.belongShopId
        }
        console.log('productData', that.data.productData)
      },
      fail: function (res) {
        console.log("====fail=====")
        app.loadFail()
      },
      complete: function (res) {
        wx.hideLoading()
      },
    })
  },
  dataFOr_getData: {
    id: '',
    addShopId: ''
  }, 

  readyPay2: function (e) {
    console.log('====e=====', e)
    if (!app.checkIfLogin()) {
      return
    }
    if (this.data.productData.productInfo.promotionBean && this.data.productData.productInfo.promotionBean.promotionStatus == 2) {
      console.log('活动已结束！')
      wx.showToast({
        title: '活动已结束！',
        image: '/images/icons/tip.png',
        duration: 1000
      })
      return
    }
    let productData = this.data.productData
    let way;
    let pintuanRecordId;
    console.log(productData)
    if (e.currentTarget.dataset.way) {
      way = e.currentTarget.dataset.way
      pintuanRecordId = e.currentTarget.dataset.pintuanid
    } else {
      way = e.detail.data.way
      pintuanRecordId = e.detail.data.pintuanid
    }
    this.setData({ bindway: way })
    console.log('====q=====', this.data.bindway)
    let info = productData.productInfo
    this.byNowParams.productId = info.productId
    this.byNowParams.shopId = info.belongShopId
    this.setData({ byNowParams: this.byNowParams })
    if (way == 'cart') {
      if (productData.measures.length == 0) {
        this.addtocart()
      } else {
        this.setData({ showCount: true })
        this.byNowParams.orderType = 0
        this.setData({ byNowParams: this.byNowParams })
        this.chooseMeasureItem()
      }
    } else if (way == 'pintuanOne') {//单独购买
      this.setData({ showCount: true })
      this.byNowParams.orderType = 0
      this.pintuanParams.pintuanCreateType = 0
      this.pintuanParams.pintuanRecordId = 0
      this.setData({ byNowParams: this.byNowParams, pintuanParams: this.pintuanParams })
      this.chooseMeasureItem()
    } else if (way == 'pintuanMore') {//参加拼团
      this.setData({ showCount: true })
      this.byNowParams.orderType = 0
      this.pintuanParams.pintuanCreateType = 1
      this.pintuanParams.pintuanRecordId = 0
      this.setData({ byNowParams: this.byNowParams, pintuanParams: this.pintuanParams })
      this.chooseMeasureItem()
    } else if (way == 'addPintuan') {//发起拼单
      this.setData({ showCount: true })
      this.setData({ pintuanPopupState: false })
      this.byNowParams.orderType = 0
      this.pintuanParams.pintuanCreateType = 2
      this.pintuanParams.pintuanRecordId = pintuanRecordId
      this.setData({ byNowParams: this.byNowParams, pintuanParams: this.pintuanParams })
      this.chooseMeasureItem()
    } else if (way == 'select') {
      this.setData({ showCount: true })
      this.byNowParams.orderType = 0
      this.setData({ byNowParams: this.byNowParams })
      this.chooseMeasureItem()
    } else {
      this.setData({ showCount: true })
      this.byNowParams.orderType = 0
      this.setData({ byNowParams: this.byNowParams })
      this.chooseMeasureItem()
    }
  },
  closeZhezhao: function () {
    this.setData({ showCount: false })
  },
  subNum: function () {
    if (this.data.measurementJson.id) {
      this.setData({ minCount: this.data.measurementJson.minSaleCount })
    } else {
      this.setData({ minCount: 1 })
    }
    if (this.byNowParams.itemCount == this.data.minCount) {
      return
    }
    this.byNowParams.itemCount--;
    this.setData({ byNowParams: this.byNowParams })
  },
  addNum: function () {
    this.byNowParams.itemCount++;
    this.setData({ byNowParams: this.byNowParams })
  },
  byNowParams: {
    productId: '',
    itemCount: 1,
    shopId: '',
    cartesianId: '0',
    fromSource: 'mini',
    orderType: '',
  },
  pintuanParams: {
    pintuanCreateType: 0,
    pintuanRecordId: 0
  },
  /* 立即购买 */
  buyNow: function (e) {
    if (!app.checkShopOpenTime()) {
      return
    }

    if (!app.checkIfLogin()) {
      return
    }
    let bindway;
    if (e.currentTarget.dataset.way) {
      bindway = e.currentTarget.dataset.way
    } else {
      bindway = this.data.bindway
    }
    console.log('=======bindway======', bindway)

    if (bindway == 'cart') {
      this.setData({ haveMeasuresState: true })
      this.setData({ selectTypeData: this.data.selectTypeData })
      console.log('-----------addtocart----------')
      this.addtocart()
    } else if (bindway == 'pintuanOne') {
      this.setData({ haveMeasuresState: true })
      this.setData({ selectTypeData: this.data.selectTypeData })
      console.log('-----------addtocart----------')
      this.createOrder22(this.byNowParams)
    } else if (bindway == 'pintuanMore') {
      this.setData({ haveMeasuresState: true })
      this.setData({ selectTypeData: this.data.selectTypeData })
      console.log('-----------addtocart----------')
      this.createOrder22(this.byNowParams)
    } else if (bindway == 'addPintuan') {
      this.setData({ haveMeasuresState: true })
      this.setData({ selectTypeData: this.data.selectTypeData })
      console.log('-----------addtocart----------')
      this.createOrder22(this.byNowParams)
    } else {
      console.log('-----------buyNow----------')
      this.createOrder22(this.byNowParams)
    }


  },
  /* 创建订单 */
  createOrder22: function (o) {
    console.log('========createOrder22======', o);
    let that = this;
    let productInfo = that.data.productData.productInfo
    let params = Object.assign({}, params, that.byNowParams, that.pintuanParams)
    if (productInfo.preOrderCustomFormId) {
      let url;
      if (that.byNowParams.cartesianId) {
        url = '/pages/form_detail/index?customFormId=' + productInfo.preOrderCustomFormId + '&productId=' + productInfo.productId + '&params=' + JSON.stringify(params);
      } else {
        url = '/pages/form_detail/index?customFormId=' + productInfo.preOrderCustomFormId + '&productId=' + productInfo.productId;
      }
      wx.navigateTo({
        url: url,
      })
      return
    } else {
      // wx.showLoading({
      //   title: 'loading',
      //   mask: true
      // })
      app.showToastLoading('loading', true)
      app.createOrder(that.byNowParams, that.pintuanParams)
    }
  },

  postParams: function (data) {
    var that = this
    var customIndex = app.AddClientUrl("/change_shopping_car_item.html", data, 'post')
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('---------------change_shopping_car_item-----------------')
        console.log(res.data)
        wx.hideLoading()

        if (that.data.bindway == 'cart') {
          that.setData({ showCount: false })
        }

        if (data.productId == 0) {
          console.log('购物车里面的商品数量')
          that.setData({
            countGood: res.data.totalCarItemCount
          })
        } else {
          if (res.data.productId && res.data.productId != 0) {
            if (data.count == 0) {
              console.log('通过加入购物车来确定购物车里面的商品数量')
            } else {
              wx.showToast({
                title: '加入购物车成功',
              })
            }

            if (!!res.data.totalCarItemCount || res.data.totalCarItemCount == 0) {
              that.setData({ countGood: res.data.totalCarItemCount })
            }
          } else {
            wx.showToast({
              title: res.data.errMsg,
              image: '/images/icons/tip.png',
              duration: 2000
            })
          }
        }
        try {
          app.carChangeNotify(res.data);
        } catch (e) { }

      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
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

      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  //获取规格价格参数
  get_measure_cartesion: function () {
    console.log('get_measure_cartesion')
    this.setData({ measurementJson: { waitDataState: false } })
    let productId = this.data.productData.productInfo.productId
    let postStr = ''
    if (this.MeasureParams.length == 0) {
      this.byNowParams.cartesianId = '0'
      this.setData({ measurementJson: { waitDataState: true } })//没有规格时 不需要等待请求
      return
    }
    for (let i = 0; i < this.MeasureParams.length; i++) {
      postStr += this.MeasureParams[i].value + ','
    }
    let param = {}
    param.productId = productId
    param.measureIds = postStr
    console.log(postStr)
    let customIndex = app.AddClientUrl("/get_measure_cartesion.html", param)
    var that = this
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        that.byNowParams.cartesianId = res.data.id
        that.setData({
          measurementJson: res.data
        })
        that.data.measurementJson.waitDataState = true
        that.setData({ measurementJson: that.data.measurementJson })
        that.byNowParams.itemCount = that.data.measurementJson.minSaleCount
        that.setData({ byNowParams: that.byNowParams })
        that.setData({ minCount: that.byNowParams.itemCount })
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
    console.log('----------初始化规格参数-----------', event)
    let productData = this.data.productData
    let focusProduct = productData
    let selectTypeData = []
    for (let i = 0; i < focusProduct.measures.length; i++) {
      focusProduct.measures[i].checkedMeasureItem = 0
      //初始化选择的数据
      let param = {}
      let selectTypeDataItem = {}
      param.name = focusProduct.measures[i].name
      param.value = focusProduct.measures[i].productAssignMeasure[0].id
      selectTypeDataItem.type = focusProduct.measures[i].name
      selectTypeDataItem.value = focusProduct.measures[i].productAssignMeasure[0].measureName
      console.log('=====param=====', param)
      this.MeasureParams.push(param)
      selectTypeData.push(selectTypeDataItem)
    }
    this.data.selectTypeData = selectTypeData

    console.log('====that.data.selectTypeData======', this.data.selectTypeData)
    this.setData({
      productData: focusProduct
    })
    console.log('===MeasureParams====', this.MeasureParams)
    this.get_measure_cartesion()
  },
  //选择规格小巷的---显示
  radioChange: function (e) {
    let that = this
    let flag = false;
    console.log("====radioChange=====", e)
    console.log('====that.data.selectTypeData======', that.data.selectTypeData)
    if (that.data.selectTypeData) {
      console.log('1111111')
      for (let i = 0; i < that.data.selectTypeData.length; i++) {
        if (e.currentTarget.dataset.type == that.data.selectTypeData[i].type) {
          that.data.selectTypeData.splice(i, 1, e.currentTarget.dataset)
          flag = true;
        }
      }
      if (!flag) {
        that.data.selectTypeData.splice(that.data.selectTypeData.length, 1, e.currentTarget.dataset)
        flag = false;
      }
    } else {
      console.log('222222')
      that.data.selectTypeData = [];
      that.data.selectTypeData.splice(0, 1, e.currentTarget.dataset)
      that.setData({ selectTypeData: that.data.selectTypeData })
    }
    console.log('====that.data.selectTypeData======', that.data.selectTypeData)
    let index = e.currentTarget.dataset.index
    let indexJson = app.getSpaceStr(index, '-')
    //console.log(indexJson)
    let focusItem = that.data.productData
    focusItem.measures[indexJson.str1].checkedMeasureItem = indexJson.str2
    that.setData({ productData: focusItem })
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
  /**
   * 生命周期函数--监听页面加载
   */
  getPintuanData: function (productId, promotionId) {
    let that = this;
    let data = {
      status: 1,
      productId: productId,
      promotionId: promotionId
    }
    that.setData({ pintuanParam: data })
    var pintuanUrl = app.AddClientUrl("/wx_find_pintuan_records.html", data, 'post')
    wx.request({
      url: pintuanUrl.url,
      data: pintuanUrl.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log('--------add----------')
        console.log(res.data)
        that.setData({ pintuanListData: res.data.relateObj.result })
        if (that.data.pintuanListData.length == 1) {
          that.setData({ visiblePintuanNum: 1 })
        } else {
          that.setData({ visiblePintuanNum: 2 })
        }

      },
      fail: function (res) {
        app.loadFail()
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('--------product----------', options)
    let that = this;
    that.setData({
      proId: options.id || options.productId,
      shopId: options.addShopId||236,
      clientNo: app.clientNo,
      color: app.setting.platformSetting.defaultColor,
      secondColor: app.setting.platformSetting.secondColor
    });
    let sendIndexData = JSON.stringify({ title: 'noTitle', url: "productdetail", params: { pageObjectId: options.id || options.productId } })
    that.setData({ sendIndexData: sendIndexData })
    let sendProductData = JSON.stringify({ title: 'noTitle', url: "product_detail_" + (options.id || options.productId) })
    that.setData({ sendProductData: sendProductData })
    console.log("商品id和店铺id", options)
    that.dataFOr_getData.id = options.id || options.productId
    that.dataFOr_getData.addShopId = options.addShopId||236
    that.setData({ dataFOr_getData: that.dataFOr_getData })
    that.getData(options)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    that.setData({ setting: app.setting, loginUser: app.loginUser })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===onReachBottom====')
    
  }
})