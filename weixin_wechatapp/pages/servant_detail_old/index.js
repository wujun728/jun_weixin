// pageTab/lanHu/success/index.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  servantDetail:{},
  },
  orderServant:function(e){
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },
  getServantDetail: function (params) {
    var customIndex = app.AddClientUrl("/wx_get_servant_detail.html", params, 'post')
    var that = this
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
        wx.hideLoading()
        console.log("==getServantDetail===",res.data)
        if (res.data.errcode == '0') {
          let servantDetail = res.data.relateObj
          if (servantDetail.richText) {
            WxParse.wxParse('article', 'html', servantDetail.richText, that, 10);
            console.log('====article====', that.data.article)
          }
          servantDetail.surname = servantDetail.name.slice(0, 1)
          that.setData({
            servantDetail: servantDetail
          })
          
        } else {
          wx.showModal({
            title: '失败了',
            content: '请求失败了，请下拉刷新！',
          })

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("======servantDetail=====",options);
    if (app.setting.platformSetting.id) {
      this.setData({ platformSetting: app.setting.platformSetting })
      console.log("======platformSetting=====", this.data.platformSetting);
    }
    this.getServantDetail(options);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})