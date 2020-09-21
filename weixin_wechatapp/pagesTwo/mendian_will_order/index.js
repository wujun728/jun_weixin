// pages/fx_users/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List: []
  },
  distributeProfit: function (result) {
    for (let i = 0; i < result.length; i++) {
      result[i].distributeProfitResult = (result[i].distributeProfit * (result[i].itemCount - result[i].backCount) * (app.setting.platformSetting.mendianDistributeProfit) / 100).toFixed(2)
    }
    return result
  },
  get_fx_users: function (options, fresh) {

    let getParam = {}
    getParam.page = this.listPage.page

    var customIndex = app.AddClientUrl("/get_mendian_order_items_admin_mendian_json.html", getParam, 'post')
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
        console.log(res.data)
        if (res.data.errcode == '0'){
          that.listPage.pageSize = res.data.relateObj.pageSize
          that.listPage.curPage = res.data.relateObj.curPage
          that.listPage.totalSize = res.data.relateObj.totalSize
          let result = that.distributeProfit(res.data.relateObj.result)
          let List = that.data.List
          if (fresh) {
            List = []
          }

          if (!result || result.length == 0) {
            that.setData({ List: null })
          } else {
            List = List.concat(result)
            that.setData({ List: List })
          }
        }
        

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
  options: {},
  onLoad: function (options) {
    this.options = options
    this.get_fx_users(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      setting:app.setting
    })
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
    this.data.favouriteList = []

    this.listPage.page = 1
    this.get_fx_users(this.options, 1);

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
    var that = this
    if (that.listPage.totalSize > that.listPage.curPage * that.listPage.pageSize) {
      that.listPage.page++
      this.get_fx_users(this.options);
    }
  },


})