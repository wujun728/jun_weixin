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
        console.log("getVerificationCode", res.data)
        that.setData({ verificationCodeData: res.data.relateObj })
      },
      complete: function (res) {

      }
    })
  },
  getVerificationResults: function () {
    var that = this
    var customIndex = app.AddClientUrl("/wx_scan_verify.html", that.onloadOpt)
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log("getVerificationResults",res.data)
        that.getVerificationCode();
        if (res.data.errcode==0){
          wx.showToast({
            title: res.data.relateObj,
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showModal({
            title: '错误',
            content: res.data.errMsg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      complete: function (res) {
      }
    })
  },
  repVerificationResults:function(){
    this.tipFun("主人~您确认要核销吗？")
  },
 continueVerificationResults: function () {
   wx.scanCode({
     onlyFromCamera: true,
     success: (scanRes) => {
       console.log("getVerificationCode", scanRes)
       wx.navigateTo({
         url: "/" + scanRes.path
       })
     }
   })
  },
  tipFun:function(data){
    let that=this;
    wx.showModal({
      title: '提示',
      content: data.relateObj||data,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.getVerificationResults()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  setNavColor: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.setting.platformSetting.defaultColor

    })
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
    this.setData({
      platformSetting: app.setting.platformSetting
    })
    this.setNavColor()
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