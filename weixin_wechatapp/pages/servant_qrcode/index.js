// pages/fx_qrcode/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: {},
    ewmCode:"",
  },
  getEwmCode: function () {
    let userId = "";
    if (app.loginUser && app.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
    }
    let getUrl = app.AddClientUrl("/super_shop_manager_get_mini_code.html");
    this.setData({ ewmCode: getUrl.url + '?path=pageTab%2findex%2findex%3fAPPLY_SERVANT_CODE%3d' + this.data.code.code+ "%26scene%3d" + userId})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("==options===", options)
    this.setData({ code: options})
    this.getEwmCode()
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


})