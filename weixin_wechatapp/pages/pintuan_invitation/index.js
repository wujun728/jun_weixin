  
var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    setting: null, // setting 
    pintuanData:null,
    productData:null,
  },
  subNum: function () {
    if (this.byNowParams.itemCount == 1) {
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
    chatOrder: '',
    fromSource: '',
    orderType: '',
    pintuanCreateType: 0,
    pintuanRecordId: 0
  },
  MeasureParams: [],
  toIndex:function(){
    app.toIndex()
  },
  getPintuanDetail: function () {
    let that = this
    let getParams = {}
    getParams.pintuanRecordId = that.data.pintuanRecordId;
    let customIndex = app.AddClientUrl("/get_pintuan_record_detail.html", getParams)
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------orderDetail--------')
        console.log(res.data)
        let productData = res.data.relateObj.productBean;
        productData.promotionBean = res.data.relateObj.promotionBean
        productData.promotionBean.pintuanStrategy = res.data.relateObj.pintuanStrategyBean
        that.setData({ pintuanData: res.data.relateObj })
        that.setData({ productData: productData })
        console.log("===productData===", that.data.productData)
        wx.hideLoading()
      },
      fail: function (res) {
        that.setData({ pintuanData: null})
        wx.hideLoading()
        app.loadFail()
      },
      complete: function () {
        console.log('=====fail====')
      },
    })
  },
  closeZhezhao: function () {
    this.setData({ showCount: false })
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
    if (bindway == 'addPintuan') {
      this.setData({ haveMeasuresState: true })
      this.setData({ selectTypeData: this.data.selectTypeData })
      console.log('-----------addtocart----------')
      this.createOrder22(this.byNowParams)
    }

  },
  /* 创建订单 */
  createOrder22: function (o) {
    var customIndex = app.AddClientUrl("/buy_now.html", o, 'post')
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
        console.log("点击确定后内容", res.data)
        let data = res.data
        if (!!res.data.orderNo) {
          wx.hideLoading()

          wx.navigateTo({
            url: '/pages/edit_order/index?orderNo=' + res.data.orderNo,
          })
        } else {
          wx.hideLoading()
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
      },
      complete: function (res) {

      }
    })
  },
  readyPay2: function (e) {
    console.log('====e=====', e)
    if (!app.checkIfLogin()) {
      return
    }
    let way;
    if (e.currentTarget.dataset.way) {
      way = e.currentTarget.dataset.way
    } else {
      way = e.detail.data.way
    }
    this.setData({ bindway: way })
    this.setData({ showCount: true })
    this.byNowParams.productId = this.data.productData.id
    this.byNowParams.shopId = this.data.productData.belongShopId
    this.setData({ byNowParams: this.byNowParams })
    if (way == 'addPintuan') {
      this.byNowParams.pintuanCreateType = 2
      this.byNowParams.orderType = 0
      this.byNowParams.pintuanRecordId = this.data.pintuanData.id
      this.chooseMeasureItem()
    } 
  },
  /* 初始化 选规格 */
  chooseMeasureItem: function (event) {
    console.log('----------初始化规格参数-----------', event)
    let productData = this.data.productData
    if (!this.data.productData.measureTypes) {
      this.data.productData.measureTypes = []
      this.setData({
        productData: this.data.productData
      })
    }
    let focusProduct = productData
    let selectTypeData = [];
    
    for (let i = 0; i < focusProduct.measureTypes.length; i++) {
      focusProduct.measureTypes[i].checkedMeasureItem = 0
      //初始化选择的数据
      let param = {}
      let selectTypeDataItem = {}
      param.name = focusProduct.measureTypes[i].name
      param.value = focusProduct.measureTypes[i].productAssignMeasure[0].id
      selectTypeDataItem.type = focusProduct.measureTypes[i].name
      selectTypeDataItem.value = focusProduct.measureTypes[i].productAssignMeasure[0].measureName
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
    console.log("-----",indexJson)
    let focusItem = that.data.productData
    focusItem.measureTypes[indexJson.str1].checkedMeasureItem = indexJson.str2
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
  //获取规格价格参数
  get_measure_cartesion: function () {

    this.setData({ measurementJson: { waitDataState: false } })
    let productId = this.data.productData.id
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
        that.data.byNowParams.itemCount = that.data.measurementJson.minSaleCount
        that.setData({ byNowParams: that.data.byNowParams })
      },
      fail: function (res) {
        console.log("fail")
        app.loadFail()
      },
      complete: function () {
      },
    })
  },

  loginSuccess: function (user) {
    console.log("pre apply mendian login success call back!", user);
    this.getPintuanDetail();
  },
  loginFailed: function (err) {
    console.log("login failed!!");
    wx.showToast({
      title: '登录失败',
      image: '/images/icons/tip.png',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('--------product----------', options)
    let that = this;
    that.setData({ setting: app.setting })
    that.setData({
      pintuanRecordId: options.pintuanRecordId
    });
    if (app.loginUser) {
      that.getPintuanDetail();
    } else {
      console.log('======111222333======')
      app.addLoginListener(that);
    }
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
    wx.stopPullDownRefresh()
    if (app.loginUser) {
      this.getPintuanDetail();
    } else {
      console.log('======111222333======')
      app.addLoginListener(this);
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function (res) {
      console.log(res)
      let id = this.data.pintuanData.id;

      let shareName = '拼团活动'

      let shareParams = 'pintuanRecordId=' + id

      console.log("shareParams", shareParams)

      return app.sharePintuan('pintuan_invitation', shareName, shareParams)

  },
})