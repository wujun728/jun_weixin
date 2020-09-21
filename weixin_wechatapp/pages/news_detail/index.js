var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Data:null,
    params:{},
    ewmImgUrl:"",
  },
  // 关闭海报
  getChilrenPoster(e) {
    let that = this;
    that.setData({
      posterState: false,
    })
  },
  showPoster: function () {
    let that = this;
    console.log('===showPoster====', that.onloadOpt.id)
    let ewmImgUrl = app.getQrCode({ type: "news_detail", id: that.onloadOpt.id || that.onloadOpt.newsId})
    that.setData({
      posterState: true,
      ewmImgUrl: ewmImgUrl,
    })
  },
  getData:function(e){
    var that = this
    var getParams = {}
    getParams.newsId = e.id||e.newsId
    var customIndex = app.AddClientUrl("/get_news_bbs_detail.html", getParams)
   
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    //拿custom_page
    wx.request({
      url: customIndex.url ,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        WxParse.wxParse('article', 'html', res.data.content, that, 10);
        console.log('===0000=====', that.data.article.nodes);
        // wx.setNavigationBarTitle({
        //   title: res.data.title,
        // })
        that.setData({Data:res.data})
        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onloadOpt:{},
  onLoad: function (options) {
    let that=this;
    that.onloadOpt = options
    that.setData({ params: options,setting:app.setting})
    console.log('options',options)
    let sendIndexData = JSON.stringify({ title: 'noTitle', url: "news", params: { pageObjectId:options.id || options.newsId} })
    that.setData({ sendIndexData: sendIndexData })
    let sendNewsData = JSON.stringify({ title: 'noTitle', url: "news_detail_" + (options.id || options.newsId) })
    that.setData({ sendNewsData: sendNewsData })
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
    let that = this
    let params = that.onloadOpt
    console.log('params:' + params)
    return app.shareForFx2('news_detail', '', params)
  }
})