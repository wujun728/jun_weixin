const app = getApp()
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    promotionInfo:{},
    posterState:false,
    productId:0,
    shopId:0,
    promotionState:false,
    showIndex:0,
  },
  params:{
    belongShop: "",
    page: 1,
    productName: "",
    startPrice: "",
    endPrice: "",
    promotionId: "",
  },
  shareBtn: function (e) {
    let that = this;
    console.log('====e====', e);
    let index = e.currentTarget.dataset.id
    that.setData({ showIndex: index })
  },
  // 开启活动海报
  shareProductPoster: function (event) {
    console.log('====shareProductPoster====', event)
    this.setData({ showIndex: 0 })
    this.setData({ posterState: true })
    this.setData({ productId: event.currentTarget.dataset.id })
    let data = { type: event.currentTarget.dataset.type, id: event.currentTarget.dataset.id }
    let qrCodeUrl = app.getQrCode(data)
    console.log('qrCodeUrl===', qrCodeUrl)
    this.setData({
      qrCodeUrl: qrCodeUrl
    })
  },
  shareProductPages: function (event) {
    console.log('====shareProductPages====', event)
  },
  getChilrenPoster: function () {
    console.log('colsePoster')
    this.setData({ posterState: false })
  },
  toProductDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    // product_detail.html?productId= 9219;
    var a = "product_detail.html?productId=" + e.currentTarget.dataset.id;
    app.linkEvent(a);
  },
  /* 获取数据 */
  getProductData: function (param) {
    let that = this;
    param.promotionId = this.data.id
    let customIndex = app.AddClientUrl("/more_product_list.html", param, 'get')
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        that.setData({ reqState: true })
        console.log("特卖数据", res.data)
        that.params.pageSize = res.data.pageSize
        that.params.totalSize = res.data.totalSize
        let productList = res.data.result;
        if (!productList){ productList=[]}
        // for(let i=0;i<productList.length;i++){
        //   productList[i].stockPercent = Math.floor((productList[i].totalStock - productList[i].stock) / (productList[i].totalStock) * 100)
        // }
        if (that.params.page == 1){
          that.setData({ productData: productList})
        }else{
          that.setData({ productData: that.data.productData.concat(productList)})
        }
        console.log('that.data.productData', that.data.productData)
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '加载失败，点击【确定】重新加载',
          success: function (res) {
            console.log('', res)
            if (res.confirm) {
              that.getProductData(that.params, 1);
            } else if (res.cancel) {
              app.toIndex()
            }
          }
        })
      }
    })
  },
  getPromotionInfo: function (param){
    let that = this
    param.promotionId = this.data.id
    let customIndex = app.AddClientUrl("/get_promotions_detail.html", param, 'get')
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("getPromotionInfo", res)
        let promotionInfo = res.data.relateObj;
        let nowData = new Date();
        let promotionState=false;
        let startTime = promotionInfo.startDate;
        startTime = startTime.replace(/\-/g, "/");
        startTime = new Date(startTime);
        if (startTime >= nowData) {
          console.log('活动未开始')
          promotionState = false;
          promotionInfo['promotionStartDate'] = {
            startTime: promotionInfo.startDate,
            background: '#fff',
            color: that.data.setting.defaultColor,
            fontSize: 26
          };
          if (promotionInfo.content) {
            WxParse.wxParse('article', 'html', promotionInfo.content, that);
          }
        } else {
          console.log('活动已开始')
          promotionState=true
          promotionInfo['promotionEndDate'] = {
            endTime: promotionInfo.endDate,
            background: '#fff',
            color: that.data.setting.defaultColor, 
            fontSize: 26
          };
        }
        that.setData({ promotionInfo: promotionInfo })
        that.setData({ promotionState: promotionState })
        console.log('promotionInfo', that.data.promotionInfo)
        wx.hideLoading()
      },
      fail: function (res) {
        console.log("fail")
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("hahahahahahah这是id", options)
    this.setData({ 
      id: options.promotionId,
      setting: app.setting.platformSetting,
      shopId: app.setting.platformSetting.defaultShopBean.id
    })
    console.log("setting", this.data.setting)
    this.getProductData(this.params)
    this.getPromotionInfo(this.params)
  },

  onReady: function () {
    
  },

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
  // 分享
  onShareAppMessage: function (res) {
    console.log('onShareAppMessage=====',res)
    if (res.from == "button") {
      console.log(res)
      // 商品id
      let id = res.target.dataset.item.id
      let focusData = res.target.dataset.item
      if (!focusData.brandName || focusData.brandName == "") {
        focusData.brandName = ""
      };
      let imageUrl = focusData.imagePath

      let shareName = '活动价：￥' + focusData.price + '(原价：￥' + focusData.tagPrice + ')' + focusData.brandName + focusData.name;
      let shareParams = {}
      shareParams.productName = focusData.name
      console.log('nnnnnnnnnn' + shareName)
      shareParams.id = id
      console.log("shareParams", shareParams)
      return app.shareForFx2('promotion_products', shareName, shareParams, imageUrl)
    }else {
      let that = this;
      let promotionInfo = that.data.promotionInfo
      console.log('promotionInfo:', promotionInfo)
      let title = promotionInfo.name;
      let id = promotionInfo.id;
      let banner = promotionInfo.promotionBanner;
      let params = {};
      params.promotionId = id;
      params.title = title;
      params.SHARE_PROMOTION_PRODUCTS_PAGE = id
      console.log('params:' + JSON.stringify(params))
      return app.shareForFx2('promotion_products', '', params, banner)

    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    let that=this
    that.params.page=1
    that.getProductData(that.params)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
    var that = this
    if (that.params.totalSize > that.params.page * that.params.pageSize) {
      // wx.showLoading({
      //   title:'加载中...'
      // })
      app.showToastLoading('加载中...', true)
      that.params.page++
      // 组件内的事件
      that.getProductData(that.params)
    } else {
      wx.showToast({
        title: '到底了',
        icon: 'success',
        duration: 1000
      })
      console.log('到底了', that.params.page)
    }
  },

})