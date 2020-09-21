// pages/richText/index.js

var WxParse = require('../../wxParse/wxParse.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  opt:null,
  onLoad: function (options) {
    this.opt = options
    let navName = options.navName
    if (navName){
      wx.setNavigationBarTitle({
        title: navName,
      })
    }
    
    let that = this
    let richTextHtml = app.richTextHtml
    WxParse.wxParse('article', 'html', richTextHtml, that, 10);
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
 /*  onShareAppMessage: function () {
    let that = this
    let params = that.opt
    console.log('params:' + params)
    return app.shareForFx2('richText', '', params)
  } */
})