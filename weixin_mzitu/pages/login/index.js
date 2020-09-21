var Network = require("../../utils/network.js")
var Constant = require("../../utils/constant.js")
Page({
  /**
    * 获取用户
    */
  getUserInfo: function (e) {
    Network.request(
      Constant.BASE_URL.concat("/weChat/config"), function (res) {
        if (res.msg != null) {
          wx.setStorageSync('open', res.msg.value)
        }
      }, function () {

    }, { 'key': 'open' })
    var user = e.detail.userInfo
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        Network.requestLoading(Constant.BASE_URL.concat("/weChat/login"), function (res) {
          user.openid = res.msg.openid
          var app = getApp();
          app.globalData.userInfo = user;
          wx.setStorageSync('userInfo', user)
          Network.request(Constant.BASE_URL.concat("/weChat/save"), function (res) {
            wx.navigateBack({
              delta: 1
            })
          }, function () {

          }, user)
        }, function () {

        }, res)
      }
    }) 
  },
  /**
   * 取消
   */
  cancel:function(){
    wx.navigateBack({
      delta: 1
    })
  }
});