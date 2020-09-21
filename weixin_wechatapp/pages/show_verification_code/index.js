var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verificationCodeData:{},
  },
  getVerificationCode: function () {
    var that = this
    var customIndex = app.AddClientUrl("/wx_get_scan_verify_parameter.html", that.onloadOpt)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("getVerificationCode",res.data)
        if (res.data.errcode==0){
          that.setData({ verificationCodeData: res.data.relateObj })
          that.getEwmCode(res.data.relateObj)
        }else{
          wx.showModal({
            title: '错误',
            content: res.data.errMsg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      },
      complete: function (res) {

      }
    })
  },

  getEwmCode: function (data) {
    let that=this;
    let userId = "";
    if (app.loginUser && app.loginUser.platformUser) {
      userId = 'MINI_PLATFORM_USER_ID_' + app.loginUser.platformUser.id
    }
    // + "%26verifyScanType%3d" + that.onloadOpt.verifyScanType + "%26sign%3d" + data.sign + "%26seq%3d" + data.seq + "%26scene%3d" + userId 
    let getUrl = app.AddClientUrl("/super_shop_manager_get_mini_code.html");
    that.setData({ ewmCode: getUrl.url + '&path=pageTab%2findex%2findex%3fVERIFICATION_CODE%3d' + data.verifyScanCode + "%26verifyScanType%3d" + that.onloadOpt.verifyScanType + "%26sign%3d" + data.sign })
    console.log("ewmCode", that.data.ewmCode)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onloadOpt:{},
  onLoad: function (options) {
    let that=this;
    console.log("==options===", options)
    that.onloadOpt = options
    that.getVerificationCode();
  
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