
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Data: [],
    moneyAmount: 0,
    properties: {},
  },

  /* 获取数据 */
  getData: function () {
    if (!app.checkIfLogin()) {
      return
    }

    var getParams = {}
    getParams.page = this.listPage.page
    var customIndex = app.AddClientUrl("/super_shop_manager_get_manager_servant_account_event.html", getParams, 'post')
    var that = this

    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)

        that.listPage.pageSize = res.data.relateObj.pageSize
        that.listPage.curPage = res.data.relateObj.curPage
        that.listPage.totalSize = res.data.relateObj.totalSize
        let dataArr = that.data.Data
        dataArr = dataArr.concat(res.data.relateObj.result)

        if (!res.data.relateObj.result || res.data.relateObj.result.length == 0) {
          that.setData({ Data: null })
        }
        else {
          that.setData({ Data: dataArr })

        }

      }
    })
  },
  get_mendian_center: function (setting) {
    console.log('-------门店--------')
    let params = {}
    var customIndex = app.AddClientUrl("/super_shop_manager_get_manager_servant_account.html", params, 'post')
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
        if (res.data.errcode == '0') {
          let mendianZhanghu = res.data.relateObj
          //account 账户余额
          that.setData({
            moneyAmount: mendianZhanghu.account
          })

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
  onLoad: function (options) {
    this.getData();
    this.get_mendian_center()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting, properties: app.properties})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.reflesh == 1) {
      this.onPullDownRefresh()
    }
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
    this.data.Data = []

    this.listPage.page = 1
    this.getData();
    this.get_mendian_center()
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
      this.getData();
    }
  },

})