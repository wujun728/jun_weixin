
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Data: [],
    moneyAmount: 0,
    mendian: null,
    properties:{},
  },
  userRecharge: function () {
    this.setData({ reflesh: 1 })
    wx.navigateTo({
      url: "/pages/tunzhu_tixian/index",
    })
  },
  /* 获取数据 */
  getData: function () {
    if (!app.checkIfLogin()) {
      return
    }

    var getParams = {}
    getParams.page = this.listPage.page
    var customIndex = app.AddClientUrl("/get_mendian_tixian_list_admin_mendian_json.html", getParams)
    var that = this

    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        if(res.data.errcode == 0){
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
      },
      complete: function (res) {

      }
    })
  },
  getMendianInfo: function () {
    console.log('-------门店-1-------')
    let params = {}
    var customIndex = app.AddClientUrl("/ge_manager_mendian_info_admin_mendian_json.html", params, 'post')
    var that = this
    wx.request({
      url: customIndex.url,
      data: customIndex.params,
      header: app.headerPost,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.errcode == '0') {
          let mendian = res.data.relateObj
          mendian = that.dellMoney(mendian)
          //account 账户余额
          that.setData({
            mendian: mendian
          })
        }


      },
      fail: function (res) {
        app.loadFail()
      }
    })
  },
  dellMoney: function (mendian) {
    mendian.account.account = app.toFix(mendian.account.account)
    mendian.totalEarningAmount = app.toFix(mendian.totalEarningAmount)
    mendian.totalTixianAmount = app.toFix(mendian.totalTixianAmount)
    mendian.waitCompleteOrderDistributeAmount = app.toFix(mendian.waitCompleteOrderDistributeAmount)
    return mendian
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.getMendianInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ setting: app.setting, properties: app.properties})
    if (app.properties.alias_yue){
      wx.setNavigationBarTitle({
        title: '账户'+app.properties.alias_yue,
      })
    }
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
    this.getMendianInfo()
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