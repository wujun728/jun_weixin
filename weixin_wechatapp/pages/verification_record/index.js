// pages/my_pages/my_jifen/index.js

const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    verificationList: []
  },
  
  

  /* 获取订单列表 */
  getVerificationList: function () {
    var that = this
    var getParam = {}
    getParam.page = that.listPage.page
    var customIndex = app.AddClientUrl("/wx_find_exhause_list.html", getParam)
    
    // wx.showLoading({
    //   title: 'loading'
    // })
    app.showToastLoading('loading', true)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log('-----------get_user_jifen_events--------')
        console.log(res.data)
        that.listPage.pageSize = res.data.relateObj.pageSize
        that.listPage.totalSize = res.data.relateObj.totalSize
        let dataArr = that.data.verificationList
        if ((!res.data.relateObj.result || res.data.relateObj.result.length == 0) || that.listPage.page == 1) {
          dataArr = null;
          that.setData({ verificationList: [] })
        }
        dataArr = (dataArr || []).concat(res.data.relateObj.result)
        that.setData({ verificationList: dataArr })
        if (dataArr) {
          wx.hideToast()
        }
        wx.hideLoading()
        console.log("that.data.verificationList",that.data.verificationList)
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
  onLoad: function (options) {
    this.getVerificationList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting })
    this.setData({ loginUser: app.loginUser })
    console.log(app.setting)
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
    this.data.verificationList = []

    this.listPage.page = 1
    this.getVerificationList();

    wx.stopPullDownRefresh() 
  }, 
  listPage: {
    page: 1,
    pageSize: 0,
    totalSize: 0,
    curpage: 1
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('===onReachBottom====')
    var that = this
    if (that.listPage.totalSize > that.listPage.page * that.listPage.pageSize) {
      that.listPage.page++
      this.getVerificationList();
    }
  },

})