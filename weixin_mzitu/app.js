//app.js
var Network = require("/utils/network.js")
var Constant = require("/utils/constant.js")
App({
  towxml: require('/towxml/index'),
  globalData: {
    userInfo: null,
  },
  onLaunch: function () {
    let that = this
    wx.checkSession({
  　　　　success: function (res) {
    　　　　 console.log("处于登录态");
            that.globalData.userInfo = wx.getStorageSync('userInfo')
            //app.js 和 首页执行顺序导致获取不到用户数据
            if (that.callback) {
              that.callback()
            }
  　　　　},
  　　　　fail: function (res) {
        
  　　　　}
　　})
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})