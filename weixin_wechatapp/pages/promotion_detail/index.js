// pages/richText/index.js

var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    promotionData:null,
    sendIndexData: "",
///
  },
  attendPromotion:function(e){
    console.log("===attendPromotion===",e)
    let state = e.currentTarget.dataset.state
    let promotionUrl="";
    let title="";
    if (state =="disattend"){
      promotionUrl="/wx_dis_attend_promotion.html",
      title="取消成功"
    }else{
      promotionUrl = "/wx_attend_promotion.html"
      title = "参加成功"
    }
    let param = this.opt
    let customIndex = app.AddClientUrl(promotionUrl, param, 'get')
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == 0) {
          wx.showToast({
            title: title,
            icon: "success",
            duration: 2000
          })
        }else{
          wx.showToast({
            title: res.data.errMsg,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        app.loadFail()
      }
    })
  },
  getData:function(b){
    var that= this
    var param = { promotionId: b.promotionId}
    var customIndex = app.AddClientUrl("/get_promotions_detail.html", param, 'get')
    wx.request({
      url: customIndex.url,      
      header: app.header,
      success: function (res) {
        console.log(res)
        console.log(res.data)    
        if (res.data.errcode =="-1"){
          wx.showToast({
            title: res.data.errMessage,
            image: '/images/icons/tip.png',
            duration: 2000
          })
        }    
       else{
          that.setData({ promotionData: res.data.relateObj})
          if (res.data.relateObj.name) {
            wx.setNavigationBarTitle({
              title: res.data.relateObj.name,
            })
          }
           if (res.data.relateObj.content) {
            WxParse.wxParse('article', 'html', res.data.relateObj.content, that, 10);
          }
       } 
      },
      fail: function (res) {
        app.loadFail()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  opt: null,
  onLoad: function (options) {
    let that=this;
    that.opt = options
    console.log("===options===", options)
    that.setData({setting:app.setting})
    let sendIndexData = JSON.stringify({ title: 'noTitle', url: "promotion_detail", params: { pageObjectId: options.promotionId } })
    that.setData({ sendIndexData: sendIndexData })
    let sendPromotionData = JSON.stringify({ title: 'noTitle', url: "promotion_detail_" + options.promotionId })
    that.setData({ sendPromotionData: sendPromotionData })
    // let navName = options.navName
    // if (navName) {
    //   wx.setNavigationBarTitle({
    //     title: navName,
    //   })
    // }

    // let that = this
    // let richTextHtml = app.richTextHtml
    // WxParse.wxParse('article', 'html', richTextHtml, that, 10);
    that.getData(options)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShareAppMessage: function () {
    let that = this
    let params = that.opt
    console.log('params:' + params)
    return app.shareForFx2('promotion_detail', '', params)
  }
})