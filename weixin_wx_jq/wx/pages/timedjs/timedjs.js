/**
 * The MIT License (MIT)
 * 扇形进度倒计时
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/timedjs/timedjs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CDstart: 0,//调用开启函数
    CDend: 0,//调用立即结束函数  
    CDinit: 0//调用初始化函数
  },
  //倒计时结束通知函数 超时
  bindCDNot: function (e) {
    // 自定义组件触发事件时提供的detail对象
    console.log(e.detail);
  },
  //开启倒计时
  bindCDstart: function () {
    this.setData({ CDstart: this.data.CDstart + 1 })
  },
  //结束倒计时
  bindCDend: function () {
    this.setData({ CDend: this.data.CDend + 1 })
  },
  //初始化倒计时
  bindCDinit: function () {
    this.setData({ CDinit: this.data.CDinit + 1 })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})