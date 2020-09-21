/**
 * The MIT License (MIT)
 * 摇一摇
 * @author 透笔度
 * @开源中国 https://my.oschina.net/tbd/blog
 * @码云 https://gitee.com/dgx
 */

// pages/yaoyiyao/yaoyiyao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:"",
    y: "",
    z: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.onAccelerometerChange(function (res) {
      console.log(res.x)
      console.log(res.y)
      console.log(res.z)
      that.setData({ x: res.x, y: res.y, z: res.z})
      wx.stopAccelerometer();
    })
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